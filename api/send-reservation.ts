import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { esc, escMax } from './_html';
import { clientIp, rateLimit } from './_ratelimit';
import { isEmail, validate } from './_validate';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMILIE_EMAIL = 'contact@lemondedeschiensetdesnacs.com';

// ─── RIB joint à l'email de confirmation ─────────────────────────────
// Le PDF vit dans api/assets/ plutôt que dans public/ : il ne doit pas être
// téléchargeable par n'importe qui depuis le site. vercel.json l'embarque
// dans la fonction via « includeFiles ».
const RIB_DIR = path.join(process.cwd(), 'api', 'assets');

function loadRibAttachment() {
  try {
    // Recherche insensible à la casse : Vercel tourne sous Linux, où « rib.pdf »
    // et « RIB.pdf » sont deux fichiers différents. Le RIB étant redéposé à la
    // main à chaque changement de banque, on ne dépend pas de sa casse exacte.
    const file = fs.readdirSync(RIB_DIR).find(f => /^rib\.pdf$/i.test(f));
    if (!file) throw new Error('aucun fichier rib.pdf');

    return [
      {
        filename: 'RIB-Le-Monde-Des-Chiens-Et-Des-Nacs.pdf',
        content: fs.readFileSync(path.join(RIB_DIR, file)).toString('base64'),
      },
    ];
  } catch {
    // Sans le fichier on envoie quand même l'email : l'IBAN y figure en clair.
    console.warn(`RIB introuvable dans ${RIB_DIR} — email envoyé sans pièce jointe.`);
    return undefined;
  }
}

const RIB_ATTACHMENT = loadRibAttachment();

