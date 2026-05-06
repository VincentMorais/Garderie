import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDog, FaCat, FaPaw, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './GalleryPage.css';

import heroImg from '../assets/accueilrose.jpg';

import chien2 from '../assets/chien2.png';
import ambre from '../assets/ambre.jpeg';
import baco from '../assets/baco.jpeg';
import balooSamckScoobyNova from '../assets/baloo-samck-scooby-nova.jpg';
import beau from '../assets/beau.png';
import beya from '../assets/beya.jpeg';
import billy from '../assets/billy.jpg';
import blanche from '../assets/blanche.jpg';
import broka from '../assets/broka.jpg';
import brooklin from '../assets/brooklin.jpeg';
import cali from '../assets/cali.jpeg';
import canelleFilippine from '../assets/canelle et filippine.jpg';
import caramel from '../assets/caramel.jpeg';
import cheki from '../assets/cheki.jpeg';
import cheyenne from '../assets/cheyenne.jpeg';
import chino from '../assets/chino.jpeg';
import coco from '../assets/coco.jpg';
import groot from '../assets/groot.jpg';
import gueuteEpagnole from '../assets/gueute epagnole.jpeg';
import haribo from '../assets/haribo.jpg';
import iffy from '../assets/iffy.jpeg';
import iko from '../assets/iko.jpeg';
import jungel from '../assets/jungel.jpeg';
import kopa from '../assets/kopa.jpg';
import kos from '../assets/kos.jpeg';
import lili from '../assets/lili.jpeg';
import lipton from '../assets/lipton.jpeg';
import lola from '../assets/lola.jpeg';

import chienA from '../assets/chien/Screenshot_20250828_031426_com.google.android.googlequicksearchbox_edit_24629724649887.jpg';
import chienB from '../assets/chien/Screenshot_20250828_031204_com.google.android.googlequicksearchbox_edit_24671110338422.jpg';
import chienC from '../assets/chien/Screenshot_20250828_031128_com.google.android.googlequicksearchbox_edit_24655220504570.jpg';
import chienD from '../assets/chien/Screenshot_20250828_031944_com.facebook.katana.jpg';
import chienG from '../assets/chien/soka.jpg';
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
  { src: balooSamckScoobyNova, name: 'Baloo, Samck, Scooby & Nova' },
  { src: beau, name: 'Beau' },
  { src: beya, name: 'Beya' },
  { src: broka, name: 'Broka' },
  { src: brooklin, name: 'Brooklin' },
  { src: cali, name: 'Cali' },
  { src: canelleFilippine, name: 'Canelle & Filippine' },
  { src: caramel, name: 'Caramel' },
  { src: cheki, name: 'Cheki' },
  { src: cheyenne, name: 'Cheyenne' },
  { src: chino, name: 'Chino' },
  { src: groot, name: 'Groot' },
  { src: gueuteEpagnole, name: 'Gueute' },
  { src: haribo, name: 'Haribo' },
  { src: iffy, name: 'Iffy' },
  { src: iko, name: 'Iko' },
  { src: jungel, name: 'Jungel' },
  { src: kopa, name: 'Kopa' },
  { src: kos, name: 'Kos' },
  { src: lili, name: 'Lili' },
  { src: lipton, name: 'Lipton' },
  { src: lola, name: 'Lola' },
  { src: chienA, name: 'Rocky' },
  { src: chienB, name: 'Bella' },
  { src: chienC, name: 'Charlie' },
  { src: chienD, name: 'Nala' },
  { src: chienG, name: 'Soka' },
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
  { src: '/chien10.jpg', name: 'Mochi' },
  { src: '/chien12.jpg', name: 'Pixel' },
  { src: '/chien 14.jpg', name: 'Sushi' },
  { src: '/IMG_9286.jpg', name: 'Pepper' },
  { src: '/IMG_9287.jpg', name: 'Mango' },
  { src: '/0033ba82-b091-4f68-91c7-78a5df18db2f.jpg', name: 'Biscuit' },
  { src: '/073d7fc9-47db-4949-8ca5-d49bb4f34666.jpg', name: 'Praline' },
  { src: '/0fb276b6-77ae-466c-a8f5-4cb39015d514.jpg', name: 'Noisette' },
  { src: '/218e975a-2eaa-4bc7-9bba-4b7e5dbf7c15.jpg', name: 'Cookie' },
  { src: '/2e41c0a4-340e-4066-be4f-d26ab677ab9e.jpg', name: 'Câline' },
  { src: '/2f23c822-a2d5-4603-81ce-d0265ac68b5b.jpg', name: 'Joly' },
  { src: '/35cebf43-e32e-4fe0-aafc-3ad94cbe7633.jpg', name: 'Pacha' },
  { src: '/361f99f3-fd53-4194-a990-0719633fafc3.jpg', name: 'Tigrou' },
  { src: '/46d3cbea-f052-42a1-9917-1c1450a99be6.jpg', name: 'Rio' },
  { src: '/67a8657c-bfde-4740-b8f8-82142e552557.jpg', name: 'Wendy' },
  { src: '/74688ab2-5dd3-4760-adbd-7405fda4b704.jpg', name: 'Sunny' },
  { src: '/765557ae-cefb-4a7e-a078-327f5eeb8fde.jpg', name: 'Tofu' },
  { src: '/7e847b96-ce0c-4b2f-8bc6-e499dabcd5b7.jpg', name: 'Juliette' },
  { src: '/a5e6cbaf-0b83-419d-84d9-27d7ba6bcd17.jpg', name: 'Olaf' },
  { src: '/ace4d5ba-5d19-45cc-b351-22ceb9856961.jpg', name: 'Babou' },
  { src: '/b7acac69-1421-4387-b011-89c0a1a7652d.jpg', name: 'Filo' },
  { src: '/dde61c52-281c-4648-9a1d-c6d4cfc0e8d6.jpg', name: 'Roxy' },
  { src: '/e4e2d283-53ef-44aa-8f28-0c85875da051.jpg', name: 'Lulu' },
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
  { src: billy, name: 'Billy' },
  { src: blanche, name: 'Blanche' },
];

