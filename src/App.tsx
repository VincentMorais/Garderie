import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import BookingCalendar from './components/CalendarPage';
import ContactPage from './components/Contact';
import AboutPage from './components/AboutPage';
import MentionsLegales from './components/MentionsLegales';
import Confidentialite from './components/Confidentialite';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const PublicLayout = () => (
  <div className="App">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/calendar" element={<BookingCalendar />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
