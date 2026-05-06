import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import ContactPage from './components/Contact';
import AboutPage from './components/AboutPage';
import MentionsLegales from './components/MentionsLegales';
import Confidentialite from './components/Confidentialite';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import SkipLink from './components/SkipLink';
import NotFound from './components/NotFound';
import LandingArea from './components/LandingArea';

// Code-splitting : pages lourdes chargees a la demande
// (~ -300 a 500 Ko gzip sur le bundle initial)
const BookingCalendar = lazy(() => import('./components/CalendarPage'));
const GalleryPage = lazy(() => import('./components/GalleryPage'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BretignyLanding = () => (
  <LandingArea
    city="Brétigny-sur-Orge"
    postalCode="91220"
    distanceMin={10}
    landmark="situé à seulement 10 min d'Arpajon par la D19"
    slug="garderie-bretigny-sur-orge"
  />
);

const SaintGermainLanding = () => (
  <LandingArea
    city="Saint-Germain-lès-Arpajon"
    postalCode="91180"
    distanceMin={5}
    landmark="commune limitrophe d'Arpajon, à 5 min de la garderie"
    slug="garderie-saint-germain-les-arpajon"
  />
);

const NorvilleLanding = () => (
  <LandingArea
    city="La Norville"
    postalCode="91290"
    distanceMin={5}
    landmark="commune voisine d'Arpajon, à 5 min en voiture"
    slug="garderie-la-norville"
  />
);

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 36, height: 36, border: '3px solid #f6c1c7', borderTopColor: '#1f2937', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const PublicLayout = () => (
  <div className="App">
    <SkipLink />
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/calendar" element={<BookingCalendar />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/garderie-bretigny-sur-orge" element={<BretignyLanding />} />
          <Route path="/garderie-saint-germain-les-arpajon" element={<SaintGermainLanding />} />
          <Route path="/garderie-la-norville" element={<NorvilleLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
    <StickyMobileBar />
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageFallback />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <Suspense fallback={<PageFallback />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
