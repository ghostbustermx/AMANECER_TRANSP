import { useState, useEffect, useRef } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import './BookingModal.css';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  pax: '',
  arrivalDate: '',
  airline: '',
  flight: '',
  returnDate: '',
  pickup: '',
  dropoff: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingModal({ isOpen, onClose, vehicle }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState({ type: '', message: '' });
  const [sent, setSent] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '') : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.phone.trim()) nextErrors.phone = 'Phone/whatsapp is required';
    else if (form.phone.length < 10) nextErrors.phone = 'Enter a valid phone number';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Enter a valid email address';
    if (!form.pax) nextErrors.pax = 'Pax Number is required';
    else if (Number(form.pax) < 1) nextErrors.pax = 'Pax Number must be at least 1';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStep2 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSend = async () => {
    setSendStatus({ type: '', message: '' });
    setSending(true);
    try {
      const res = await fetch('/api/send-booking-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, vehicle }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Something went wrong, please try again.');
      setSendStatus({ type: 'success', message: 'Request sent! We will get back to you shortly.' });
      setSent(true);
      setForm(emptyForm);
      setErrors({});
      setStep(1);
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(onClose, 3000);
    } catch (err) {
      setSendStatus({ type: 'error', message: err.message || 'Could not send the request. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="booking-modal__overlay" onClick={onClose}>
      {sent && (
        <div className="booking-modal__toast" role="status">
          <FiCheck className="booking-modal__toast-icon" />
          Request sent! We will get back to you shortly.
        </div>
      )}
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="booking-modal__header">
          <h3 className="booking-modal__title">Book {vehicle}</h3>
          <button className="booking-modal__close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        {step === 1 ? (
          <div className="booking-modal__step">
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-name">Name</label>
              <input
                id="bm-name"
                name="name"
                type="text"
                required
                className={`booking-modal__input ${errors.name ? 'booking-modal__input--error' : ''}`}
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
              {errors.name && <span className="booking-modal__error">{errors.name}</span>}
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-phone">Phone/whatsapp</label>
              <input
                id="bm-phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                className={`booking-modal__input ${errors.phone ? 'booking-modal__input--error' : ''}`}
                value={form.phone}
                onChange={handleChange}
                placeholder="+52 ..."
              />
              {errors.phone && <span className="booking-modal__error">{errors.phone}</span>}
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-email">Email</label>
              <input
                id="bm-email"
                name="email"
                type="email"
                required
                className={`booking-modal__input ${errors.email ? 'booking-modal__input--error' : ''}`}
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />
              {errors.email && <span className="booking-modal__error">{errors.email}</span>}
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-pax">Pax Number</label>
              <input
                id="bm-pax"
                name="pax"
                type="number"
                min="1"
                required
                className={`booking-modal__input ${errors.pax ? 'booking-modal__input--error' : ''}`}
                value={form.pax}
                onChange={handleChange}
                placeholder="1"
              />
              {errors.pax && <span className="booking-modal__error">{errors.pax}</span>}
            </div>
            <div className="booking-modal__actions">
              <button className="booking-modal__next" type="button" onClick={goToStep2}>
                Next &gt;
              </button>
            </div>
          </div>
        ) : (
          <div className="booking-modal__step">
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-arrival">Arrival Date</label>
              <input
                id="bm-arrival"
                name="arrivalDate"
                type="date"
                className="booking-modal__input"
                value={form.arrivalDate}
                onChange={handleChange}
              />
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-airline">Airline</label>
              <input
                id="bm-airline"
                name="airline"
                type="text"
                className="booking-modal__input"
                value={form.airline}
                onChange={handleChange}
                placeholder="Airline name"
              />
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-flight">Flight</label>
              <input
                id="bm-flight"
                name="flight"
                type="text"
                className="booking-modal__input"
                value={form.flight}
                onChange={handleChange}
                placeholder="Flight number"
              />
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-return">Return Date</label>
              <input
                id="bm-return"
                name="returnDate"
                type="date"
                className="booking-modal__input"
                value={form.returnDate}
                onChange={handleChange}
              />
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-pickup">Pick Up</label>
              <input
                id="bm-pickup"
                name="pickup"
                type="text"
                className="booking-modal__input"
                value={form.pickup}
                onChange={handleChange}
                placeholder="Pick-up location"
              />
            </div>
            <div className="booking-modal__field">
              <label className="booking-modal__label" htmlFor="bm-dropoff">Drop off</label>
              <input
                id="bm-dropoff"
                name="dropoff"
                type="text"
                className="booking-modal__input"
                value={form.dropoff}
                onChange={handleChange}
                placeholder="Drop-off location"
              />
            </div>
            {sendStatus.message && (
              <p className={`booking-modal__status booking-modal__status--${sendStatus.type}`} role="status">
                {sendStatus.message}
              </p>
            )}
            <div className="booking-modal__actions">
              <button className="booking-modal__prev" type="button" onClick={() => setStep(1)}>
                &lt; Previous
              </button>
              <button className="booking-modal__send" type="button" onClick={handleSend} disabled={sending}>
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}