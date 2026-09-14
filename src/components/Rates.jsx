import { useState, useEffect, useRef } from 'react';
import { FiUsers, FiCheck } from 'react-icons/fi';
import BookingModal from './BookingModal';
import './Rates.css';

const vehicles = [
  {
    name: 'Private SUV',
    passengers: '1–4',
    price: '$1,800',
    unit: 'mxn',
    note: '(Sayulita - Airport, One Way)',
    image: '/images/SUBURBAN-1-1.webp',
    popular: false,
    features: [
      'Climate-controlled cabin',
      'Fits luggage comfortably',
      'Ideal for couples & small families',
      'Most booked for Sayulita & San Pancho',
    ],
    desc: 'Ideal for couples, small families, or friends traveling together.',
  },
  {
    name: 'Private Van',
    passengers: '5–7',
    price: '$2,000',
    unit: 'mxn',
    note: '(Sayulita - Airport, One Way)',
    image: '/images/VAN-1.webp',
    popular: true,
    features: [
      'Spacious for groups',
      'Room for extra luggage',
      'Air-conditioned comfort',
      'Great for friend groups',
    ],
    desc: 'Our most-booked option for trips to San Pancho, Sayulita, and Nuevo Vallarta.',
  },
  {
    name: 'Private Van Express',
    passengers: '8–10+',
    price: '$3,000',
    unit: 'mxn',
    note: '(Sayulita - Airport, One Way)',
    image: '/images/EXPRESS_VAN.webp',
    popular: false,
    features: [
      'Keep your whole group together',
      'Wedding parties welcome',
      'Family reunions & events',
      'No splitting into separate cars',
    ],
    desc: 'Keep everyone together in one ride — no splitting up into separate vehicles.',
  },
];

export default function Rates() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState(vehicles[0].name);
  const [bookingCount, setBookingCount] = useState(0);
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
    <section className="rates" id="rates" ref={sectionRef}>
      <div className="container">
        <div className="rates__header animate-in">
          <span className="section-label">Rates & Vehicles</span>
          <h2 className="section-title">Transportation Rates & Vehicle Options</h2>
          <p className="section-subtitle">
            All prices include a professional driver, air-conditioned vehicle,
            flight tracking, and meet &amp; greet at the airport. No hidden fees.
          </p>
        </div>

        <div className="rates__grid stagger-children">
          {vehicles.map((v) => (
            <div className={`rate-card animate-in ${v.popular ? 'rate-card--popular' : ''}`} key={v.name}>
              {v.popular && <div className="rate-card__badge">Most Popular</div>}
              <div className="rate-card__image">
                <img src={v.image} alt={v.name} loading="lazy" />
              </div>
              <div className="rate-card__content">
                <h3 className="rate-card__name">{v.name}</h3>
                <div className="rate-card__passengers">
                  <FiUsers /> {v.passengers} Passengers
                </div>
                <div className="rate-card__price">
                  <span className="rate-card__price-from">From</span>
                  <span className="rate-card__price-amount">{v.price}</span>
                  <span className="rate-card__price-unit">{v.unit || 'USD'}</span>
                  {v.note && <span className="rate-card__price-note">{v.note}</span>}
                </div>
                <p className="rate-card__desc">{v.desc}</p>
                <ul className="rate-card__features">
                  {v.features.map((feat, fi) => (
                    <li key={fi}>
                      <FiCheck className="rate-card__check" /> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn ${v.popular ? 'btn-primary' : 'btn-dark'} rate-card__btn`}
                  onClick={() => {
                    setBookingVehicle(v.name);
                    setBookingOpen(true);
                    setBookingCount((c) => c + 1);
                  }}
                >
                  Book {v.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal
        key={bookingCount}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        vehicle={bookingVehicle}
      />
    </section>
  );
}
