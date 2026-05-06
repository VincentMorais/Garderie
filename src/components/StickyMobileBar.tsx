import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaCalendarAlt } from 'react-icons/fa';
import './StickyMobileBar.css';

const StickyMobileBar: React.FC = () => {
  const { pathname } = useLocation();

  // Cacher la barre sur les pages admin
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      className="sticky-mobile-bar"
      role="navigation"
      aria-label="Actions rapides"
    >
      <a
        href="tel:0650159411"
        className="sticky-mobile-bar__btn sticky-mobile-bar__btn--call"
        aria-label="Appeler la garderie au 06 50 15 94 11"
      >
        <FaPhone aria-hidden="true" />
        <span>Appeler</span>
      </a>
      <Link
        to="/calendar"
        className="sticky-mobile-bar__btn sticky-mobile-bar__btn--book"
        aria-label="Réserver une garde en ligne"
      >
        <FaCalendarAlt aria-hidden="true" />
        <span>Réserver</span>
      </Link>
    </nav>
  );
};

export default StickyMobileBar;
