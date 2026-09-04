// Types minimaux pour les handlers Vercel, en remplacement du package
// @vercel/node (utilisé uniquement pour ces deux alias de type — jamais
// exécuté en prod). Sa chaîne de dépendances traîne des CVE non corrigées
// en amont ; comme il ne sert qu'à `import type`, on l'élimine plutôt que
// de dépendre d'un paquet vulnérable pour deux alias.
// Forme alignée sur @vercel/node@12 (VercelRequest/VercelResponse).
import type { IncomingMessage, ServerResponse } from 'http';

export type VercelRequest = IncomingMessage & {
  query: { [key: string]: string | string[] };
  cookies: { [key: string]: string };
  body: any;
};

export type VercelResponse = ServerResponse & {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
};
