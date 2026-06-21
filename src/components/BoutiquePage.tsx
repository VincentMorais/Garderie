import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import './BoutiquePage.css';
import SEO from './SEO';

import heroImg from '../assets/accueilrose.webp';

interface Product {
  image: string;
  name: string;
  description: string;
  link: string;
}

// Sélection de produits recommandés par la garderie.
// L'image (dossier /public) est reliée à son lien Amazon.
const PRODUCTS: Product[] = [
  {
    image: '/laisse.jpg',
    name: 'Laisse',
    description: 'Une laisse solide et confortable pour les promenades quotidiennes.',
    link: 'https://amzn.to/4eaCiMy',
  },
  {
    image: '/gourde.jpg',
    name: 'Gourde de promenade',
    description: 'Gardez votre compagnon hydraté pendant vos sorties.',
    link: 'https://amzn.to/4obGIax',
  },
  {
    image: '/jouet.jpg',
    name: 'Jouet KONG',
    description: 'Le jouet incontournable pour occuper et stimuler votre chien.',
    link: 'https://amzn.to/4g6REUW',
  },
  {
    image: '/museliere.jpg',
    name: 'Muselière',
    description: 'Une muselière respirante et bien ajustée pour plus de sécurité.',
    link: 'https://amzn.to/43qisIi',
  },
  {
    image: '/sac à crotte.jpg',
    name: 'Sacs à crottes',
    description: 'Des sacs pratiques pour ramasser proprement lors des balades.',
    link: 'https://amzn.to/4vyRBFS',
  },
  {
    image: '/couche.jpg',
    name: 'Alèses absorbantes',
    description: 'Des alèses absorbantes idéales pour la propreté à la maison.',
    link: 'https://amzn.to/3Q0mSm9',
  },
  {
    image: '/caméra.jpg',
    name: 'Caméra de surveillance',
    description: 'Gardez un œil sur votre animal où que vous soyez.',
    link: 'https://amzn.to/4okdzdA',
  },
];

const BoutiquePage: React.FC = () => {
  return (
    <div className="boutique-page">
      <SEO
        title="Boutique — Nos produits recommandés pour chiens et NAC"
        description="Découvrez notre sélection d'accessoires recommandés pour votre animal : laisse, gourde, jouet, muselière, sacs à crottes et plus encore."
        path="/boutique"
      />

      <section className="boutique-hero">
        <div className="hero-background">
          <img
            src={heroImg}
            alt="Boutique d'accessoires pour animaux de la garderie d'Arpajon"
            className="hero-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">Notre Boutique</h1>
            <p className="hero-subtitle">
              Notre sélection d'accessoires préférés pour le bien-être de votre compagnon
            </p>
          </motion.div>
        </div>
      </section>

      <section className="boutique-section">
        <div className="container">
          <div className="boutique-grid">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.name}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="product-body">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <a
                    href={product.link}
                    className="product-button"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    aria-label={`Acheter ${product.name} sur Amazon (nouvel onglet)`}
                  >
                    <FaShoppingCart aria-hidden="true" />
                    <span>Acheter</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="boutique-note">
            En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les
            conditions requises. Les prix et la disponibilité des produits sont indiqués sur Amazon.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BoutiquePage;
