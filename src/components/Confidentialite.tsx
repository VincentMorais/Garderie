import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const Confidentialite: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Politique de Confidentialité</h1>
      <p className="legal-subtitle">Conformément au Règlement Général sur la Protection des Données (RGPD) — UE 2016/679 — en vigueur depuis le 25 mai 2018</p>

      <section>
        <h2>1. Responsable du traitement</h2>
        <div className="legal-contact-box">
          <p><strong>Émilie Cazes</strong> — Le Monde Des Chiens Et Des Nacs</p>
          <p>5 Impasse du Tacot, 91290 Arpajon</p>
          <p>Email : <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a></p>
          <p>Téléphone : <a href="tel:0650159411">06 50 15 94 11</a></p>
        </div>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>

        <p><strong>Via le formulaire de réservation :</strong></p>
        <ul>
          <li>Prénom et nom du propriétaire</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Informations sur l'animal (nom, race, âge, besoins particuliers)</li>
          <li>Dates et type de prestation souhaitée</li>
        </ul>

        <p><strong>Via le formulaire de contact :</strong></p>
        <ul>
          <li>Nom complet</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone (facultatif)</li>
          <li>Sujet et contenu du message</li>
        </ul>

        <p><strong>Données techniques (collectées automatiquement) :</strong></p>
        <ul>
          <li>Adresse IP (via l'hébergeur Vercel)</li>
          <li>Type de navigateur et système d'exploitation</li>
          <li>Pages visitées et durée de visite</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités du traitement</h2>
        <p>Vos données sont collectées pour les finalités suivantes :</p>
        <ul>
          <li><strong>Gestion des réservations :</strong> traitement et suivi de votre demande de garde</li>
          <li><strong>Communication :</strong> confirmation de réservation, suivi par email ou téléphone</li>
          <li><strong>Réponses aux demandes de contact :</strong> traitement de vos questions et demandes d'information</li>
          <li><strong>Fonctionnement technique :</strong> sécurité et amélioration du site</li>
        </ul>
        <p>Aucune donnée n'est utilisée à des fins publicitaires ou commerciales non sollicitées.</p>
      </section>

      <section>
        <h2>4. Base légale des traitements</h2>
        <ul>
          <li><strong>Exécution d'un contrat</strong> (art. 6.1.b RGPD) : pour le traitement des réservations</li>
          <li><strong>Intérêt légitime</strong> (art. 6.1.f RGPD) : pour les demandes de contact et la sécurité du site</li>
          <li><strong>Consentement</strong> (art. 6.1.a RGPD) : lorsque vous nous contactez librement</li>
        </ul>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <div className="legal-highlight">
          <p><strong>Données de réservation :</strong> conservées 3 ans à compter de la dernière prestation</p>
          <p><strong>Messages de contact :</strong> conservés 1 an à compter de la réception</p>
          <p><strong>Données techniques :</strong> conservées 13 mois maximum (logs hébergeur)</p>
        </div>
        <p style={{ marginTop: '0.75rem' }}>À l'issue de ces durées, vos données sont supprimées ou anonymisées.</p>
      </section>

      <section>
        <h2>6. Destinataires des données</h2>
        <p>Vos données sont traitées par Émilie Cazes uniquement et ne sont jamais vendues ni cédées à des tiers.</p>
        <p>Elles peuvent cependant être transmises aux sous-traitants techniques suivants, dans le seul but d'assurer le fonctionnement du service :</p>
        <ul>
          <li><strong>Supabase Inc.</strong> (base de données des réservations) — hébergement en Europe</li>
          <li><strong>EmailJS</strong> (envoi des notifications par email)</li>
          <li><strong>Vercel Inc.</strong> (hébergement du site web)</li>
        </ul>
        <p>Ces prestataires sont soumis à des obligations contractuelles strictes de confidentialité et ne peuvent utiliser vos données à d'autres fins.</p>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
        <ul>
          <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
          <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données ("droit à l'oubli")</li>
          <li><strong>Droit à la limitation</strong> : restreindre temporairement le traitement de vos données</li>
          <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> : vous opposer à un traitement basé sur l'intérêt légitime</li>
        </ul>
        <p>Pour exercer ces droits, contactez-nous :</p>
        <div className="legal-contact-box">
          <p>Par email : <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a></p>
          <p>Par courrier : 5 Impasse du Tacot, 91290 Arpajon</p>
          <p>Nous répondrons dans un délai maximum de <strong>30 jours</strong>.</p>
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          En cas de litige non résolu, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a> — 3, Place de Fontenoy, 75007 Paris.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés (session d'authentification pour l'espace administration).
        </p>
        <p>Ces cookies ne nécessitent pas votre consentement conformément à l'article 82 de la loi Informatique et Libertés.</p>
      </section>

      <section>
        <h2>9. Sécurité des données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation :
        </p>
        <ul>
          <li>Connexions chiffrées (HTTPS / TLS)</li>
          <li>Accès à la base de données limité et protégé par authentification</li>
          <li>Accès à l'espace d'administration réservé à Émilie Cazes</li>
        </ul>
      </section>

      <section>
        <h2>10. Modifications de cette politique</h2>
        <p>
          Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée ci-dessous. Nous vous encourageons à la consulter régulièrement.
        </p>
        <p><strong>Dernière mise à jour :</strong> mars 2026</p>
      </section>

      <Link to="/" className="legal-back">← Retour à l'accueil</Link>
    </div>
  );
};

export default Confidentialite;
