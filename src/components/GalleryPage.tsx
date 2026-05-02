import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDog, FaCat, FaPaw, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './GalleryPage.css';

import heroImg from '../assets/accueilrose.jpg';

import chienHero from '../assets/chien.png';
import chien2 from '../assets/chien2.png';
import chienRose from '../assets/chien rose.jpg';
import ambre from '../assets/ambre.jpeg';
import baco from '../assets/baco.jpeg';
import berlingo from '../assets/berlingo.jpg';
import beau from '../assets/beau.png';
import beya from '../assets/beya.jpeg';
import billy from '../assets/billy.jpg';
import blanche from '../assets/blanche.jpg';
import broka from '../assets/broka.jpg';
import cali from '../assets/cali.jpeg';
import lola from '../assets/lola.jpeg';
import lipton from '../assets/lipton.jpeg';
import kos from '../assets/kos.jpeg';
import kopa from '../assets/kopa.jpg';
import looping from '../assets/looping.jpeg';
import canelleFilippine from '../assets/canelle et filippine.jpg';
import cheki from '../assets/cheki.jpeg';
import cheyenne from '../assets/cheyenne.jpeg';
import coco from '../assets/coco.jpg';

import chienA from '../assets/chien/Screenshot_20250828_031426_com.google.android.googlequicksearchbox_edit_24629724649887.jpg';
import chienB from '../assets/chien/Screenshot_20250828_031204_com.google.android.googlequicksearchbox_edit_24671110338422.jpg';
import chienC from '../assets/chien/Screenshot_20250828_031128_com.google.android.googlequicksearchbox_edit_24655220504570.jpg';
import chienD from '../assets/chien/Screenshot_20250828_031944_com.facebook.katana.jpg';
import chienE from '../assets/chien/Screenshot_20250828_031938_com.facebook.katana.jpg';
import chienF from '../assets/chien/Screenshot_20250828_031934_com.facebook.katana.jpg';
import chienG from '../assets/chien/soka.jpg';
import chienH from '../assets/chien/Screenshot_20250828_030920_com.google.android.googlequicksearchbox_edit_24337439609306.jpg';
import chienI from '../assets/chien/Screenshot_20250828_030602.jpg';
import chienJ from '../assets/chien/IMG_20250531_162555.jpg';
import chienK from '../assets/chien/Screenshot_20250828_025345_com.huawei.himovie.overseas.jpg';
import chienL from '../assets/chien/2022-11-09 08.44.20.jpg';
import chienM from '../assets/chien/2022-11-09 08.53.43.jpg';
import chienN from '../assets/chien/2022-12-24 14.08.40.jpg';
import chienO from '../assets/chien/2022-12-26 11.56.26.jpg';
import chienP from '../assets/chien/2022-12-27 15.18.02.jpg';
import chienQ from '../assets/chien/2023-01-23 10.47.41.jpg';
import chienR from '../assets/chien/2023-01-22 15.21.51.jpg';
import chienS from '../assets/chien/2023-01-25 09.49.19.jpg';
import chienT from '../assets/chien/2023-01-27 09.35.23.jpg';
import chienU from '../assets/chien/2023-02-03 10.36.55.jpg';
import chienV from '../assets/chien/2023-04-15 14.32.30.jpg';
import chienW from '../assets/chien/2023-05-16 10.17.24.jpg';
import chienX from '../assets/chien/2023-05-13 15.35.35.jpg';
import chienY from '../assets/chien/2023-07-06 21.29.02.jpg';
import chienZ from '../assets/chien/2023-07-13 14.06.42.jpg';
import chienAA from '../assets/chien/2023-07-19 06.19.51.jpg';
import chienBB from '../assets/chien/2023-07-25 16.12.31.jpg';
import chienCC from '../assets/chien/2023-09-18 22.10.21.jpg';
import chienDD from '../assets/chien/2023-10-13 18.29.42.jpg';
import chienEE from '../assets/chien/2023-10-21 21.10.43.jpg';
import chienFF from '../assets/chien/2023-11-21 22.04.02.jpg';
import chienGG from '../assets/chien/2023-12-14 09.52.45.jpg';
import chienHH from '../assets/chien/2023-12-16 11.44.16.jpg';
import chienII from '../assets/chien/2023-12-16 07.41.27.jpg';

import chatImg from '../assets/chat.png';

import cochonsdinde from '../assets/cochonsdinde.jpg';
import lapin from '../assets/lapin.png';

type Category = 'chiens' | 'chats' | 'nac';

interface Photo {
  src: string;
  name: string;
}

