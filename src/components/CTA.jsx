import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './CTA.css';

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    const elements = sectionRef.current?.querySelectorAll('.animate-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta" id="contact" ref={sectionRef}>
      <div className="cta__bg" />
      <div className="container cta__container">
        <div className="cta__content animate-in">
          <span className="section-label">Ready to Go?</span>
          <h2 className="cta__title">
            Book Your Sayulita Airport Transfer Today
          </h2>
          <p className="cta__subtitle">
            Your vacation starts the moment you land — not after you've spent 30 minutes
            figuring out how to get to your hotel. Book your private transfer now and skip the line.
          </p>
          <div className="cta__buttons">
            <a href="#rates" className="btn btn-primary btn-lg" id="cta-book-btn">
              Book Now <FiArrowRight />
            </a>
            <a
              href="https://wa.me/523221312997"
              className="btn btn-whatsapp btn-lg"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <a href="tel:+523221312997" className="btn btn-outline btn-lg" id="cta-call-btn">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
