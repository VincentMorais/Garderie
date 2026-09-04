import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaCertificate,
  FaHeart,
  FaPaw,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaEye,
  FaFilePdf,
  FaFileImage
} from 'react-icons/fa';
// heroDogs sert via /hero-accueil.webp (public/) pour matcher le preload
import planningImg from '../assets/calendrier.webp';
import diplomaImg from '../assets/diplome.webp';
import Testimonials from '../components/Testimonials';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './About.css';
import SEO from './SEO';

interface DocEntry {
  title: string;
  src: string;
  badgeLabel: string;
  badge: 'official' | 'formation';
  description?: string;
  /** Le document est un scan image (JPEG/PNG) et non un PDF : icône adaptée et
   *  pas de paramètres de visionneuse PDF dans le lien. */
  image?: boolean;
  /** Fichier pas encore déposé dans /public : on affiche « Bientôt disponible »
   *  plutôt qu'un lien mort. Retirer la ligne une fois le fichier ajouté. */
  pending?: boolean;
}

// Onglet « Certifications » : les qualifications d'Émilie.
const CERTIFICATIONS: DocEntry[] = [
  {
    title: 'Diplôme pet sitter',
    src: '/Diplome-paysage.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Diplôme pet sitter attestant des qualifications professionnelles.',
  },
  {
    title: 'Attestation ASV',
    src: '/Attestation-ASV.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Attestation de certification ASV (Auxiliaire Spécialisé Vétérinaire).',
  },
  {
    title: 'Attestation de réussite',
    src: '/Attestation-de-reussite.jpg',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Attestation de réussite à la formation.',
    image: true,
  },
  {
    title: 'Formation toiletteur',
    src: '/Attestation%20fin%20de%20formation.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Attestation officielle de formation toiletteur.',
  },
  {
    title: 'Certificat de fin de formation',
    src: '/CERTIFICAT%20DE%20FIN%20DE%20FORMATION%201CA.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Certificat de fin de formation.',
  },
  {
    title: 'Attestation individuelle de fin de formation',
    src: '/Attestation_individuelle_fin_formation_163305-0.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Attestation individuelle de fin de formation.',
  },
  {
    title: 'Formation 1er secours canin et félin',
    src: '/Attestation.pdf',
    badge: 'official',
    badgeLabel: 'Officiel',
    description: 'Attestation de formation aux premiers secours canins et félins.',
  },
  {
    title: "Attestation d'assurance Hiscox",
    src: "/Hiscox%20-%20Attestation%20d'assurance.pdf",
    badge: 'official',
    badgeLabel: 'Officiel',
    description: "Attestation d'assurance responsabilité civile professionnelle (renouvellement).",
  },
];

// Onglet « Documents à fournir » : ce que le propriétaire remplit et rapporte.
const CLIENT_DOCUMENTS: DocEntry[] = [
  {
    title: 'Contrat de garde',
    src: '/Contrat-Garde.pdf',
    badge: 'formation',
    badgeLabel: 'À signer',
    description: 'Contrat à lire et à signer avant le début de la garde.',
  },
  {
    title: 'Conditions générales de vente',
    src: '/CGV.pdf',
    badge: 'official',
    badgeLabel: 'À lire',
    description: 'Conditions générales de vente applicables à la garderie.',
  },
  {
    title: 'Attestation de bonne santé',
    src: '/Attestation-Bonne-Sante.pdf',
    badge: 'formation',
    badgeLabel: 'À remplir',
    description: "Déclaration de l'état de santé de l'animal.",
  },
  {
    title: 'Attestation de non-abandon',
    src: '/Attestation-Non-Abandon.pdf',
    badge: 'formation',
    badgeLabel: 'À remplir',
    description: "Engagement du propriétaire à récupérer son animal.",
  },
  {
    title: 'Règlement sanitaire',
    src: '/Reglement-Sanitaire.pdf',
    badge: 'official',
    badgeLabel: 'À lire',
    description: "Règles d'hygiène et de vaccination appliquées à la garderie.",
  },
];

