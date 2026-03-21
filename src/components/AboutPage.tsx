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
      time: "En matinée",
      title: "Arrivée & Accueil",
      description: "Accueil personnalisé de chaque animal avec rituel de bienvenue et acclimatation progressive à l'environnement.",
      icon: FaPaw,
      color: "#f6c1c7"
    },
    {
      time: "Matin",
      title: "Activités Matinales",
      description: "Jeux stimulants, exercices physiques et activités cognitives selon la météo et les préférences de chaque animal.",
      icon: FaPlay,
      color: "#e8a5ad"
    },
    {
      time: "Mi-journée",
      title: "Repos & Repas",
      description: "Repas avec la nourriture apportée par les propriétaires, suivis d'une période de repos calme.",
      icon: FaUtensils,
      color: "#f6c1c7"
    },
    {
      time: "Après-midi",
      title: "Promenades",
      description: "Sorties dans les espaces verts environnants pour l'exercice physique et la stimulation mentale.",
      icon: FaWalking,
      color: "#e8a5ad"
    },
    {
      time: "Fin d'après-midi",
      title: "Jeux Libres",
      description: "Session de socialisation et jeux libres sous surveillance attentive pour renforcer les liens entre animaux.",
      icon: FaHeart,
      color: "#f6c1c7"
    },
    {
      time: "En soirée",
      title: "Retour au Calme",
      description: "Moment de détente, photos et vidéos envoyées aux propriétaires avant le retour.",
      icon: FaBed,
      color: "#e8a5ad"
    }
  ];

  const pricingPlans = [
    {
      name: "Garde Journalière",
      price: "15€",
      period: "par jour",
      features: [
        "Accueil de 7h à 19h",
        "Activités et promenades incluses",
        "Nourriture apportée par le propriétaire",
        "Photos et vidéos quotidiennes",
        "Rapport de comportement"
      ],
      popular: false,
      icon: FaDog
    },
    {
      name: "Abonnement Régulier",
      price: "65€",
      period: "5 jours",
      savings: "Économisez 10€",
      features: [
        "Tous les services inclus",
        "Réduction fidélité",
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
      period: "jusqu'à 5h",
      features: [
        "Durée maximale : 5h",
        "Activités adaptées",
        "Nourriture apportée par le propriétaire",
        "Flexibilité horaire",
        "Idéal pour découvrir"
      ],
      popular: false,
      icon: FaClock
    },
    {
      name: "Soirée",
      price: "Sur devis",
      period: "garde du soir",
      features: [
        "Accueil en soirée",
        "Activités calmes adaptées",
        "Environnement sécurisé",
        "Suivi personnalisé"
      ],
      popular: false,
      icon: FaBed
    },
    {
      name: "Adaptation",
      price: "Incluse",
      period: "avant garde définitive",
      features: [
        "Obligatoire avant toute garde",
        "Découverte progressive",
        "Évaluation du comportement",
        "Rencontre avec les autres animaux"
      ],
      popular: false,
      icon: FaLeaf
    }
  ];

  const additionalServices = [
    {
      name: "Promenade",
      price: "10€",
      description: "Sortie encadrée et sécurisée dans les espaces verts environnants",
      icon: FaWalking
    },
    {
      name: "NAC",
      price: "10€ / jour",
      description: "Garde de nouveaux animaux de compagnie (lapins, rongeurs, oiseaux...)",
      icon: FaLeaf
    },
    {
      name: "Visite de chat",
      price: "12€",
      description: "Visite à domicile pour les chats : alimentation, jeux, câlins",
      icon: FaPaw
    },
    {
      name: "Garde Spéciale",
      price: "Sur devis",
      description: "Garde hors horaires habituels, visite à domicile ou garde spécifique de chat",
      icon: FaUsers
    },
    {
      name: "Toilettage",
      price: "Tarif bientôt disponible",
      description: "Bain, coupe, brossage et soins selon la race et les besoins",
      icon: FaShieldAlt
    },
    {
      name: "Éducation Comportementale",
      price: "Tarif bientôt disponible",
      description: "Séances individuelles pour corriger les comportements indésirables",
      icon: FaCertificate
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
              <p>Chaque animal reçoit une attention adaptée à ses besoins. Photos et vidéos quotidiennes envoyées aux propriétaires.</p>
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
            <p>Organisation indicative, adaptée aux besoins de chaque animal</p>
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

      {/* Section Informations Importantes */}
      <section className="approach-section" style={{ background: '#fdf0f2' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Informations Importantes</h2>
            <p>À lire avant toute réservation</p>
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
                <FaUtensils />
              </div>
              <h3>Nourriture non incluse</h3>
              <p>Les croquettes et repas ne sont pas fournis. Le propriétaire doit apporter la nourriture habituelle de son animal.</p>
            </motion.div>
            <motion.div className="approach-card" variants={fadeInUp}>
              <div className="approach-icon">
                <FaShieldAlt />
              </div>
              <h3>Documents requis</h3>
              <p>Carnet de vaccination à jour et passeport de l'animal obligatoires avant toute prise en charge.</p>
            </motion.div>
            <motion.div className="approach-card" variants={fadeInUp}>
              <div className="approach-icon">
                <FaHeart />
              </div>
              <h3>Adaptation obligatoire</h3>
              <p>Une séance d'adaptation est requise avant toute garde définitive, pour assurer le confort et la sécurité de votre animal.</p>
            </motion.div>
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
