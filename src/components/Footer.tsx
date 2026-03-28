import React from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaw, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <FaPaw />
          </div>
          <h3>Le Monde Des Chiens<br />Et Des Nacs</h3>
          <p>Garderie & Pension à Arpajon</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <nav className="footer-nav">
            <Link to="/">Accueil</Link>
            <Link to="/about">À propos</Link>
            <Link to="/calendar">Réservation</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Nous trouver</h4>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt className="fc-icon" />
              <span>5 Impasse du Tacot<br />91290 Arpajon</span>
            </li>
            <li>
              <FaPhone className="fc-icon" />
              <a href="tel:0650159411">06 50 15 94 11</a>
            </li>
            <li>
              <FaEnvelope className="fc-icon" />
              <a href="mailto:contact@lemondedeschiensetdesnacs.com">contact@lemondedeschiensetdesnacs.com</a>
            </li>
            <li>
              <FaClock className="fc-icon" />
              <span>Lun–Ven 7h–19h<br />Sam–Dim 9h–18h</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Le Monde Des Chiens Et Des Nacs — Émilie Cazes</p>
        <div className="footer-bottom-links">
          <Link to="/about">Mentions légales</Link>
          <Link to="/contact">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
