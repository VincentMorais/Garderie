// About.tsx
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
  FaTimes
} from 'react-icons/fa';
import heroDogs from '../assets/accueilrose.jpg';
import planningImg from '../assets/calendrier.jpg';
import diplomaImg from '../assets/diplome.jpg';
import InfiniteCarousel from '../components/InfinitieCarousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './About.css';

const About: React.FC = () => {
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false);

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
      {/* Hero Section Moderne */}
      <section className="hero-section">
        <div className="hero-background">
          <img src={heroDogs} alt="Deux chiots" className="hero-image" />
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
              Votre chien, entre de bonnes mains
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
            <Link to="/contact" className="cta-button">
              Réserver maintenant
              <FaArrowRight className="cta-arrow" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Services */}
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
              <p>Nos équipes sont formées et certifiées pour le bien-être animal</p>
              <Link to="/about" className="service-link">
                En savoir plus <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">
                <FaHeart />
              </div>
              <h3>Soins Personnalisés</h3>
              <p>Chaque animal reçoit une attention particulière et des soins adaptés</p>
              <Link to="/contact" className="service-link">
                Nous contacter <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Planning & Diplôme */}
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
                  <img src={planningImg} alt="Planning" />
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
                  <img src={diplomaImg} alt="Diplôme" />
                  <div className="info-overlay">
                    <FaCertificate className="info-icon" />
                  </div>
                </div>
                <div className="info-content">
                  <h3>DIPLÔME</h3>
                  <p>Découvrez nos qualifications et notre expertise</p>
                  <span className="info-cta">Voir le diplôme →</span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Contact Rapide */}
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
              <p>Notre équipe est là pour vous accompagner</p>
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

      {/* Carrousel des clients satisfaits */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Nos Clients Satisfaits</h2>
            <p>Découvrez les compagnons qui nous font confiance</p>
          </motion.div>
          <InfiniteCarousel />
        </div>
      </section>

      {/* Modal du Diplôme */}
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
              <h3>Diplôme & Attestation</h3>
              <button onClick={closeDiplomaModal} className="close-button">
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <iframe
                src="/Attestation.pdf"
                title="Diplôme"
                width="100%"
                height="500px"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
