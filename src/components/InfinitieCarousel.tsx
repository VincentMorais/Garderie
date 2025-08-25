// src/components/InfiniteCarousel.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaPaw } from 'react-icons/fa';
import './InfiniteCarousel.css';

// Import des images
import img1 from '../assets/chien.png';
import img2 from '../assets/chien2.png';
import img3 from '../assets/chat.png';
import img4 from '../assets/ambre.jpeg';
import img5 from '../assets/baco.jpeg';
import img6 from '../assets/berlingo.jpg';
import img7 from '../assets/beau.png';
import img8 from '../assets/beya.jpeg';
import img9 from '../assets/billy.jpg';
import img10 from '../assets/blanche.jpg';
import img11 from '../assets/broka.jpg';
import img12 from '../assets/cali.jpeg';
import img13 from '../assets/lola.jpeg';
import img14 from '../assets/lipton.jpeg';
import img15 from '../assets/kos.jpeg';
import img16 from '../assets/kopa.jpg';
import img17 from '../assets/looping.jpeg';
import img18 from '../assets/canelle et filippine.jpg';
import img19 from '../assets/cheki.jpeg';
import img20 from '../assets/cheyenne.jpeg';
import img21 from '../assets/coco.jpg';

const images = [
  { src: img1, name: "Chien 1", rating: 5 },
  { src: img2, name: "Chien 2", rating: 5 },
  { src: img3, name: "Chat", rating: 5 },
  { src: img4, name: "Ambre", rating: 5 },
  { src: img5, name: "Baco", rating: 5 },
  { src: img6, name: "Berlingo", rating: 5 },
  { src: img7, name: "Beau", rating: 5 },
  { src: img8, name: "Beya", rating: 5 },
  { src: img9, name: "Billy", rating: 5 },
  { src: img10, name: "Blanche", rating: 5 },
  { src: img11, name: "Broka", rating: 5 },
  { src: img12, name: "Cali", rating: 5 },
  { src: img13, name: "Lola", rating: 5 },
  { src: img14, name: "Lipton", rating: 5 },
  { src: img15, name: "Kos", rating: 5 },
  { src: img16, name: "Kopa", rating: 5 },
  { src: img17, name: "Looping", rating: 5 },
  { src: img18, name: "Canelle et Filippine", rating: 5 },
  { src: img19, name: "Cheki", rating: 5 },
  { src: img20, name: "Cheyenne", rating: 5 },
  { src: img21, name: "Coco", rating: 5 }
];

const InfiniteCarousel: React.FC = () => {
  return (
    <div className="carousel-section">
      {/* Header du carrousel */}
      <div className="carousel-header">
        <motion.div 
          className="carousel-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FaHeart className="title-icon" />
          <h2>Nos Compagnons Heureux</h2>
          <FaPaw className="title-icon" />
        </motion.div>
        <motion.p 
          className="carousel-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Découvrez les compagnons qui nous font confiance chaque jour
        </motion.p>
      </div>

      {/* Carrousel infini */}
      <div className="carousel-container">
        <div className="carousel-track">
          {/* Premier set d'images */}
          {images.map((image, index) => (
            <motion.div 
              className="carousel-item"
              key={`first-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className="item-image">
                <img src={image.src} alt={image.name} />
                <div className="item-overlay">
                  <div className="rating">
                    {[...Array(image.rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <span className="item-name">{image.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Deuxième set d'images (pour l'effet infini) */}
          {images.map((image, index) => (
            <motion.div 
              className="carousel-item"
              key={`second-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className="item-image">
                <img src={image.src} alt={image.name} />
                <div className="item-overlay">
                  <div className="rating">
                    {[...Array(image.rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <span className="item-name">{image.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicateurs de navigation */}
      <div className="carousel-indicators">
        <motion.div 
          className="indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FaPaw className="indicator-icon" />
          <span>Faites défiler pour voir plus de compagnons</span>
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
