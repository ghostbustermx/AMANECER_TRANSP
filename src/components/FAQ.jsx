import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './FAQ.css';

const faqs = [
  {
    q: 'How much does a private transfer from PVR airport cost?',
    a: "Rates start at $ 2,700 mxn One Way and vary based on your destination and the number of passengers. Longer routes into the Riviera Nayarit (like San Pancho or Punta Mita) cost more than transfers within Sayulita or Nuevo Vallarta. You'll see the exact price before you book — no surprises at pickup.",
  },
  {
    q: 'How will I find my driver at the airport?',
    a: "Your driver will be waiting just outside the arrivals area holding a sign with your name. You'll also receive their name and phone number by WhatsApp before your flight lands, so you can reach out directly if you don't see them right away.",
  },
  {
    q: 'What happens if my flight is delayed?',
    a: "We track your flight in real time, so if it's delayed, your driver adjusts the pickup time automatically. You won't be charged extra, and you won't need to notify us — we already know.",
  },
  {
    q: 'Is it better to book a private transfer in advance or take a taxi at the airport?',
    a: "Booking ahead means a fixed price, a driver who's already expecting you, and no negotiating in a crowded terminal after a long flight. Airport taxis in Sayulita don't have standardized rates, so what looks like a cheaper option can end up costing more — and you have no guarantee of vehicle quality or driver reliability.",
  },
  {
    q: 'Can I add a stop at the supermarket or store on the way to my hotel?',
    a: "Yes. If you'd like to stop for groceries, drinks, or anything else on the way to your hotel or rental, just let us know when you book. It's a small detail, but it means one less errand once you've settled in.",
  },
  {
    q: 'Do you offer round-trip service?',
    a: 'Yes. You can book your airport-to-hotel and hotel-to-airport transfers together and lock in your return trip before you even leave home.',
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-item__question" onClick={onClick} aria-expanded={isOpen}>
        <span>{faq.q}</span>
        <FiChevronDown className="faq-item__icon" />
      </button>
      <div className="faq-item__answer-wrapper">
        <div className="faq-item__answer">
          <p>{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.animate-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq__header animate-in">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know about our Sayulita airport transportation service.
          </p>
        </div>

        <div className="faq__list animate-in">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
