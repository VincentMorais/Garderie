// Échappement des données saisies par le visiteur avant insertion dans les
// emails HTML. Sans lui, n'importe qui peut injecter du balisage arbitraire
// (faux lien « cliquez ici », image traçante, mise en page trompeuse) dans les
// messages qu'Émilie reçoit.
//
// Le préfixe « _ » du nom de fichier empêche Vercel de traiter ce module
// comme une route serverless.

export function esc(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Tronque une valeur trop longue avant de l'échapper (garde-fou anti-spam). */
export function escMax(value: unknown, max: number): string {
  const raw = value === null || value === undefined ? '' : String(value);
  return esc(raw.length > max ? `${raw.slice(0, max)}…` : raw);
}
