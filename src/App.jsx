import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Rates from './components/Rates';
import Destinations from './components/Destinations';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ImageCarousel from './components/ImageCarousel';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import './App.css';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [pageLength, setPageLength] = useState(0);

  useEffect(() => {
    const measure = () => setPageLength(document.body.scrollHeight - window.innerHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (pageLength <= 0) return;
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / pageLength) * 100;
      setShowScrollTop(scrollPercent >= 6);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageLength]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Rates />
        <Destinations />
        <FAQ />
        <Testimonials />
        <CTA />
      </main>
      <Footer onPrivacyClick={() => setPrivacyOpen(true)} onTermsClick={() => setTermsOpen(true)} />

      <a
        href="https://wa.me/523221312997"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <button
        className={`scroll-top-btn ${showScrollTop ? 'scroll-top-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfService isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <ImageCarousel />
    </div>
  );
}
