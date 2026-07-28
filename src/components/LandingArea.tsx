import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaPaw, FaHeart,
  FaShieldAlt, FaArrowRight, FaCheckCircle, FaCar
} from 'react-icons/fa';
import SEO from './SEO';
import heroImg from '../assets/accueilrose.webp';
import './LandingArea.css';

interface LandingAreaProps {
  city: string;
  postalCode: string;
  distanceMin: number;
  landmark: string;
  slug: string;
}

const LandingArea: React.FC<LandingAreaProps> = ({
  city, postalCode, distanceMin, landmark, slug,
}) => {
  return (
    <div className="landing-area-page">
      <SEO
        title={`Garderie pour chien à ${city} (${postalCode}) — venez d'Arpajon`}
        description={`Garderie & pension canine et NAC accessible depuis ${city} (${postalCode}). Émilie vous accueille à Arpajon, à ${distanceMin} min en voiture. Garde journalière, promenades, visites de chats, NAC. Réservation en ligne.`}
        path={`/${slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Garderie pour chien et NAC à ${city}`,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Le Monde des Chiens et des NACs',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '5 Impasse du Tacot',
              addressLocality: 'Arpajon',
              postalCode: '91290',
              addressCountry: 'FR',
            },
            telephone: '+33-7-56-80-41-59',
            url: 'https://www.lemondedeschiensetdesnacs.com',
          },
          areaServed: {
            '@type': 'City',
            name: city,
            address: {
              '@type': 'PostalAddress',
              postalCode,
              addressCountry: 'FR',
            },
          },
        }}
      />

      <section className="landing-hero">
        <div className="hero-background">
          <img
            src={heroImg}
            alt={`Garderie pour chien et NAC accessible depuis ${city}`}
            className="hero-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="landing-badge">
              <FaCar aria-hidden="true" /> À {distanceMin} min de {city}
            </span>
            <h1 className="hero-title">
              Garderie pour chien à {city}
            </h1>
            <p className="hero-subtitle">
              Vous habitez {city} ({postalCode}) ? Émilie vous accueille à Arpajon,
              à seulement {distanceMin} minutes en voiture.
            </p>
            <Link to="/contact" className="cta-button">
              Demander un devis <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="landing-content">
        <div className="container">
          <div className="landing-grid">
            <article className="landing-main">
              <h2>Une garderie de proximité pour les habitants de {city}</h2>
              <p>
                Le Monde des Chiens et des NACs est une garderie & pension familiale
                située au <strong>5 Impasse du Tacot, 91290 Arpajon</strong>,{' '}
                {landmark}. Émilie, dog sitter certifiée, accueille au maximum
                <strong> 5 animaux simultanément</strong> pour offrir à chacun une
                attention vraiment individuelle.
              </p>

              <h3>Pourquoi choisir notre garderie quand on vit à {city} ?</h3>
              <ul className="landing-list">
                <li>
                  <FaCheckCircle className="landing-check" aria-hidden="true" />
                  <span>
                    <strong>Trajet court</strong> ({distanceMin} min) : moins de
                    stress pour votre animal le matin et le soir
                  </span>
                </li>
                <li>
                  <FaCheckCircle className="landing-check" aria-hidden="true" />
                  <span>
                    <strong>Spécialiste NAC</strong> : lapins, rongeurs, oiseaux,
                    rares à trouver dans le secteur
                  </span>
                </li>
                <li>
                  <FaCheckCircle className="landing-check" aria-hidden="true" />
                  <span>
                    <strong>Tarifs transparents</strong> et publics : pas de mauvaise
                    surprise
                  </span>
                </li>
                <li>
                  <FaCheckCircle className="landing-check" aria-hidden="true" />
                  <span>
                    <strong>Réservation en ligne</strong> avec calendrier en temps
                    réel
                  </span>
                </li>
                <li>
                  <FaCheckCircle className="landing-check" aria-hidden="true" />
                  <span>
                    <strong>Photos & vidéos</strong> envoyées chaque jour pendant la
                    garde
                  </span>
                </li>
              </ul>

              <h3>Nos prestations pour les habitants de {city}</h3>
              <p>
                Que vous partiez en vacances, que vous travailliez tard ou que votre
                chien ait besoin d'une journée de socialisation, nous avons une
                formule adaptée : garde journalière (15 €), demi-journée (12 €),
                pension, promenade encadrée (10 €), visite de chat à domicile à{' '}
                {city} (12 €) et garde de NAC (10 € / jour).
              </p>

              <h3>Comment nous rejoindre depuis {city}</h3>
              <p>
                L'accès depuis {city} se fait en environ {distanceMin} minutes en
                voiture. {landmark}. L'adresse exacte vous est communiquée au moment
                de la réservation. Pour la première garde, une <strong>séance
                d'adaptation gratuite d'environ 1h</strong> est obligatoire pour
                garantir un démarrage en douceur.
              </p>
            </article>

            <aside className="landing-cta">
              <div className="landing-cta-card">
                <div className="landing-cta-icon">
                  <FaHeart aria-hidden="true" />
                </div>
                <h3>Prêt à confier votre animal ?</h3>
                <p>Réservation en ligne ou contactez-nous directement.</p>
                <Link to="/calendar" className="landing-btn landing-btn--primary">
                  <FaCalendarAlt aria-hidden="true" /> Voir le planning
                </Link>
                <a
                  href="tel:0756804159"
                  className="landing-btn landing-btn--secondary"
                  aria-label="Appeler Émilie au 07 56 80 41 59"
                >
                  <FaPhone aria-hidden="true" /> 07 56 80 41 59
                </a>
                <div className="landing-cta-info">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>5 Impasse du Tacot, 91290 Arpajon</span>
                </div>
              </div>

              <div className="landing-features-mini">
                <div className="landing-feature-mini">
                  <FaShieldAlt aria-hidden="true" />
                  <span>Environnement sécurisé</span>
                </div>
                <div className="landing-feature-mini">
                  <FaPaw aria-hidden="true" />
                  <span>5 animaux max simultanément</span>
                </div>
                <div className="landing-feature-mini">
                  <FaHeart aria-hidden="true" />
                  <span>Photos quotidiennes</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="landing-other-areas">
        <div className="container">
          <h2>Nous desservons aussi</h2>
          <div className="landing-other-grid">
            {[
              { slug: 'garderie-bretigny-sur-orge', name: 'Brétigny-sur-Orge' },
              { slug: 'garderie-saint-germain-les-arpajon', name: 'Saint-Germain-lès-Arpajon' },
              { slug: 'garderie-la-norville', name: 'La Norville' },
            ]
              .filter(area => area.slug !== slug)
              .map(area => (
                <Link key={area.slug} to={`/${area.slug}`} className="landing-other-link">
                  <FaMapMarkerAlt aria-hidden="true" />
                  Garderie chien {area.name}
                  <FaArrowRight aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingArea;
