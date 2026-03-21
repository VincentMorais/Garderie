// src/components/InfiniteCarousel.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw } from 'react-icons/fa';
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

// Import des photos de chiens du dossier chien
import chien1 from '../assets/chien/Screenshot_20250828_031426_com.google.android.googlequicksearchbox_edit_24629724649887.jpg';
import chien2 from '../assets/chien/Screenshot_20250828_031204_com.google.android.googlequicksearchbox_edit_24671110338422.jpg';
import chien3 from '../assets/chien/Screenshot_20250828_031128_com.google.android.googlequicksearchbox_edit_24655220504570.jpg';
import chien4 from '../assets/chien/Screenshot_20250828_031944_com.facebook.katana.jpg';
import chien5 from '../assets/chien/Screenshot_20250828_031938_com.facebook.katana.jpg';
import chien6 from '../assets/chien/Screenshot_20250828_031934_com.facebook.katana.jpg';
import chien7 from '../assets/chien/soka.jpg';
import chien8 from '../assets/chien/Screenshot_20250828_030920_com.google.android.googlequicksearchbox_edit_24337439609306.jpg';
import chien9 from '../assets/chien/Screenshot_20250828_030602.jpg';
import chien10 from '../assets/chien/IMG_20250531_162555.jpg';
import chien11 from '../assets/chien/Screenshot_20250828_025345_com.huawei.himovie.overseas.jpg';
import chien12 from '../assets/chien/2022-11-09 08.44.20.jpg';
import chien13 from '../assets/chien/2022-11-09 08.53.43.jpg';
import chien14 from '../assets/chien/2022-12-24 14.08.40.jpg';
import chien15 from '../assets/chien/2022-12-26 11.56.26.jpg';
import chien16 from '../assets/chien/2022-12-27 15.18.02.jpg';
import chien17 from '../assets/chien/2023-01-23 10.47.41.jpg';
import chien18 from '../assets/chien/2023-01-22 15.21.51.jpg';
import chien19 from '../assets/chien/2023-01-25 09.49.19.jpg';
import chien20 from '../assets/chien/2023-01-27 09.35.23.jpg';
import chien21 from '../assets/chien/2023-02-03 10.36.55.jpg';
import chien22 from '../assets/chien/2023-04-15 14.32.30.jpg';
import chien23 from '../assets/chien/2023-05-16 10.17.24.jpg';
import chien24 from '../assets/chien/2023-05-13 15.35.35.jpg';
import chien25 from '../assets/chien/2023-07-06 21.29.02.jpg';
import chien26 from '../assets/chien/2023-07-13 14.06.42.jpg';
import chien27 from '../assets/chien/2023-07-19 06.19.51.jpg';
import chien28 from '../assets/chien/2023-07-25 16.12.31.jpg';
import chien29 from '../assets/chien/2023-09-18 22.10.21.jpg';
import chien30 from '../assets/chien/2023-10-13 18.29.42.jpg';
import chien31 from '../assets/chien/2023-10-21 21.10.43.jpg';
import chien32 from '../assets/chien/2023-11-21 22.04.02.jpg';
import chien33 from '../assets/chien/2023-12-14 09.52.45.jpg';
import chien34 from '../assets/chien/2023-12-16 11.44.16.jpg';
import chien35 from '../assets/chien/2023-12-16 07.41.27.jpg';

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
  { src: img21, name: "Coco", rating: 5 },
  // Ajout des photos de chiens du dossier chien
  { src: chien1, name: "Chien Adorable 1", rating: 5 },
  { src: chien2, name: "Chien Adorable 2", rating: 5 },
  { src: chien3, name: "Chien Adorable 3", rating: 5 },
  { src: chien4, name: "Chien Adorable 4", rating: 5 },
  { src: chien5, name: "Chien Adorable 5", rating: 5 },
  { src: chien6, name: "Chien Adorable 6", rating: 5 },
  { src: chien7, name: "Soka", rating: 5 },
  { src: chien8, name: "Chien Adorable 8", rating: 5 },
  { src: chien9, name: "Chien Adorable 9", rating: 5 },
  { src: chien10, name: "Chien Adorable 10", rating: 5 },
  { src: chien11, name: "Chien Adorable 11", rating: 5 },
  { src: chien12, name: "Chien Adorable 12", rating: 5 },
  { src: chien13, name: "Chien Adorable 13", rating: 5 },
  { src: chien14, name: "Chien Adorable 14", rating: 5 },
  { src: chien15, name: "Chien Adorable 15", rating: 5 },
  { src: chien16, name: "Chien Adorable 16", rating: 5 },
  { src: chien17, name: "Chien Adorable 17", rating: 5 },
  { src: chien18, name: "Chien Adorable 18", rating: 5 },
  { src: chien19, name: "Chien Adorable 19", rating: 5 },
  { src: chien20, name: "Chien Adorable 20", rating: 5 },
  { src: chien21, name: "Chien Adorable 21", rating: 5 },
  { src: chien22, name: "Chien Adorable 22", rating: 5 },
  { src: chien23, name: "Chien Adorable 23", rating: 5 },
  { src: chien24, name: "Chien Adorable 24", rating: 5 },
  { src: chien25, name: "Chien Adorable 25", rating: 5 },
  { src: chien26, name: "Chien Adorable 26", rating: 5 },
  { src: chien27, name: "Chien Adorable 27", rating: 5 },
  { src: chien28, name: "Chien Adorable 28", rating: 5 },
  { src: chien29, name: "Chien Adorable 29", rating: 5 },
  { src: chien30, name: "Chien Adorable 30", rating: 5 },
  { src: chien31, name: "Chien Adorable 31", rating: 5 },
  { src: chien32, name: "Chien Adorable 32", rating: 5 },
  { src: chien33, name: "Chien Adorable 33", rating: 5 },
  { src: chien34, name: "Chien Adorable 34", rating: 5 },
  { src: chien35, name: "Chien Adorable 35", rating: 5 }
];

const half = Math.ceil(images.length / 2);
const row1 = images.slice(0, half);
const row2 = images.slice(half);

const InfiniteCarousel: React.FC = () => {
  return (
    <section className="photo-strip-section">

      <motion.div
        className="photo-strip-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="photo-strip-title">
          <FaHeart className="strip-title-icon" />
          <h2>Nos Compagnons Heureux</h2>
          <FaPaw className="strip-title-icon" />
        </div>
        <p>Découvrez les compagnons qui nous font confiance chaque jour</p>
      </motion.div>

      {/* Rangée 1 — défile vers la gauche */}
      <div className="strip-row">
        <div className="strip-track">
          {[...row1, ...row1].map((img, i) => (
            <div className="strip-item" key={`r1-${i}`}>
              <img src={img.src} alt={img.name} loading="lazy" />
              <div className="strip-item-overlay">
                <span>{img.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rangée 2 — défile vers la droite */}
      <div className="strip-row">
        <div className="strip-track strip-track--reverse">
          {[...row2, ...row2].map((img, i) => (
            <div className="strip-item" key={`r2-${i}`}>
              <img src={img.src} alt={img.name} loading="lazy" />
              <div className="strip-item-overlay">
                <span>{img.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default InfiniteCarousel;
