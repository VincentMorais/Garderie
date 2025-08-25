import React from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaw
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <FaPaw className="footer-logo" />
          <div>
            <h3>Le Monde Des Chiens Et Des Nacs</h3>
            <p>Garderie & Pension</p>
          </div>
        </div>

        <div className="footer-info">
          <div className="contact-info">
            <span><FaPhone /> 06 50 15 94 11</span>
            <span><FaEnvelope /> EmilieCazes@gmail.com</span>
            <span><FaMapMarkerAlt /> 26 AVENUE YOURI GAGARINE, 94400 Vitry Sur Seine</span>
          </div>
          
          <div className="footer-links">
            <Link to="/">Accueil</Link>
            <Link to="/about">À Propos</Link>
            <Link to="/planning">Planning</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Le Monde Des Chiens Et Des Nacs - Emilie Cazes</p>
        <div>
          <Link to="/about">Mentions légales</Link>
          <Link to="/contact">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
