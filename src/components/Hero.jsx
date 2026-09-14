import { useState } from 'react';
import { FiMapPin, FiCalendar, FiUsers, FiMail, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Hero() {
  const [destination, setDestination] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [arrival, setArrival] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!destination.trim()) {
      setStatus({ type: 'error', message: 'Please choose a destination first.' });
      return;
    }
    if (!arrival) {
      setStatus({ type: 'error', message: 'Please select your arrival date.' });
      return;
    }
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email.' });
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus({ type: 'error', message: 'Enter a valid email address.' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, tripType, arrival, passengers, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Something went wrong, please try again.');
      setStatus({ type: 'success', message: 'Request sent! We will get back to you shortly.' });
      setDestination('');
      setArrival('');
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Could not send the request. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src="/images/hero-sunset.webp" alt="Sayulita sunset at the Malecon" />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <div className="hero__text">
          <span className="hero__badge">✈ PVR Airport Transfers</span>
          <span className="hero__badge">Available 24/7</span>
          <h1 className="hero__title">
            Puerto Vallarta to Sayulita
            <span className="hero__title-accent"> Transportation</span>
          </h1>
          <p className="hero__subtitle">
            Private, pre-booked transfers from PVR Airport to Sayulita &amp; the Riviera Nayarit.
            No shared vans. No waiting. No surprises.
          </p>
          <div className="hero__price">
            Rates from <span className="hero__price-amount">$1,800 mxn</span> per vehicle (one-way)
          </div>
          <div className="hero__actions">
            <a href="#booking" className="btn btn-primary btn-lg" id="hero-book-btn">
              Book Your Transfer <FiArrowRight />
            </a>
            <a
              href="https://wa.me/523221312997"
              className="btn btn-outline btn-lg"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Booking Bar */}
      <div className="booking-bar" id="booking">
        <div className="container">
          <form className="booking-bar__form" onSubmit={handleSubmit}>
            <div className="booking-bar__field">
              <label className="booking-bar__label" htmlFor="booking-destination">
                <FiMapPin /> Destination
              </label>
              <input
                type="text"
                className="booking-bar__input"
                placeholder="Resort / Hotel / City"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                id="booking-destination"
              />
            </div>

            <div className="booking-bar__field">
              <label className="booking-bar__label" htmlFor="booking-trip-type">
                <FiArrowRight /> Trip Type
              </label>
              <select
                className="booking-bar__select"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                id="booking-trip-type"
              >
                <option value="round-trip">Round Trip</option>
                <option value="one-way">One Way</option>
              </select>
            </div>

            <div className="booking-bar__field">
              <label className="booking-bar__label" htmlFor="booking-arrival">
                <FiCalendar /> Arrival Date
              </label>
              <input
                type="date"
                className="booking-bar__input"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                id="booking-arrival"
              />
            </div>

            <div className="booking-bar__field">
              <label className="booking-bar__label" htmlFor="booking-passengers">
                <FiUsers /> Passengers
              </label>
              <select
                className="booking-bar__select"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                id="booking-passengers"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="booking-bar__field">
              <label className="booking-bar__label" htmlFor="booking-email">
                <FiMail /> Email
              </label>
              <input
                type="email"
                className="booking-bar__input"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="booking-email"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg booking-bar__btn"
              id="booking-continue-btn"
              disabled={sending}
            >
              {sending ? 'Sending…' : 'Continue'} <FiArrowRight />
            </button>
          </form>
          {status.message && (
            <p className={`booking-bar__status booking-bar__status--${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="hero__trust container">
        <div className="hero__trust-item">
          <span className="hero__trust-number">500+</span>
          <span className="hero__trust-label">Happy Travelers</span>
        </div>
        <div className="hero__trust-divider" />
        <div className="hero__trust-item">
          <span className="hero__trust-number">4.9★</span>
          <span className="hero__trust-label">Average Rating</span>
        </div>
        <div className="hero__trust-divider" />
        <div className="hero__trust-item">
          <span className="hero__trust-number">24/7</span>
          <span className="hero__trust-label">WhatsApp Support</span>
        </div>
        <div className="hero__trust-divider" />
        <div className="hero__trust-item">
          <span className="hero__trust-number">0</span>
          <span className="hero__trust-label">Hidden Fees</span>
        </div>
      </div>
    </section>
  );
}
