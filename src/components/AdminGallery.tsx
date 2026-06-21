import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, GALLERY_BUCKET, GalleryImage, GalleryCategory } from '../lib/supabase';
import './AdminGallery.css';

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'chiens', label: 'Chiens' },
  { id: 'chats', label: 'Chats' },
  { id: 'nac', label: 'NAC' },
];

const MAX_SIZE_MB = 8;

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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setImages(data as GalleryImage[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0] ?? null;
    if (selected) {
      if (!selected.type.startsWith('image/')) {
        setError('Le fichier doit être une image.');
        setFile(null);
        return;
      }
      if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`L'image est trop lourde (max ${MAX_SIZE_MB} Mo).`);
        setFile(null);
        return;
      }
    }
    setFile(selected);
  };

  const resetForm = () => {
    setName('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez choisir une image.');
      return;
    }
    setUploading(true);
    setError(null);

    // Extension nettoyée (lettres/chiffres uniquement) pour éviter toute
    // manipulation du chemin de stockage via le nom de fichier.
    const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
    const ext = /^[a-z0-9]{1,5}$/.test(rawExt) ? rawExt : 'jpg';
    const safeName = name.trim() || file.name.replace(/\.[^.]+$/, '');
    const path = `${category}/${Date.now()}-${slugify(safeName)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      setError("Erreur lors de l'envoi de l'image. Veuillez réessayer.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);

    const { data: inserted, error: insertError } = await supabase
      .from('gallery_images')
      .insert({ name: safeName, category, path, url: urlData.publicUrl })
      .select()
      .single();

    if (insertError || !inserted) {
      // On nettoie le fichier orphelin si l'insertion échoue.
      await supabase.storage.from(GALLERY_BUCKET).remove([path]);
      setError("Erreur lors de l'enregistrement. Veuillez réessayer.");
      setUploading(false);
      return;
    }

    setImages(prev => [inserted as GalleryImage, ...prev]);
    resetForm();
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
      setError('Erreur lors de la suppression. Veuillez réessayer.');
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
        <h2>Ajouter une photo</h2>

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
            />
          </label>
        </div>

        <label className="gallery-field">
          <span>Image (max {MAX_SIZE_MB} Mo)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {error && <div className="gallery-error">{error}</div>}

        <button type="submit" className="gallery-upload-btn" disabled={uploading || !file}>
          {uploading ? 'Envoi en cours…' : 'Ajouter la photo'}
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