const dogsPhotos: Photo[] = [
  { src: chien2, name: 'Luna' },
  { src: ambre, name: 'Ambre' },
  { src: baco, name: 'Baco' },
  { src: beau, name: 'Beau' },
  { src: beya, name: 'Beya' },
  { src: broka, name: 'Broka' },
  { src: cali, name: 'Cali' },
  { src: lola, name: 'Lola' },
  { src: lipton, name: 'Lipton' },
  { src: kos, name: 'Kos' },
  { src: kopa, name: 'Kopa' },
  { src: looping, name: 'Looping' },
  { src: canelleFilippine, name: 'Canelle & Filippine' },
  { src: cheki, name: 'Cheki' },
  { src: cheyenne, name: 'Cheyenne' },
  { src: chienA, name: 'Rocky' },
  { src: chienB, name: 'Bella' },
  { src: chienC, name: 'Charlie' },
  { src: chienD, name: 'Nala' },
  { src: chienE, name: 'Rex' },
  { src: chienF, name: 'Daisy' },
  { src: chienG, name: 'Soka' },
  { src: chienH, name: 'Oscar' },
  { src: chienI, name: 'Stella' },
  { src: chienK, name: 'Zara' },
  { src: chienR, name: 'Filou' },
  { src: chienV, name: 'Goliath' },
  { src: chienX, name: 'Sultan' },
  { src: chienY, name: 'Cléo' },
  { src: chienAA, name: 'Jade' },
  { src: chienBB, name: 'Dino' },
  { src: chienCC, name: 'Fiona' },
  { src: chienDD, name: 'Pablo' },
  { src: chienEE, name: 'Vénus' },
  { src: chienFF, name: 'Ugo' },
  { src: chienGG, name: 'Moka' },
  { src: chienII, name: 'Lara' },
];

const catsPhotos: Photo[] = [
  { src: chatImg, name: 'Mimi' },
  { src: chienJ, name: 'Bruno' },
  { src: chienL, name: 'Toby' },
  { src: chienM, name: 'Maya' },
  { src: chienN, name: 'Simba' },
  { src: chienO, name: 'Nora' },
  { src: chienP, name: 'Titan' },
  { src: chienS, name: 'Iris' },
  { src: chienT, name: 'Gus' },
  { src: chienW, name: 'Nina' },
  { src: chienZ, name: 'Balou' },
  { src: chienHH, name: 'Zéphyr' },
  { src: coco, name: 'Coco' },
  { src: berlingo, name: 'Berlingo' },
  { src: billy, name: 'Billy' },
  { src: blanche, name: 'Blanche' },
];

const nacPhotos: Photo[] = [
  { src: cochonsdinde, name: "Caramel & Praline" },
  { src: lapin, name: 'Réglisse' },
  { src: chienU, name: 'Perle' },
  { src: chienQ, name: 'Léna' },
];

const CATEGORIES: { id: Category; label: string; icon: React.ComponentType; photos: Photo[] }[] = [
  { id: 'chiens', label: 'Chiens', icon: FaDog, photos: dogsPhotos },
  { id: 'chats', label: 'Chats', icon: FaCat, photos: catsPhotos },
  { id: 'nac', label: 'NAC', icon: FaPaw, photos: nacPhotos },
];

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('chiens');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory)!;
  const photos = currentCategory.photos;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="hero-background">
          <img src={heroImg} alt="Galerie" className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">Notre Galerie</h1>
            <p className="hero-subtitle">
              Découvrez les compagnons que nous avons eu le plaisir d'accueillir
            </p>
          </motion.div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <motion.div
            className="gallery-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {CATEGORIES.map(cat => {
              const Icon = cat.icon as React.ComponentType<{ className?: string }>;
              return (
                <button
                  key={cat.id}
                  className={`gallery-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon className="tab-icon" />
                  <span>{cat.label}</span>
                  <span className="tab-count">{cat.photos.length}</span>
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="gallery-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {photos.length === 0 ? (
                <div className="gallery-empty">
                  <FaPaw className="empty-icon" />
                  <p>Bientôt des photos à découvrir dans cette catégorie !</p>
                </div>
              ) : (
                photos.map((photo, i) => (
                  <motion.div
                    key={`${activeCategory}-${i}`}
                    className="gallery-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    onClick={() => openLightbox(i)}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img src={photo.src} alt={photo.name} loading="lazy" />
                    <div className="gallery-item-overlay">
                      <span>{photo.name}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={showPrev}>
              <FaChevronLeft />
            </button>
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].name} />
              <div className="lightbox-caption">{photos[lightboxIndex].name}</div>
            </motion.div>
            <button className="lightbox-nav lightbox-next" onClick={showNext}>
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
