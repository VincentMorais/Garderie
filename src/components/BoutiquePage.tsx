import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  FaShoppingCart,
  FaWalking,
  FaUtensils,
  FaBed,
  FaBone,
  FaShieldAlt,
} from 'react-icons/fa';
import './BoutiquePage.css';
import SEO from './SEO';

import heroImg from '../assets/accueilrose.webp';

type CategoryId = 'promenade' | 'repas' | 'confort' | 'jeux' | 'soin';

interface Category {
  id: CategoryId;
  label: string;
  icon: IconType;
}

interface Product {
  name: string;
  description: string;
  link: string;
  category: CategoryId;
  /** Photo dans /public. Sans photo, la carte affiche l'icône de la catégorie. */
  image?: string;
}

const CATEGORIES: Category[] = [
  { id: 'promenade', label: 'Promenade & sorties', icon: FaWalking },
  { id: 'repas', label: 'Repas & hydratation', icon: FaUtensils },
  { id: 'jeux', label: 'Jeux & éveil', icon: FaBone },
  { id: 'confort', label: 'Confort & repos', icon: FaBed },
  { id: 'soin', label: 'Soin & sécurité', icon: FaShieldAlt },
];

// Sélection de produits recommandés par la garderie.
// `image` est facultatif : les produits sans photo affichent l'icône de leur
// catégorie, il suffit de déposer un fichier dans /public et de renseigner le
// champ pour qu'une photo apparaisse.
const PRODUCTS: Product[] = [
  {
    image: '/laisse.jpg',
    name: 'Laisse',
    description: 'Une laisse solide et confortable pour les promenades quotidiennes.',
    link: 'https://amzn.to/4eaCiMy',
    category: 'promenade',
  },
  {
    name: 'Longe',
    description: "Pour laisser de la liberté à votre chien tout en gardant le contrôle lors des sorties en extérieur.",
    link: 'https://amzn.to/4uqEOo2',
    category: 'promenade',
  },
  {
    name: 'Harnais',
    description: 'Un harnais ajustable qui répartit la traction et préserve le cou de votre chien.',
    link: 'https://amzn.to/4v2fuWA',
    category: 'promenade',
  },
  {
    name: 'Sac de transport',
    description: 'Pratique et rassurant pour les trajets, les visites chez le vétérinaire ou les vacances.',
    link: 'https://amzn.to/4vuUXd2',
    category: 'promenade',
  },
  {
    image: '/sac à crotte.jpg',
    name: 'Sacs à crottes',
    description: 'Des sacs pratiques pour ramasser proprement lors des balades.',
    link: 'https://amzn.to/4vyRBFS',
    category: 'promenade',
  },
  {
    image: '/gourde.jpg',
    name: 'Gourde de promenade',
    description: 'Gardez votre compagnon hydraté pendant vos sorties.',
    link: 'https://amzn.to/4obGIax',
    category: 'promenade',
  },
  {
    image: '/museliere.jpg',
    name: 'Muselière',
    description: 'Une muselière respirante et bien ajustée pour plus de sécurité.',
    link: 'https://amzn.to/43qisIi',
    category: 'promenade',
  },
  {
    name: 'Vêtement de pluie',
    description: 'Un imperméable léger pour continuer les balades sans rentrer trempé.',
    link: 'https://amzn.to/4fCIjEl',
    category: 'promenade',
  },

  {
    name: 'Gamelle anti-glouton',
    description: 'Ralentit la prise du repas et limite les troubles digestifs chez les chiens pressés.',
    link: 'https://amzn.to/3Q0lOyF',
    category: 'repas',
  },
  {
    name: 'Gamelles (plusieurs tailles)',
    description: "Un lot de gamelles pour s'adapter au gabarit et à la ration de chaque animal.",
    link: 'https://amzn.to/3PL5qlC',
    category: 'repas',
  },
  {
    name: 'Fontaine à eau',
    description: 'Une eau filtrée en circulation permanente : idéale pour les chats qui boivent peu.',
    link: 'https://amzn.to/3QvWUHj',
    category: 'repas',
  },

  {
    image: '/jouet.jpg',
    name: 'Jouet KONG',
    description: 'Le jouet incontournable pour occuper et stimuler votre chien.',
    link: 'https://amzn.to/4g6REUW',
    category: 'jeux',
  },
  {
    name: "Jouet d'occupation",
    description: "Un second jouet pour varier les plaisirs et éviter l'ennui à la maison.",
    link: 'https://amzn.to/4e0lvvu',
    category: 'jeux',
  },

  {
    image: '/couche.jpg',
    name: 'Alèses absorbantes',
    description: 'Des alèses absorbantes idéales pour la propreté à la maison.',
    link: 'https://amzn.to/3Q0mSm9',
    category: 'confort',
  },
  {
    name: 'Tapis rafraîchissant',
    description: 'Un tapis froid qui aide votre animal à supporter les fortes chaleurs.',
    link: 'https://amzn.to/4xanarb',
    category: 'confort',
  },
  {
    name: 'Coussin',
    description: 'Un couchage moelleux pour des nuits et des siestes réparatrices.',
    link: 'https://amzn.to/4xaZ8MZ',
    category: 'confort',
  },

  {
    name: 'Collier anti-parasitaire',
    description: 'Protection longue durée contre les puces et les tiques.',
    link: 'https://amzn.to/3RTL7mx',
    category: 'soin',
  },
  {
    name: 'Collier anti-parasitaire (2e modèle)',
    description: 'Une autre référence de collier anti-puces et anti-tiques.',
    link: 'https://amzn.to/4e0ohko',
    category: 'soin',
  },
  {
    name: 'Collier anti-aboiement',
    description: "Une aide pour travailler les aboiements excessifs, à utiliser avec discernement.",
    link: 'https://amzn.to/3SsLTHe',
    category: 'soin',
  },
  {
    image: '/caméra.jpg',
    name: 'Caméra de surveillance',
    description: 'Gardez un œil sur votre animal où que vous soyez.',
    link: 'https://amzn.to/4okdzdA',
    category: 'soin',
  },
];

const BoutiquePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const filters: { id: CategoryId | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Tout', count: PRODUCTS.length },
    ...CATEGORIES.map(c => ({
      id: c.id,
      label: c.label,
      count: PRODUCTS.filter(p => p.category === c.id).length,
    })),
  ];

  return (
    <div className="boutique-page">
      <SEO
        title="Boutique — Nos produits recommandés pour chiens, chats et NAC"
        description="La sélection d'accessoires testés et recommandés par la garderie d'Arpajon : laisse, harnais, gamelles, fontaine à eau, jouets, couchage, colliers anti-parasitaires et plus encore."
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
          <div className="boutique-filters" role="group" aria-label="Filtrer par catégorie">
            {filters.map(f => (
              <button
                key={f.id}
                type="button"
                className={`boutique-filter ${activeCategory === f.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(f.id)}
                aria-pressed={activeCategory === f.id}
              >
                {f.label}
                <span className="boutique-filter-count">{f.count}</span>
              </button>
            ))}
          </div>

          <div className="boutique-grid">
            {visibleProducts.map((product, i) => {
              const CategoryIcon =
                CATEGORIES.find(c => c.id === product.category)?.icon ?? FaShoppingCart;

              return (
                <motion.div
                  key={product.link}
                  className="product-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                >
                  <div className="product-image">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={i < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ) : (
                      <div className="product-image-placeholder" aria-hidden="true">
                        <CategoryIcon />
                      </div>
                    )}
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
              );
            })}
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
