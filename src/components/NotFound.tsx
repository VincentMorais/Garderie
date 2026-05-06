import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPaw } from 'react-icons/fa';
import './NotFound.css';

const NotFound: React.FC = () => {
  // Indique aux moteurs que la page est manquante (et applique un noindex)
  useEffect(() => {
    document.title = '404 — Page introuvable | Le Monde des Chiens et des NACs';
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    const previous = robots.content;
    robots.content = 'noindex, follow';
    return () => {
      robots!.content = previous || 'index, follow';
    };
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <FaPaw className="not-found-icon" aria-hidden="true" />
        <h1>Oups, cette page s'est échappée !</h1>
        <p>
          La page que vous cherchez n'existe pas ou a été déplacée. Pas de panique,
          revenons en territoire connu.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            <FaHome aria-hidden="true" /> Retour à l'accueil
          </Link>
          <Link to="/calendar" className="not-found-btn not-found-btn--secondary">
            <FaCalendarAlt aria-hidden="true" /> Voir le planning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
