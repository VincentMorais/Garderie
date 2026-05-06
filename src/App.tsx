import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import BookingCalendar from './components/CalendarPage';
import ContactPage from './components/Contact';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import MentionsLegales from './components/MentionsLegales';
import Confidentialite from './components/Confidentialite';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import StickyMobileBar from './components/StickyMobileBar';
import SkipLink from './components/SkipLink';
import NotFound from './components/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/**
 * Pose un noindex sur les pages qui ne doivent pas être indexées
 * (admin, mentions légales, confidentialité, 404).
 */
const RobotsMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const noIndexRoutes = ['/admin', '/mentions-legales', '/confidentialite'];
    const shouldNoIndex = noIndexRoutes.some((r) => pathname.startsWith(r));
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = shouldNoIndex ? 'noindex, follow' : 'index, follow';
  }, [pathname]);
  return null;
};

const PublicLayout = () => (
  <div className="App">
    <SkipLink />
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/calendar" element={<BookingCalendar />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <StickyMobileBar />
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <RobotsMeta />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
