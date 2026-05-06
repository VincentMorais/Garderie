import React from 'react';
import './SkipLink.css';

/**
 * Lien d'évitement (skip link) pour l'accessibilité.
 * Caché visuellement, visible au focus clavier.
 * WCAG 2.4.1 — Bypass Blocks
 */
const SkipLink: React.FC = () => (
  <a href="#main-content" className="skip-link">
    Aller au contenu principal
  </a>
);

export default SkipLink;