const nacPhotos: Photo[] = [
  { src: cochonsdinde, name: "Caramel & Praline" },
  { src: lapin, name: 'Réglisse' },
  { src: chienU, name: 'Perle' },
  { src: chienQ, name: 'Léna' },
  { src: '/165059ed-aac1-4a20-b8d0-5b882f039d72.jpg', name: 'Pistache' },
  { src: '/558e6e44-f0ed-4383-b35d-c38924e1c19f.jpg', name: 'Snoopy' },
  { src: '/473edcc7-f90c-41ef-a598-b8c6899ab4db.jpg', name: 'Bambi' },
  { src: '/8cf3dd55-226b-449b-a8b3-8b090ca797dd.jpg', name: 'Léo' },
  { src: '/9073d709-2e76-47a0-870d-a3afac81d1e5.jpg', name: 'Kira' },
  { src: '/dc3b8d87-64ec-473e-a6cf-1f0239a47d6f.jpg', name: 'Skye' },
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
    <div className="gallery-page" onContextMenu={(e) => e.preventDefault()}>
      <section className="gallery-hero">
        <div className="hero-background">
          <img src={heroImg} alt="Galerie photos des animaux à la garderie d'Arpajon" className="hero-image" loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
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

          <div key={activeCategory} className="gallery-grid">
            {photos.length === 0 ? (
              <div className="gallery-empty">
                <FaPaw className="empty-icon" />
                <p>Bientôt des photos à découvrir dans cette catégorie !</p>
              </div>
            ) : (
              photos.map((photo, i) => (
                <div
                  key={`${activeCategory}-${i}`}
                  className="gallery-item"
                  onClick={() => openLightbox(i)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={photo.src}
                    alt={photo.name}
                    loading={i < 16 ? 'eager' : 'lazy'}
                    decoding="async"
                    width={300}
                    height={300}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="gallery-item-overlay">
                    <span>{photo.name}</span>
                  </div>
                  <div className="gallery-item-shield" aria-hidden="true" />
                </div>
              ))
            )}
          </div>
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
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={photos[lightboxIndex].src}
                alt={`${photos[lightboxIndex].name} en pension à la garderie d'Arpajon`}
                draggable={false}
                loading="eager"
                decoding="async"
                onContextMenu={(e) => e.preventDefault()}
              />
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
