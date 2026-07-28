// Limitation de débit pour les endpoints qui envoient des emails.
//
// ⚠️ Portée réelle : le compteur vit en mémoire de l'instance serverless.
// Vercel peut en exécuter plusieurs en parallèle et les recycle souvent,
// donc la limite effective est plus permissive que la valeur configurée.
// C'est suffisant pour stopper un script qui boucle sur le formulaire, pas
// pour contrer une attaque distribuée — il faudrait pour cela un store
// partagé (Upstash/Redis) ou le pare-feu Vercel.
//
// Le préfixe « _ » empêche Vercel de traiter ce module comme une route.

type RequestLike = {
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

const buckets = new Map<string, number[]>();

// Purge périodique : sans elle, la Map grossit indéfiniment sur une
// instance qui vit longtemps.
const MAX_KEYS = 5000;

function prune(now: number, windowMs: number) {
  if (buckets.size < MAX_KEYS) return;
  buckets.forEach((hits, key) => {
    if (hits.every(t => now - t >= windowMs)) buckets.delete(key);
  });
}

/** IP du client telle que fournie par le proxy Vercel. */
export function clientIp(req: RequestLike): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  // x-forwarded-for peut contenir une chaîne « client, proxy1, proxy2 ».
  const first = raw?.split(',')[0]?.trim();
  return first || req.socket?.remoteAddress || 'inconnu';
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  prune(now, windowMs);

  const hits = (buckets.get(key) ?? []).filter(t => now - t < windowMs);

  if (hits.length >= limit) {
    const oldest = hits[0];
    buckets.set(key, hits);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true, retryAfterSeconds: 0 };
}
