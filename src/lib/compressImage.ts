// Redimensionne et ré-encode une photo en JPEG avant l'envoi vers Supabase.
//
// Les photos prises au téléphone pèsent souvent 4 à 15 Mo et dépassent la
// limite d'envoi : on les ramène ici à ~2000 px de côté et à un JPEG de
// qualité 0.85, ce qui donne des fichiers de quelques centaines de Ko.
// Au passage, tous les formats que le navigateur sait décoder (PNG, WebP,
// et HEIC sur iOS/Safari) ressortent en JPEG affichable partout.

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.85;

// Le navigateur n'a pas su décoder le fichier (HEIC sur Chrome/Android,
// fichier corrompu…). On marque l'erreur par un code plutôt que par une
// sous-classe d'Error : `instanceof` n'est pas fiable une fois le code
// transpilé vers ES5 pour les navigateurs anciens de la browserslist.
const UNREADABLE_IMAGE = 'UNREADABLE_IMAGE';

export function isUnreadableImageError(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { code?: string }).code === UNREADABLE_IMAGE;
}

function unreadableImageError(): Error {
  const error = new Error('Image illisible par le navigateur');
  (error as Error & { code?: string }).code = UNREADABLE_IMAGE;
  return error;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(unreadableImageError());
    };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(unreadableImageError())),
      'image/jpeg',
      JPEG_QUALITY
    );
  });
}

/**
 * Renvoie une version JPEG allégée du fichier.
 * Lève une erreur reconnaissable par `isUnreadableImageError` si le navigateur
 * ne sait pas décoder l'image.
 */
export async function compressImage(file: File): Promise<File> {
  const img = await loadImage(file);

  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw unreadableImageError();

  // Fond blanc : sinon les PNG transparents deviennent noirs une fois en JPEG.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await toBlob(canvas);

  // Une petite photo déjà optimisée peut grossir après ré-encodage : on garde
  // alors l'originale, sauf si elle n'est pas dans un format sûr pour le web.
  const originalIsWebSafe = /^image\/(jpeg|png|webp)$/.test(file.type);
  if (blob.size >= file.size && originalIsWebSafe) return file;

  const baseName = file.name.replace(/\.[^.]+$/, '');
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}