const About: React.FC = () => {
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false);
  const [docsTab, setDocsTab] = useState<'certifications' | 'documents'>('certifications');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const openDiplomaModal = () => {
    setIsDiplomaModalOpen(true);
  };

  const closeDiplomaModal = () => {
    setIsDiplomaModalOpen(false);
  };

  return (
    <div className="home">
      <SEO
        title="Garderie pour chiens et NAC à Arpajon (91)"
        description="Garderie & pension canine et NAC à Arpajon (91290). Garde journalière, pension, promenades, visite de chat à domicile. Réservez en ligne."
        path="/"
      />
      <section className="hero-section">
        <div className="hero-background">
          <img src="/hero-accueil.webp" alt="Deux chiots heureux à la garderie d'Arpajon" className="hero-image" loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Le Monde Des Chiens Et Des Nacs
            </h1>
            <p className="hero-subtitle">
              Garderie & pension pour chiens et NAC à Arpajon (91) — votre compagnon entre de bonnes mains
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <FaHeart className="feature-icon" />
                <span>Amour & Soins</span>
              </div>
              <div className="feature-item">
                <FaPaw className="feature-icon" />
                <span>Professionnels</span>
              </div>
              <div className="feature-item">
                <FaStar className="feature-icon" />
                <span>Qualité Premium</span>
              </div>
            </div>
            <Link to="/calendar" className="cta-button">
              Réserver maintenant
              <FaArrowRight className="cta-arrow" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Nos Services</h2>
            <p>Une garderie d'exception pour vos compagnons à quatre pattes</p>
          </motion.div>

          <motion.div
            className="services-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">
                <FaCalendarAlt />
              </div>
              <h3>Planning Flexible</h3>
              <p>Réservez selon vos disponibilités avec notre système de planning en ligne</p>
              <Link to="/calendar" className="service-link">
                Voir le planning <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">
                <FaCertificate />
              </div>
              <h3>Certification Qualité</h3>
              <p>Émilie est formée et certifiée pour le bien-être animal</p>
              <Link to="/about" className="service-link">
                En savoir plus <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">
                <FaHeart />
              </div>
              <h3>Soins Personnalisés</h3>
              <p>Découvrez nos prestations et l'attention apportée à chaque animal</p>
              <Link to="/about" className="service-link">
                Voir nos services <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">
                <FaPhone />
              </div>
              <h3>Une Question ?</h3>
              <p>Émilie est à votre écoute pour toutes vos questions et besoins spécifiques</p>
              <Link to="/contact" className="service-link">
                Nous contacter <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <motion.div 
            className="info-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="info-card planning-card">
              <Link to="/calendar" className="info-link">
                <div className="info-image">
                  <img src={planningImg} alt="Calendrier de réservation de la garderie" loading="lazy" decoding="async" width="600" height="400" />
                  <div className="info-overlay">
                    <FaCalendarAlt className="info-icon" />
                  </div>
                </div>
                <div className="info-content">
                  <h3>PLANNING</h3>
                  <p>Consultez nos disponibilités et réservez votre créneau</p>
                  <span className="info-cta">Voir le planning →</span>
                </div>
              </Link>
            </div>

            <div className="info-card diploma-card">
              <button onClick={openDiplomaModal} className="diploma-button">
                <div className="info-image">
                  <img src={diplomaImg} alt="Diplôme et certifications professionnelles d'Émilie" loading="lazy" decoding="async" width="600" height="400" />
                  <div className="info-overlay">
                    <FaCertificate className="info-icon" />
                  </div>
                </div>
                <div className="info-content">
                  <h3>CERTIFICATIONS</h3>
                  <p>Nos qualifications et les documents à fournir avant la garde</p>
                  <span className="info-cta">Voir les documents →</span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <motion.div 
            className="contact-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-info">
              <h2>Besoin d'aide ?</h2>
              <p>Émilie est là pour vous accompagner</p>
              <div className="contact-details">
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>Appelez-nous</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Venez nous voir</span>
                </div>
                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <span>Horaires flexibles</span>
                </div>
              </div>
              <Link to="/contact" className="contact-button">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      {isDiplomaModalOpen && (
        <motion.div 
          className="diploma-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDiplomaModal}
        >
          <motion.div 
            className="diploma-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Certifications &amp; documents</h3>
              <button onClick={closeDiplomaModal} className="close-button">
                <FaTimes />
              </button>
            </div>
            <div className="docs-tabs" role="tablist" aria-label="Type de document">
              <button
                type="button"
                role="tab"
                id="docs-tab-certifications"
                aria-selected={docsTab === 'certifications'}
                aria-controls="docs-panel-certifications"
                className={`docs-tab ${docsTab === 'certifications' ? 'active' : ''}`}
                onClick={() => setDocsTab('certifications')}
              >
                Certifications
              </button>
              <button
                type="button"
                role="tab"
                id="docs-tab-documents"
                aria-selected={docsTab === 'documents'}
                aria-controls="docs-panel-documents"
                className={`docs-tab ${docsTab === 'documents' ? 'active' : ''}`}
                onClick={() => setDocsTab('documents')}
              >
                Documents à fournir
              </button>
            </div>

            <div
              className="docs-modal-content"
              role="tabpanel"
              id={`docs-panel-${docsTab}`}
              aria-labelledby={`docs-tab-${docsTab}`}
            >
              <p className="docs-intro">
                {docsTab === 'certifications'
                  ? "Les diplômes, formations et attestations d'assurance d'Émilie."
                  : "À télécharger, remplir et rapporter avant le début de la garde. Le carnet de vaccination à jour et le passeport de l'animal sont également obligatoires."}
              </p>

              <div className="docs-list">
                {(docsTab === 'certifications' ? CERTIFICATIONS : CLIENT_DOCUMENTS).map((doc) => (
                  <div key={doc.title} className="doc-row">
                    <div className="doc-row-icon">
                      {doc.image ? <FaFileImage /> : <FaFilePdf />}
                    </div>
                    <div className="doc-row-info">
                      <div className="doc-row-top">
                        <span className="doc-row-title">{doc.title}</span>
                        <span className={`doc-badge doc-badge--${doc.badge}`}>{doc.badgeLabel}</span>
                      </div>
                      {doc.description && <p className="doc-row-desc">{doc.description}</p>}
                    </div>
                    <div className="doc-row-actions">
                      {doc.pending ? (
                        <span className="doc-btn doc-btn--pending">Bientôt disponible</span>
                      ) : (
                        <a
                          href={doc.image ? doc.src : `${doc.src}#toolbar=0&navpanes=0&scrollbar=0`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doc-btn doc-btn--view"
                        >
                          <FaEye /> <span>Voir</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
