import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMILIE_EMAIL = 'contact@lemondedeschiensetdesnacs.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    ownerName, ownerEmail, ownerPhone,
    dogName, dogBreed, dogCount,
    serviceType, startDate, endDate,
    message, specialNeeds,
  } = req.body;

  try {
    // Email de notification à Émilie
    await resend.emails.send({
      from: `Garderie <${EMILIE_EMAIL}>`,
      to: EMILIE_EMAIL,
      replyTo: ownerEmail,
      subject: `🐾 Nouvelle réservation — ${dogName} (${ownerName})`,
      html: emailToEmilie({ ownerName, ownerEmail, ownerPhone, dogName, dogBreed, dogCount, serviceType, startDate, endDate, message, specialNeeds }),
    });

    // Email de confirmation au client
    await resend.emails.send({
      from: `Émilie — Le Monde Des Chiens Et Des Nacs <${EMILIE_EMAIL}>`,
      to: ownerEmail,
      subject: `Votre demande de réservation a bien été reçue`,
      html: confirmationToClient({ ownerName, dogName, serviceType, startDate, endDate }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Resend error:', JSON.stringify(error));
    return res.status(500).json({ error: error?.message || 'Erreur lors de l\'envoi de l\'email.', detail: error });
  }
}

function emailToEmilie(d: any): string {
  return `
  <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #fce4e7;">
    <div style="background:linear-gradient(135deg,#f6c1c7,#e8a5ad);padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:1.4rem;">🐾 Nouvelle réservation</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:0.95rem;">Le Monde Des Chiens Et Des Nacs</p>
    </div>

    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">

        <tr><td colspan="2" style="padding:0 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Propriétaire</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;width:40%;">Nom</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${d.ownerName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Email</td>
          <td style="padding:6px 0;"><a href="mailto:${d.ownerEmail}" style="color:#e8a5ad;">${d.ownerEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Téléphone</td>
          <td style="padding:6px 0;"><a href="tel:${d.ownerPhone}" style="color:#e8a5ad;">${d.ownerPhone}</a></td>
        </tr>

        <tr><td colspan="2" style="padding:20px 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Réservation</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Service</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${d.serviceType}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Dates</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${d.startDate}${d.startDate !== d.endDate ? ` → ${d.endDate}` : ''}</td>
        </tr>

        <tr><td colspan="2" style="padding:20px 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Animal</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Nom</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${d.dogName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Race</td>
          <td style="padding:6px 0;color:#1f2937;">${d.dogBreed || '—'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Nombre</td>
          <td style="padding:6px 0;color:#1f2937;">${d.dogCount} chien${d.dogCount > 1 ? 's' : ''}</td>
        </tr>
        ${d.specialNeeds ? `
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Besoins spéciaux</td>
          <td style="padding:6px 0;color:#1f2937;">${d.specialNeeds}</td>
        </tr>` : ''}
        ${d.message ? `
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Message</td>
          <td style="padding:6px 0;color:#1f2937;">${d.message}</td>
        </tr>` : ''}
      </table>
    </div>

    <div style="background:#fef2f2;padding:16px 32px;text-align:center;font-size:0.85rem;color:#9ca3af;">
      Le Monde Des Chiens Et Des Nacs · 5 Impasse du Tacot, 91290 Arpajon
    </div>
  </div>`;
}

function confirmationToClient(d: any): string {
  return `
  <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #fce4e7;">
    <div style="background:linear-gradient(135deg,#f6c1c7,#e8a5ad);padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:1.4rem;">🐾 Demande bien reçue !</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:0.95rem;">Le Monde Des Chiens Et Des Nacs</p>
    </div>

    <div style="padding:28px 32px;">
      <p style="color:#1f2937;font-size:1rem;">Bonjour <strong>${d.ownerName}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        Votre demande de réservation pour <strong>${d.dogName}</strong> a bien été enregistrée.
        Émilie vous contactera sous <strong>24h</strong> pour confirmer votre créneau.
      </p>

      <div style="background:#fef2f2;border:1px solid #fce4e7;border-radius:10px;padding:16px 20px;margin:20px 0;">
        <p style="margin:0 0 8px;font-weight:700;color:#e8a5ad;">Récapitulatif</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Animal :</strong> ${d.dogName}</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Prestation :</strong> ${d.serviceType}</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Dates :</strong> ${d.startDate}${d.startDate !== d.endDate ? ` → ${d.endDate}` : ''}</p>
      </div>

      <p style="color:#374151;line-height:1.7;">
        En cas de question, n'hésitez pas à nous contacter directement :
      </p>
      <p style="margin:4px 0;color:#374151;">📞 <a href="tel:0650159411" style="color:#e8a5ad;">06 50 15 94 11</a></p>
      <p style="margin:4px 0;color:#374151;">✉️ <a href="mailto:contact@lemondedeschiensetdesnacs.com" style="color:#e8a5ad;">contact@lemondedeschiensetdesnacs.com</a></p>
    </div>

    <div style="background:#fef2f2;padding:16px 32px;text-align:center;font-size:0.85rem;color:#9ca3af;">
      Le Monde Des Chiens Et Des Nacs · 5 Impasse du Tacot, 91290 Arpajon
    </div>
  </div>`;
}
