import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './TermsOfService.css';

export default function TermsOfService({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="terms-overlay" onClick={onClose}>
      <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
        <button className="terms-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        <div className="terms-content">
          <h2>Terms of Service</h2>
          <p><strong>Last updated:</strong> August 01, 2026</p>
          <p>
            Welcome to Amanecer Transportation. By booking a transfer or using our website, you agree to the following terms and conditions. Please read them carefully before making a reservation.
          </p>

          <h3>1. Booking & Reservations</h3>
          <ul>
            <li>All bookings must be made through our website, WhatsApp, or by phone.</li>
            <li>You must provide accurate pickup and drop-off information, flight details, and contact information.</li>
            <li>A confirmation will be sent once your booking is processed and payment is received.</li>
            <li>We reserve the right to refuse or cancel bookings at our discretion.</li>
          </ul>

          <h3>2. Pricing & Payment</h3>
          <ul>
            <li>All prices are quoted in USD per vehicle, not per passenger.</li>
            <li>Prices include taxes and tolls unless otherwise stated.</li>
            <li>Payment must be completed before the transfer is confirmed.</li>
            <li>We accept major credit cards and other payment methods as displayed at checkout.</li>
            <li>Pricing is subject to change without prior notice, but confirmed bookings will honor the original rate.</li>
          </ul>

          <h3>3. Cancellation & Refund Policy</h3>
          <ul>
            <li><strong>Free cancellation:</strong> Up to 24 hours before the scheduled pickup time.</li>
            <li><strong>Late cancellation:</strong> Less than 24 hours before pickup may result in a full charge.</li>
            <li><strong>No-show:</strong> No refund will be issued for no-shows without prior notice.</li>
            <li>To cancel or modify a booking, contact us via WhatsApp or email as soon as possible.</li>
          </ul>

          <h3>4. Flight Delays & Changes</h3>
          <ul>
            <li>We monitor flight arrivals and will adjust pickup times accordingly for delays.</li>
            <li>If your flight is cancelled or rescheduled, please notify us immediately.</li>
            <li>Extended waits beyond 60 minutes after flight arrival may incur additional charges.</li>
          </ul>

          <h3>5. Passenger Responsibilities</h3>
          <ul>
            <li>Passengers must be ready at the designated pickup point at the scheduled time.</li>
            <li>Seatbelts must be worn at all times during the transfer.</li>
            <li>Smoking, drinking alcohol, and consuming food are not permitted in our vehicles.</li>
            <li>Passengers are responsible for any damage caused to the vehicle due to negligence or misconduct.</li>
          </ul>

          <h3>6. Luggage & Belongings</h3>
          <ul>
            <li>Each passenger is allowed one standard suitcase and one carry-on item.</li>
            <li>Extra luggage, surfboards, golf clubs, or oversized items must be disclosed at the time of booking.</li>
            <li>We are not responsible for lost, stolen, or damaged personal belongings.</li>
          </ul>

          <h3>7. Liability</h3>
          <ul>
            <li>Amanecer Transportation provides transportation services with professional, licensed drivers.</li>
            <li>We are not liable for delays caused by traffic, weather, road conditions, or circumstances beyond our control.</li>
            <li>Our liability is limited to the total amount paid for the booking.</li>
          </ul>

          <h3>8. Insurance</h3>
          <p>
            Our vehicles carry the required insurance coverage as mandated by Mexican law. Passengers are encouraged to carry their own travel insurance for additional protection.
          </p>

          <h3>9. Modifications to Terms</h3>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Continued use of our services constitutes acceptance of the updated terms.
          </p>

          <h3>10. Contact Us</h3>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> info@amanecertransportation.com</li>
            <li><strong>Phone:</strong> +52 322 131 2997</li>
            <li><strong>WhatsApp:</strong> +52 322 131 2997</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
