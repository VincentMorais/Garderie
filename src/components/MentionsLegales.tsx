import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const MentionsLegales: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Mentions Légales</h1>
      <p className="legal-subtitle">Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN)</p>

      <section>
        <h2>1. Éditeur du site</h2>
        <div className="legal-contact-box">
          <p><strong>Nom :</strong> Émilie Cazes</p>
          <p><strong>Statut :</strong> Auto-entrepreneur</p>
          <p><strong>Activité :</strong> Garderie et pension pour animaux</p>
          <p><strong>Adresse :</strong> 5 Impasse du Tacot, 91290 Arpajon, France</p>
          <p><strong>Téléphone :</strong> <a href="tel:0650159411">06 50 15 94 11</a></p>
          <p><strong>Email :</strong> <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a></p>
        </div>
      </section>

      <section>
        <h2>2. Hébergement</h2>
        <p>Le site est hébergé par :</p>
        <div className="legal-highlight">
          <p><strong>Vercel Inc.</strong></p>
          <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
        </div>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, photographies, logos, icônes) est la propriété exclusive d'Émilie Cazes, sauf mention contraire.
          Toute reproduction, représentation, modification ou exploitation, totale ou partielle, de ce contenu sans autorisation écrite préalable est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
        </p>
      </section>

      <section>
        <h2>4. Responsabilité</h2>
        <p>
          Les informations contenues sur ce site sont fournies à titre indicatif. Émilie Cazes s'efforce de maintenir les informations à jour et exactes, mais ne peut garantir l'exhaustivité ni l'exactitude de tous les contenus.
        </p>
        <p>
          L'éditeur décline toute responsabilité quant aux éventuels dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, notamment en cas d'interruption, d'indisponibilité ou de présence de virus.
        </p>
      </section>

      <section>
        <h2>5. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre d'information uniquement. Émilie Cazes n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section>
        <h2>6. Droit applicable</h2>
        <p>
          Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
        <div className="legal-contact-box">
          <p>Par email : <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a></p>
          <p>Par téléphone : <a href="tel:0650159411">06 50 15 94 11</a></p>
          <p>Par courrier : 5 Impasse du Tacot, 91290 Arpajon</p>
        </div>
      </section>

      <Link to="/" className="legal-back">← Retour à l'accueil</Link>
    </div>
  );
};

export default MentionsLegales;
