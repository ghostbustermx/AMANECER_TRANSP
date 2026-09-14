import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import './Footer.css';

export default function Footer({ onPrivacyClick, onTermsClick }) {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">
              <img src="/images/LOGO_AMANECER.png" alt="Amanecer Transportation" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">
              Private airport transfers from PVR to Sayulita &amp; the Riviera Nayarit.
              Your vacation starts the moment you land.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook" id="footer-facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram" id="footer-instagram">
                <FaInstagram />
              </a>
              <a href="#" className="footer__social-link" aria-label="TripAdvisor" id="footer-tripadvisor">
                <FaTripadvisor />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h3 className="footer__col-title">Quick Links</h3>
            <ul className="footer__links">
              <li><a href="#services">Our Services</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#rates">Rates & Vehicles</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#booking">Book Online</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="footer__col">
            <h3 className="footer__col-title">Destinations</h3>
            <ul className="footer__links">
              <li><a href="#destinations">San Pancho</a></li>
              <li><a href="#destinations">Sayulita</a></li>
              <li><a href="#destinations">Punta Mita</a></li>
              <li><a href="#destinations">Nuevo Vallarta</a></li>
              <li><a href="#destinations">Bucerías</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__contact">
              <li>
                <FiPhone className="footer__contact-icon" />
                <a href="tel:+523221312997">+52 322 131 2997</a>
              </li>
              <li>
                <FaWhatsapp className="footer__contact-icon" />
                <a href="https://wa.me/523221312997" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat
                </a>
              </li>
              <li>
                <FiMail className="footer__contact-icon" />
                <a href="mailto:info@amanecertransportation.com">
                  info@amanecertransportation.com
                </a>
              </li>
              <li>
                <FiMapPin className="footer__contact-icon" />
                <a
                  href="https://maps.app.goo.gl/6TxQc24PLPMfNK5d8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__address-link"
                >
                  Miramar 23-d Sayulita Nayarit, Bahía de Banderas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Amanecer Transportation. All rights reserved.
            Powered by <a href="https://sayulitatravel.com/" target="_blank" rel="noopener noreferrer" className="footer__powered-link">Sayulita Travel</a>.
          </p>
          <div className="footer__bottom-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onPrivacyClick(); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onTermsClick(); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
