import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './PrivacyPolicy.css';

export default function PrivacyPolicy({ isOpen, onClose }) {
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
    <div className="privacy-overlay" onClick={onClose}>
      <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
        <button className="privacy-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        <div className="privacy-content">
          <h2>Privacy Policy</h2>
          <p><strong>Last updated:</strong> August 01, 2026</p>
          <p>
            This Privacy Policy describes how Amanecer Transportation ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website and use our transportation services.
          </p>

          <h3>1. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and travel details when you book a transfer.</li>
            <li><strong>Payment Information:</strong> Billing details necessary to process your booking.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Process and confirm your transportation bookings.</li>
            <li>Communicate with you regarding your reservations.</li>
            <li>Send you promotional offers and updates (with your consent).</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h3>3. Information Sharing</h3>
          <p>We do not sell your personal information. We may share your data with:</p>
          <ul>
            <li>Our drivers and operations team to fulfill your transfer.</li>
            <li>Payment processors for secure transaction handling.</li>
            <li>Legal authorities when required by law.</li>
          </ul>

          <h3>4. Data Security</h3>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3>5. Cookies</h3>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.
          </p>

          <h3>6. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>

          <h3>7. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.
          </p>

          <h3>8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h3>9. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
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
