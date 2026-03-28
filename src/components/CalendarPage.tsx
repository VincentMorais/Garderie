import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone,
  FaPaw, FaChevronDown, FaCheckCircle, FaInfoCircle
} from 'react-icons/fa';
import Calendar from '../components/Calendar';
import dogImage from '../assets/chien rose.jpg';
import './CalendarPage.css';

const FAQ_ITEMS = [
  {
    q: 'Comment se déroule la réservation ?',
    a: "Choisissez vos dates dans le calendrier, sélectionnez votre prestation, renseignez les informations de votre animal puis vos coordonnées. Émilie vous confirme la réservation sous 24h par téléphone ou email."
  },
  {
    q: 'Quels documents sont nécessaires ?',
    a: "Le carnet de vaccination à jour (rage obligatoire) ainsi qu'un certificat de bonne santé récent. Vous trouverez les formulaires à télécharger dans la section Certifications de la page d'accueil."
  },
  {
    q: 'La nourriture est-elle fournie ?',
    a: "Non. Chaque propriétaire apporte la nourriture habituelle de son animal (croquettes, pâtées…). Cela évite tout changement alimentaire stressant pour votre compagnon."
  },
  {
    q: 'Combien d\'animaux accueillez-vous ?',
    a: "La garderie accueille au maximum 5 chiens simultanément pour garantir une attention individuelle et un cadre serein. Les jours complets apparaissent barrés dans le calendrier."
  },
  {
    q: 'Quels sont les tarifs ?',
    a: "Journée : 15€ | Demi-journée (5h max) : 12€ | Promenade : 10€ | NAC : 10€/jour | Visite de chat à domicile : 12€. Abonnement 5 journées : 65€. Soirée et autres prestations : sur devis."
  },
  {
    q: 'Peut-on annuler une réservation ?',
    a: "Oui, jusqu'à 48h avant la date de début. Au-delà, des frais peuvent s'appliquer. Contactez Émilie directement par téléphone pour toute annulation."
  },
];

const CalendarPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="calendar-page">

      <section className="calendar-hero">
        <div className="hero-background">
          <img src={dogImage} alt="Chien" className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">Planning & Réservations</h1>
            <p className="hero-subtitle">Réservez votre créneau en quelques clics</p>
            <div className="hero-features">
              <div className="feature-item">
                <FaCalendarAlt className="feature-icon" />
                <span>Réservation en ligne</span>
              </div>
              <div className="feature-item">
                <FaClock className="feature-icon" />
                <span>Horaires flexibles</span>
              </div>
              <div className="feature-item">
                <FaPaw className="feature-icon" />
                <span>5 animaux max</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="info-cards-section">
        <div className="container">
          <motion.div
            className="info-cards-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card">
              <div className="info-card-icon">
                <FaClock />
              </div>
              <div className="info-card-body">
                <strong>Horaires</strong>
                <span>Lun–Ven : 7h – 19h</span>
                <span>Sam–Dim : 9h – 18h</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-card-body">
                <strong>Adresse</strong>
                <span>5 Impasse du Tacot</span>
                <span>91290 Arpajon</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <FaPhone />
              </div>
              <div className="info-card-body">
                <strong>Contact</strong>
                <a href="tel:0650159411">06 50 15 94 11</a>
                <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Réserver votre créneau</h2>
            <p>Choisissez vos dates puis suivez les étapes</p>
          </motion.div>

          <div className="booking-notices">
            <div className="notice-item">
              <FaCheckCircle className="notice-icon check" />
              <span>Confirmation sous 24h par Émilie</span>
            </div>
            <div className="notice-item">
              <FaCheckCircle className="notice-icon check" />
              <span>5 animaux maximum par jour</span>
            </div>
            <div className="notice-item">
              <FaInfoCircle className="notice-icon info" />
              <span>Vaccination à jour obligatoire</span>
            </div>
            <div className="notice-item">
              <FaInfoCircle className="notice-icon info" />
              <span>Nourriture fournie par le propriétaire</span>
            </div>
          </div>

          <motion.div
            className="booking-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Calendar />
          </motion.div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Questions Fréquentes</h2>
            <p>Trouvez rapidement les réponses à vos questions</p>
          </motion.div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <FaChevronDown className={`faq-chevron ${openFaq === i ? 'rotated' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CalendarPage;