// ─── Coordonnées bancaires pour les arrhes ───────────────────────────
// ⚠️ À COMPLÉTER avec les vraies coordonnées d'Émilie
const BANK_DETAILS = {
  beneficiary: 'Émilie',
  iban: 'FR76 1027 8061 1400 0205 4530 248',
  bic: '',                        // optionnel — laisser vide pour un virement SEPA France (l'IBAN suffit)
};
const DEPOSIT_DEADLINE_HOURS = 72;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Cet endpoint joint le RIB : sans limite, on peut le faire envoyer en
  // boucle vers n'importe quelle adresse en soumettant de fausses demandes.
  const limited = rateLimit(`reservation:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.allowed) {
    res.setHeader('Retry-After', String(limited.retryAfterSeconds));
    return res.status(429).json({ error: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const {
    ownerName, ownerEmail, ownerPhone,
    dogName, dogBreed, dogCount,
    serviceType, startDate, endDate,
    message, specialNeeds,
    estimatedTotal, depositAmount,
  } = body as any;

  const invalid = validate(body, [
    { field: 'ownerName', required: true, max: 120, label: 'Nom du propriétaire' },
    { field: 'ownerEmail', required: true, max: 254, label: 'Email' },
    { field: 'ownerPhone', required: true, max: 40, label: 'Téléphone' },
    { field: 'dogName', required: true, max: 80, label: "Nom de l'animal" },
    { field: 'dogBreed', max: 80, label: 'Race' },
    { field: 'dogCount', max: 10, label: "Nombre d'animaux" },
    { field: 'serviceType', required: true, max: 80, label: 'Prestation' },
    { field: 'startDate', required: true, max: 40, label: 'Date de début' },
    { field: 'endDate', required: true, max: 40, label: 'Date de fin' },
    { field: 'specialNeeds', max: 2000, label: 'Besoins spéciaux' },
    { field: 'message', max: 5000, label: 'Message' },
  ]);
  if (invalid) return res.status(400).json({ error: invalid });

  if (!isEmail(ownerEmail)) return res.status(400).json({ error: "L'adresse email est invalide." });

  // Référence de virement à indiquer par le client (nom + date de début)
  const paymentRef = `${ownerName} ${startDate}`.replace(/\s+/g, '-').toUpperCase().slice(0, 30);

  try {
    // Email de notification à Émilie
    await resend.emails.send({
      from: `Garderie <${EMILIE_EMAIL}>`,
      to: EMILIE_EMAIL,
      replyTo: String(ownerEmail).trim(),
      subject: `🐾 Nouvelle réservation (en attente d'arrhes) — ${String(dogName ?? '').slice(0, 80)} (${String(ownerName ?? '').slice(0, 80)})`,
      html: emailToEmilie({ ownerName, ownerEmail, ownerPhone, dogName, dogBreed, dogCount, serviceType, startDate, endDate, message, specialNeeds, estimatedTotal, depositAmount, paymentRef }),
    });

    // Email de confirmation au client
    await resend.emails.send({
      from: `Émilie — Le Monde Des Chiens Et Des Nacs <${EMILIE_EMAIL}>`,
      to: String(ownerEmail).trim(),
      subject: `Réservation à valider — réglez vos arrhes pour bloquer le créneau`,
      html: confirmationToClient({ ownerName, dogName, serviceType, startDate, endDate, estimatedTotal, depositAmount, paymentRef }),
      attachments: RIB_ATTACHMENT,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    // Le détail reste dans les logs Vercel : le renvoyer au client exposerait
    // la configuration interne (fournisseur, clés, adresses).
    console.error('Resend error (réservation):', JSON.stringify(error));
    return res.status(500).json({ error: "Erreur lors de l'envoi de la confirmation. Veuillez réessayer." });
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
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(d.ownerName, 120)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Email</td>
          <td style="padding:6px 0;"><a href="mailto:${esc(d.ownerEmail)}" style="color:#e8a5ad;">${escMax(d.ownerEmail, 160)}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Téléphone</td>
          <td style="padding:6px 0;"><a href="tel:${esc(d.ownerPhone)}" style="color:#e8a5ad;">${escMax(d.ownerPhone, 40)}</a></td>
        </tr>

        <tr><td colspan="2" style="padding:20px 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Réservation</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Service</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(d.serviceType, 80)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Dates</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(d.startDate, 40)}${d.startDate !== d.endDate ? ` → ${escMax(d.endDate, 40)}` : ''}</td>
        </tr>

        <tr><td colspan="2" style="padding:20px 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Arrhes attendues</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Montant estimé</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.estimatedTotal ?? "—", 20)}€</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Arrhes (50%)</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:700;">${escMax(d.depositAmount ?? "—", 20)}€</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Référence virement</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.paymentRef, 60)}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:6px 0;color:#9ca3af;font-size:0.82rem;font-style:italic;">⏳ Dès réception du virement, valide la réservation depuis ton tableau de bord (« Arrhes reçues »).</td>
        </tr>

        <tr><td colspan="2" style="padding:20px 0 12px;font-weight:700;color:#e8a5ad;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;">Animal</td></tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Nom</td>
          <td style="padding:6px 0;color:#1f2937;font-weight:600;">${escMax(d.dogName, 80)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Race</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.dogBreed || "—", 80)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Nombre</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.dogCount, 10)} chien${Number(d.dogCount) > 1 ? 's' : ''}</td>
        </tr>
        ${d.specialNeeds ? `
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Besoins spéciaux</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.specialNeeds, 2000)}</td>
        </tr>` : ''}
        ${d.message ? `
        <tr>
          <td style="padding:6px 0;color:#6b7280;">Message</td>
          <td style="padding:6px 0;color:#1f2937;">${escMax(d.message, 5000)}</td>
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
      <h1 style="margin:0;color:#fff;font-size:1.4rem;">🐾 Dernière étape : validez votre créneau</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:0.95rem;">Le Monde Des Chiens Et Des Nacs</p>
    </div>

    <div style="padding:28px 32px;">
      <p style="color:#1f2937;font-size:1rem;">Bonjour <strong>${escMax(d.ownerName, 120)}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        Votre demande de réservation pour <strong>${escMax(d.dogName, 80)}</strong> a bien été enregistrée. 🎉<br>
        Pour <strong>bloquer définitivement votre créneau</strong>, il vous reste à régler les arrhes
        par virement bancaire. Votre place est pré-réservée pendant <strong>${DEPOSIT_DEADLINE_HOURS}h</strong>
        en attendant la réception du virement.
      </p>

      <div style="background:#fff7f8;border:2px solid #e8a5ad;border-radius:12px;padding:20px;margin:22px 0;">
        <p style="margin:0 0 12px;font-weight:700;color:#e8a5ad;font-size:1.05rem;">💳 Arrhes à régler : ${escMax(d.depositAmount ?? "—", 20)}€</p>
        <p style="margin:0 0 14px;color:#6b7280;font-size:0.9rem;">Soit 50&nbsp;% du montant estimé de votre séjour (${escMax(d.estimatedTotal ?? "—", 20)}€). Montant indicatif — Émilie vous confirmera le détail.</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
          <tr>
            <td style="padding:6px 0;color:#6b7280;width:38%;">Bénéficiaire</td>
            <td style="padding:6px 0;color:#1f2937;font-weight:600;">${BANK_DETAILS.beneficiary}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6b7280;">IBAN</td>
            <td style="padding:6px 0;color:#1f2937;font-weight:600;font-family:monospace;">${BANK_DETAILS.iban}</td>
          </tr>
          ${BANK_DETAILS.bic ? `
          <tr>
            <td style="padding:6px 0;color:#6b7280;">BIC</td>
            <td style="padding:6px 0;color:#1f2937;font-family:monospace;">${BANK_DETAILS.bic}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:6px 0;color:#6b7280;">Référence à indiquer</td>
            <td style="padding:6px 0;color:#1f2937;font-weight:700;">${escMax(d.paymentRef, 60)}</td>
          </tr>
        </table>
        <p style="margin:14px 0 0;color:#9ca3af;font-size:0.82rem;">⚠️ Pensez à bien indiquer la référence ci-dessus dans votre virement pour que nous puissions l'identifier rapidement.</p>
        ${RIB_ATTACHMENT ? `<p style="margin:8px 0 0;color:#9ca3af;font-size:0.82rem;">📎 Notre RIB est également joint à cet email au format PDF.</p>` : ''}
      </div>

      <div style="background:#fef2f2;border:1px solid #fce4e7;border-radius:10px;padding:16px 20px;margin:20px 0;">
        <p style="margin:0 0 8px;font-weight:700;color:#e8a5ad;">Récapitulatif</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Animal :</strong> ${escMax(d.dogName, 80)}</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Prestation :</strong> ${escMax(d.serviceType, 80)}</p>
        <p style="margin:4px 0;color:#374151;font-size:0.95rem;"><strong>Dates :</strong> ${escMax(d.startDate, 40)}${d.startDate !== d.endDate ? ` → ${escMax(d.endDate, 40)}` : ''}</p>
      </div>

      <p style="color:#374151;line-height:1.7;">
        Dès réception de votre virement, Émilie confirme votre réservation. En cas de question, n'hésitez pas à nous contacter directement :
      </p>
      <p style="margin:4px 0;color:#374151;">📞 <a href="tel:0756804159" style="color:#e8a5ad;">07 56 80 41 59</a></p>
      <p style="margin:4px 0;color:#374151;">✉️ <a href="mailto:contact@lemondedeschiensetdesnacs.com" style="color:#e8a5ad;">contact@lemondedeschiensetdesnacs.com</a></p>
    </div>

    <div style="background:#fef2f2;padding:16px 32px;text-align:center;font-size:0.85rem;color:#9ca3af;">
      Le Monde Des Chiens Et Des Nacs · 5 Impasse du Tacot, 91290 Arpajon
    </div>
  </div>`;
}
