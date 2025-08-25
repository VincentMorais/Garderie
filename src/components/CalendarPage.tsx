// src/pages/CalendarPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaPaw,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';
import Calendar from '../components/Calendar';
import dogImage from '../assets/chien rose.jpg';
import './CalendarPage.css';

const CalendarPage: React.FC = () => {
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

  return (
    <div className="calendar-page">
      {/* Hero Section */}
      <section className="calendar-hero">
        <div className="hero-background">
          <img src={dogImage} alt="Chien" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">Planning & Réservations</h1>
            <p className="hero-subtitle">
              Réservez votre créneau pour la garderie de votre compagnon
            </p>
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
                <span>Soins personnalisés</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Informations */}
      <section className="info-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Informations Pratiques</h2>
            <p>Tout ce que vous devez savoir pour réserver</p>
          </motion.div>

          <motion.div 
            className="info-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="info-card" variants={fadeInUp}>
              <div className="info-icon">
                <FaClock />
              </div>
              <h3>Horaires d'ouverture</h3>
              <div className="schedule">
                <div className="schedule-item">
                  <span className="day">Lundi - Vendredi</span>
                  <span className="time">7h00 - 19h00</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Samedi</span>
                  <span className="time">8h00 - 18h00</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Dimanche</span>
                  <span className="time">9h00 - 17h00</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="info-card" variants={fadeInUp}>
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Notre adresse</h3>
              <p>123 Rue des Animaux<br />75000 Paris, France</p>
              <div className="contact-info">
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>contact@garderie-chiens.fr</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="info-card" variants={fadeInUp}>
              <div className="info-icon">
                <FaStar />
              </div>
              <h3>Nos services inclus</h3>
              <ul className="services-list">
                <li><FaCheckCircle className="check-icon" />Garde personnalisée</li>
                <li><FaCheckCircle className="check-icon" />Sorties régulières</li>
                <li><FaCheckCircle className="check-icon" />Soins vétérinaires</li>
                <li><FaCheckCircle className="check-icon" />Nourriture adaptée</li>
                <li><FaCheckCircle className="check-icon" />Photos quotidiennes</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Réservation */}
      <section className="booking-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Réserver votre créneau</h2>
            <p>Sélectionnez vos dates et remplissez le formulaire</p>
          </motion.div>

          <motion.div 
            className="booking-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Calendar />
          </motion.div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Questions Fréquentes</h2>
            <p>Trouvez rapidement les réponses à vos questions</p>
          </motion.div>

          <motion.div 
            className="faq-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="faq-item" variants={fadeInUp}>
              <h3>Comment réserver ?</h3>
              <p>Sélectionnez vos dates dans le calendrier ci-dessus et remplissez le formulaire de réservation. Nous vous confirmerons par email sous 24h.</p>
            </motion.div>

            <motion.div className="faq-item" variants={fadeInUp}>
              <h3>Quels documents fournir ?</h3>
              <p>Vaccination à jour, certificat de bonne santé, et informations sur le comportement de votre animal.</p>
            </motion.div>

            <motion.div className="faq-item" variants={fadeInUp}>
              <h3>Peut-on annuler ?</h3>
              <p>Oui, jusqu'à 48h avant la date de début. Au-delà, des frais d'annulation peuvent s'appliquer.</p>
            </motion.div>

            <motion.div className="faq-item" variants={fadeInUp}>
              <h3>Tarifs et paiement</h3>
              <p>Nos tarifs varient selon la durée et le type de service. Le paiement se fait à la réservation ou à l'arrivée.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
