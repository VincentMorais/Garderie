// Validation des données reçues par les endpoints d'envoi d'email.
//
// Sans elle, n'importe quel corps de requête est accepté et transformé en
// email : champs manquants, valeurs de plusieurs mégaoctets, adresse de
// réponse invalide. On rejette tôt, avant d'appeler Resend.
//
// Le préfixe « _ » empêche Vercel de traiter ce module comme une route.

// Volontairement permissif : le but est d'écarter les valeurs manifestement
// invalides, pas de rejeter une adresse exotique mais légitime.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function isEmail(value: unknown): boolean {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value.trim());
}

/**
 * Contrôle présence et longueur des champs.
 * Renvoie un message d'erreur, ou null si tout est bon.
 */
export function validate(
  body: Record<string, unknown>,
  rules: { field: string; required?: boolean; max: number; label: string }[]
): string | null {
  for (const { field, required, max, label } of rules) {
    const value = body[field];

    if (value === undefined || value === null || value === '') {
      if (required) return `Le champ « ${label} » est obligatoire.`;
      continue;
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
      return `Le champ « ${label} » est invalide.`;
    }

    if (String(value).length > max) {
      return `Le champ « ${label} » dépasse ${max} caractères.`;
    }
  }

  return null;
}
