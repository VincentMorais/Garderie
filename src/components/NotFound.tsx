import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPaw } from 'react-icons/fa';
import SEO from './SEO';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <SEO
        title="404 — Page introuvable"
        description="La page que vous cherchez n'existe pas. Retournez a l'accueil ou consultez notre planning."
        path="/404"
        noindex
      />
      <div className="not-found-content">
        <FaPaw className="not-found-icon" aria-hidden="true" />
        <h1>Oups, cette page s'est echappee !</h1>
        <p>
          La page que vous cherchez n'existe pas ou a ete deplacee.
          Pas de panique, revenons en territoire connu.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            <FaHome aria-hidden="true" /> Retour a l'accueil
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
