import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { esc, escMax } from './_html';
import { clientIp, rateLimit } from './_ratelimit';
import { isEmail, validate } from './_validate';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMILIE_EMAIL = 'contact@lemondedeschiensetdesnacs.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const limited = rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.allowed) {
    res.setHeader('Retry-After', String(limited.retryAfterSeconds));
    return res.status(429).json({ error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const { name, email, phone, subject, message } = body;

  const invalid = validate(body, [
    { field: 'name', required: true, max: 120, label: 'Nom' },
    { field: 'email', required: true, max: 254, label: 'Email' },
    { field: 'phone', max: 40, label: 'Téléphone' },
    { field: 'subject', required: true, max: 120, label: 'Sujet' },
    { field: 'message', required: true, max: 5000, label: 'Message' },
  ]);
  if (invalid) return res.status(400).json({ error: invalid });

  // L'adresse sert de replyTo : une valeur invalide ferait rejeter l'envoi.
  if (!isEmail(email)) return res.status(400).json({ error: "L'adresse email est invalide." });

  try {
    await resend.emails.send({
      from: `Garderie <${EMILIE_EMAIL}>`,
      to: EMILIE_EMAIL,
      replyTo: String(email).trim(),
      subject: `✉️ Nouveau message — ${String(subject ?? "").slice(0, 120)}`,
      html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #fce4e7;">
        <div style="background:linear-gradient(135deg,#f6c1c7,#e8a5ad);padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:1.4rem;">✉️ Nouveau message</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:0.95rem;">Via le formulaire de contact</p>
        </div>

        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
            <tr>
              <td style="padding:6px 0;color:#6b7280;width:30%;">Nom</td>
              <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(name, 120)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:#e8a5ad;">${escMax(email, 160)}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding:6px 0;color:#6b7280;">Téléphone</td>
              <td style="padding:6px 0;"><a href="tel:${esc(phone)}" style="color:#e8a5ad;">${escMax(phone, 40)}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Sujet</td>
              <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(subject, 120)}</td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:16px 20px;background:#fef2f2;border-radius:10px;border:1px solid #fce4e7;">
            <p style="margin:0 0 8px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <p style="margin:0;color:#374151;line-height:1.7;white-space:pre-wrap;">${escMax(message, 5000)}</p>
          </div>
        </div>

        <div style="background:#fef2f2;padding:16px 32px;text-align:center;font-size:0.85rem;color:#9ca3af;">
          Le Monde Des Chiens Et Des Nacs · 5 Impasse du Tacot, 91290 Arpajon
        </div>
      </div>`,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    // Le détail reste dans les logs Vercel : le renvoyer au client exposerait
    // la configuration interne (fournisseur, clés, adresses).
    console.error('Resend error (contact):', JSON.stringify(error));
    return res.status(500).json({ error: "Erreur lors de l'envoi du message. Veuillez réessayer." });
  }
}
