import { useState, useEffect } from 'react';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Rates', href: '#rates' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      {/* Main navbar */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="container navbar__inner">
          <a href="#hero" className="navbar__logo" id="nav-logo">
            <img src="/images/LOGO_AMANECER.png" alt="Amanecer Transportation" className="navbar__logo-img" />
          </a>

          <ul className="navbar__links" id="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="tel:+523221312997" className="btn btn-primary btn-sm navbar__cta" id="nav-book-btn">
            Book Now
          </a>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} id="mobile-menu">
        <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel">
          <ul className="mobile-menu__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mobile-menu__link" onClick={handleLinkClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="tel:+523221312997" className="btn btn-primary btn-lg" onClick={handleLinkClick} id="mobile-book-btn">
            Book Now
          </a>
          <div className="mobile-menu__contact">
            <a href="tel:+523221312997"><FiPhone /> +52 322 131 2997</a>
            <a href="https://wa.me/523221312997" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
