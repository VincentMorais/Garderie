import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaHeart,
  FaPaw,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaComments
} from 'react-icons/fa';
import contactImage from '../assets/natsu.jpg';
import './Contact.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('send failed');

      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Téléphone",
      content: "06 50 15 94 11",
      link: "tel:0650159411"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "contact@lemondedeschiensetdesnacs.com",
      link: "mailto:contact@lemondedeschiensetdesnacs.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Adresse",
      content: "5 Impasse du Tacot, 91290 Arpajon",
      link: "#"
    },
    {
      icon: FaClock,
      title: "Horaires",
      content: "Lun-Ven: 7h-19h | Sam-Dim: 9h-18h",
      link: "#"
    }
  ];

  const subjects = [
    "Réservation",
    "Demande d'information",
    "Visite de la garderie",
    "Question sur nos services",
    "Autre"
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="hero-background">
          <img src={contactImage} alt="Chien de contact" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">Contactez-Nous</h1>
            <p className="hero-subtitle">
              Émilie est là pour répondre à toutes vos questions et organiser la garde de votre animal
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <FaHeart className="feature-icon" />
                <span>Réponse Rapide</span>
              </div>
              <div className="feature-item">
                <FaPaw className="feature-icon" />
                <span>Conseils Personnalisés</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Nos Coordonnées</h2>
            <p>Plusieurs façons de nous joindre pour organiser la garde de votre compagnon</p>
          </motion.div>

          <motion.div 
            className="contact-info-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div 
                  key={index}
                  className="contact-info-card"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className="contact-info-icon">
                    <IconComponent />
                  </div>
                  <h3>{info.title}</h3>
                  <a href={info.link} className="contact-info-link">
                    {info.content}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <motion.div 
            className="form-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-header">
              <h2>Envoyez-nous un Message</h2>
              <p>Remplissez le formulaire ci-dessous et Émilie vous répondra dans les plus brefs délais</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <FaComments className="input-icon" />
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choisir un sujet</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">
                    <FaComments className="input-icon" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre demande ou question..."
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FaCheckCircle />
                  <span>Message envoyé avec succès ! Émilie vous répondra rapidement.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FaTimesCircle />
                  <span>Erreur lors de l'envoi. Veuillez réessayer.</span>
                </motion.div>
              )}
            </form>

            <div className="form-footer">
              <p>
                <strong>Conformité RGPD :</strong> Vos données personnelles sont traitées en conformité avec le Règlement (UE) 2016/679. 
                Nous ne partageons pas vos informations avec des tiers sans votre consentement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default ContactPage;
