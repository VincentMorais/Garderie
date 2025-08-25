// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import BookingCalendar from './components/CalendarPage';
import ContactPage from './components/Contact';
import AboutPage from './components/AboutPage'
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import du Footer

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/calendar" element={<BookingCalendar />} />
            <Route path="/about" element={<AboutPage  />} />
            <Route path="/contact" element={<ContactPage  />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
