import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, GALLERY_BUCKET, GalleryImage, GalleryCategory } from '../lib/supabase';
import { compressImage, isUnreadableImageError } from '../lib/compressImage';
import './AdminGallery.css';

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'chiens', label: 'Chiens' },
  { id: 'chats', label: 'Chats' },
  { id: 'nac', label: 'NAC' },
];

// Limite sur le fichier *d'origine*, avant compression : au-delà, le décodage
// dans le navigateur devient lourd. Après compression on tombe à quelques
// centaines de Ko, bien en dessous des limites de Supabase Storage.
const MAX_SOURCE_MB = 30;

// Nettoie un nom de fichier pour le chemin de stockage (pas d'accents/espaces).
const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 40) || 'photo';

const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<GalleryCategory>('chiens');
  const [name, setName] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [failures, setFailures] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) setError(`Impossible de charger les photos : ${fetchError.message}`);
    else if (data) setImages(data as GalleryImage[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFailures([]);
    setSuccess(null);

    const selected = Array.from(e.target.files ?? []);
    const tooBig = selected.filter(f => f.size > MAX_SOURCE_MB * 1024 * 1024);

    if (tooBig.length) {
      setError(
        `Trop lourd (max ${MAX_SOURCE_MB} Mo) : ${tooBig.map(f => f.name).join(', ')}`
      );
    }

    setFiles(selected.filter(f => f.size <= MAX_SOURCE_MB * 1024 * 1024));
  };

  const resetForm = () => {
    setName('');
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Envoie une photo : compression, dépôt dans le bucket, puis ligne en base.
  // Renvoie l'enregistrement créé, ou lève une erreur au message explicite.
  const uploadOne = async (file: File, displayName: string, index: number): Promise<GalleryImage> => {
    let prepared: File;
    try {
      prepared = await compressImage(file);
    } catch (e) {
      if (isUnreadableImageError(e)) {
        throw new Error(
          "format non reconnu par le navigateur (les fichiers HEIC de l'iPhone doivent être convertis en JPEG)"
        );
      }
      throw e;
    }

    // L'index évite une collision si deux fichiers de même nom partent
    // dans la même milliseconde (upsert est volontairement désactivé).
    const path = `${category}/${Date.now()}-${index}-${slugify(displayName)}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET)
      .upload(path, prepared, {
        cacheControl: '3600',
        upsert: false,
        contentType: prepared.type,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);

    const { data: inserted, error: insertError } = await supabase
      .from('gallery_images')
      .insert({ name: displayName, category, path, url: urlData.publicUrl })
      .select()
      .single();

    if (insertError || !inserted) {
      // On nettoie le fichier orphelin si l'insertion échoue.
      await supabase.storage.from(GALLERY_BUCKET).remove([path]);
      throw new Error(insertError?.message ?? "enregistrement en base impossible");
    }

    return inserted as GalleryImage;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length) {
      setError('Veuillez choisir au moins une image.');
      return;
    }

    setUploading(true);
    setError(null);
    setFailures([]);
    setSuccess(null);

    // L'envoi et l'écriture en base sont réservés au compte admin connecté :
    // une session expirée se traduirait sinon par un refus incompréhensible.
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError('Votre session a expiré. Déconnectez-vous puis reconnectez-vous avant de réessayer.');
      setUploading(false);
      return;
    }

    setProgress({ done: 0, total: files.length });

    const uploaded: GalleryImage[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Le nom saisi ne sert que pour un envoi unitaire ; sinon on reprend
      // le nom du fichier pour garder les photos distinguables.
      const displayName =
        (files.length === 1 && name.trim()) || file.name.replace(/\.[^.]+$/, '');

      try {
        uploaded.push(await uploadOne(file, displayName, i));
      } catch (err: any) {
        errors.push(`${file.name} : ${err?.message ?? 'erreur inconnue'}`);
      }
      setProgress({ done: i + 1, total: files.length });
    }

    if (uploaded.length) setImages(prev => [...uploaded.reverse(), ...prev]);
    setFailures(errors);

    if (!errors.length) {
      setSuccess(
        uploaded.length > 1 ? `${uploaded.length} photos ajoutées.` : 'Photo ajoutée.'
      );
      resetForm();
    } else if (uploaded.length) {
      setError(`${uploaded.length} photo(s) envoyée(s), ${errors.length} en échec :`);
    } else {
      setError("Aucune photo n'a pu être envoyée :");
    }

    setProgress(null);
    setUploading(false);
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!image.id) return;
    if (!window.confirm(`Supprimer la photo « ${image.name} » ?`)) return;

    setDeletingId(image.id);
    setError(null);

    const { error: dbError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', image.id);

    if (dbError) {
      setError(`Erreur lors de la suppression : ${dbError.message}`);
      setDeletingId(null);
      return;
    }

    await supabase.storage.from(GALLERY_BUCKET).remove([image.path]);
    setImages(prev => prev.filter(i => i.id !== image.id));
    setDeletingId(null);
  };

  return (
    <div className="admin-gallery">
      <form className="gallery-upload-form" onSubmit={handleUpload}>
        <h2>Ajouter des photos</h2>

        <div className="gallery-form-row">
          <label className="gallery-field">
            <span>Catégorie</span>
            <select value={category} onChange={e => setCategory(e.target.value as GalleryCategory)}>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </label>

          <label className="gallery-field">
            <span>Nom (facultatif)</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex. Luna"
              maxLength={60}
              disabled={files.length > 1}
            />
          </label>
        </div>

        <label className="gallery-field">
          <span>Images — plusieurs possibles (max {MAX_SOURCE_MB} Mo par photo)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {files.length > 0 && (
          <p className="gallery-hint">
            {files.length} photo{files.length > 1 ? 's' : ''} sélectionnée{files.length > 1 ? 's' : ''}
            {files.length > 1 && ' — le nom de chaque fichier sera utilisé'}
            . Les photos sont automatiquement allégées avant l'envoi.
          </p>
        )}

        {error && (
          <div className="gallery-error">
            <p>{error}</p>
            {failures.length > 0 && (
              <ul className="gallery-error-list">
                {failures.map(f => <li key={f}>{f}</li>)}
              </ul>
            )}
          </div>
        )}

        {success && <div className="gallery-success">{success}</div>}

        <button type="submit" className="gallery-upload-btn" disabled={uploading || !files.length}>
          {uploading
            ? progress
              ? `Envoi ${progress.done}/${progress.total}…`
              : 'Envoi en cours…'
            : `Ajouter ${files.length > 1 ? `les ${files.length} photos` : 'la photo'}`}
        </button>
      </form>

      <div className="gallery-manage">
        <h2>Photos ajoutées <span className="gallery-count">{images.length}</span></h2>

        {loading ? (
          <p className="gallery-loading">Chargement…</p>
        ) : images.length === 0 ? (
          <p className="gallery-empty-admin">Aucune photo ajoutée pour l'instant.</p>
        ) : (
          <div className="gallery-admin-grid">
            {images.map(img => (
              <div key={img.id} className="gallery-admin-item">
                <img src={img.url} alt={img.name} loading="lazy" decoding="async" />
                <div className="gallery-admin-info">
                  <span className="gallery-admin-name">{img.name}</span>
                  <span className={`gallery-admin-cat cat-${img.category}`}>
                    {CATEGORIES.find(c => c.id === img.category)?.label || img.category}
                  </span>
                </div>
                <button
                  className="gallery-delete-btn"
                  onClick={() => handleDelete(img)}
                  disabled={deletingId === img.id}
                  aria-label={`Supprimer ${img.name}`}
                >
                  {deletingId === img.id ? '…' : '✕'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
