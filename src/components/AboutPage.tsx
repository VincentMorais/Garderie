// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaClock, 
  FaPaw, 
  FaHeart, 
  FaStar, 
  FaCheckCircle,
  FaDog,
  FaWalking,
  FaUtensils,
  FaBed,
  FaPlay,
  FaShieldAlt,
  FaCertificate,
  FaUsers,
  FaLeaf
} from 'react-icons/fa';
import dogImage from '../assets/chienmangerrose.jpg';
import './AboutPage.css';

const AboutPage: React.FC = () => {
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

  const daySchedule = [
    {
      time: "7h00 - 9h00",
      title: "Arrivée & Accueil",
      description: "Accueil personnalisé de chaque chien avec rituel de bienvenue et acclimatation progressive à l'environnement.",
      icon: FaPaw,
      color: "#f6c1c7"
    },
    {
      time: "9h00 - 12h00",
      title: "Activités Matinales",
      description: "Jeux stimulants, exercices physiques et activités cognitives selon la météo et les préférences de chaque chien.",
      icon: FaPlay,
      color: "#e8a5ad"
    },
    {
      time: "12h00 - 14h00",
      title: "Repos & Déjeuner",
      description: "Pause déjeuner personnalisée selon les instructions des propriétaires, suivie d'une période de repos calme.",
      icon: FaUtensils,
      color: "#f6c1c7"
    },
    {
      time: "14h00 - 16h00",
      title: "Promenades",
      description: "Sorties dans les espaces verts environnants pour l'exercice physique et la stimulation mentale.",
      icon: FaWalking,
      color: "#e8a5ad"
    },
    {
      time: "16h00 - 17h30",
      title: "Jeux Libres",
      description: "Session de socialisation et jeux libres sous surveillance attentive pour renforcer les liens entre chiens.",
      icon: FaHeart,
      color: "#f6c1c7"
    },
    {
      time: "17h30 - 19h00",
      title: "Retour au Calme",
      description: "Préparation au départ avec toilettage léger et moment de détente avant le retour des propriétaires.",
      icon: FaBed,
      color: "#e8a5ad"
    }
  ];

  const pricingPlans = [
    {
      name: "Garde Journalière",
      price: "20€",
      period: "par jour",
      features: [
        "Accueil de 7h à 19h",
        "Activités et promenades incluses",
        "Repas personnalisé",
        "Photos quotidiennes",
        "Rapport de comportement"
      ],
      popular: false,
      icon: FaDog
    },
    {
      name: "Abonnement Hebdo",
      price: "90€",
      period: "5 jours",
      savings: "Économisez 10€",
      features: [
        "Tous les services inclus",
        "Réduction de 10%",
        "Planning flexible",
        "Suivi personnalisé",
        "Priorité de réservation"
      ],
      popular: true,
      icon: FaStar
    },
    {
      name: "Demi-Journée",
      price: "12€",
      period: "matin ou après-midi",
      features: [
        "Accueil 4h maximum",
        "Activités adaptées",
        "Repas inclus si nécessaire",
        "Flexibilité horaire",
        "Idéal pour débuter"
      ],
      popular: false,
      icon: FaClock
    }
  ];

  const additionalServices = [
    {
      name: "Toilettage",
      price: "25€ - 45€",
      description: "Bain, coupe, brossage et soins selon la race et les besoins",
      icon: FaShieldAlt
    },
    {
      name: "Éducation Comportementale",
      price: "30€",
      description: "Séances individuelles pour corriger les comportements indésirables",
      icon: FaCertificate
    },
    {
      name: "Garde Spéciale",
      price: "Sur devis",
      description: "Garde en dehors des horaires habituels ou services particuliers",
      icon: FaUsers
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <img src={dogImage} alt="Chien qui joue" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">À Propos de Notre Garderie</h1>
            <p className="hero-subtitle">
              Découvrez notre approche personnalisée et nos tarifs transparents
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <FaHeart className="feature-icon" />
                <span>Amour & Soins</span>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feature-icon" />
                <span>Professionnels</span>
              </div>
              <div className="feature-item">
                <FaLeaf className="feature-icon" />
                <span>Environnement Naturel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Notre Approche */}
      <section className="approach-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Notre Approche</h2>
            <p>Une méthode unique basée sur le respect et l'individualité de chaque chien</p>
          </motion.div>

          <motion.div 
            className="approach-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="approach-card" variants={fadeInUp}>
              <div className="approach-icon">
                <FaHeart />
              </div>
              <h3>Soins Personnalisés</h3>
              <p>Chaque chien reçoit une attention particulière adaptée à son caractère, son âge et ses besoins spécifiques.</p>
            </motion.div>

            <motion.div className="approach-card" variants={fadeInUp}>
              <div className="approach-icon">
                <FaShieldAlt />
              </div>
              <h3>Environnement Sécurisé</h3>
              <p>Notre garderie est entièrement sécurisée avec des espaces adaptés et une surveillance constante.</p>
            </motion.div>

            <motion.div className="approach-card" variants={fadeInUp}>
              <div className="approach-icon">
                <FaCertificate />
              </div>
              <h3>Équipe Qualifiée</h3>
              <p>Nos soigneurs sont formés et certifiés pour assurer le bien-être et la sécurité de vos compagnons.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Journée Type */}
      <section className="schedule-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Une Journée Type</h2>
            <p>Découvrez comment se déroule une journée dans notre garderie</p>
          </motion.div>

          <motion.div 
            className="schedule-timeline"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {daySchedule.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <motion.div 
                  key={index}
                  className="schedule-item"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="schedule-time">
                    <span className="time">{activity.time}</span>
                  </div>
                  <div className="schedule-content">
                    <div className="schedule-icon" style={{ backgroundColor: activity.color }}>
                      <IconComponent />
                    </div>
                    <div className="schedule-text">
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section Tarifs */}
      <section className="pricing-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Nos Tarifs</h2>
            <p>Des prix transparents et des formules adaptées à tous les besoins</p>
          </motion.div>

          <motion.div 
            className="pricing-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div 
                  key={index}
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  {plan.popular && (
                    <div className="popular-badge">Plus Populaire</div>
                  )}
                  <div className="pricing-header">
                    <div className="pricing-icon">
                      <IconComponent />
                    </div>
                    <h3>{plan.name}</h3>
                    <div className="pricing-price">
                      <span className="price">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <div className="savings">{plan.savings}</div>
                    )}
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <FaCheckCircle className="check-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="pricing-button">
                    Réserver maintenant
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section Services Supplémentaires */}
      <section className="additional-services-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Services Supplémentaires</h2>
            <p>Des options pour personnaliser encore plus l'expérience de votre chien</p>
          </motion.div>

          <motion.div 
            className="services-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div 
                  key={index}
                  className="service-card"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                >
                  <div className="service-icon">
                    <IconComponent />
                  </div>
                  <h3>{service.name}</h3>
                  <div className="service-price">{service.price}</div>
                  <p>{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="contact-section">
        <div className="container">
          <motion.div 
            className="contact-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Des Questions ?</h2>
            <p>Notre équipe est là pour vous accompagner et répondre à toutes vos questions</p>
            <div className="contact-actions">
              <button className="primary-button">
                Nous contacter
              </button>
              <button className="secondary-button">
                Voir le planning
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
