import { useEffect, useRef } from 'react';
import { FiMonitor, FiMessageCircle, FiCheckCircle, FiShield, FiClock, FiMapPin } from 'react-icons/fi';
import './Services.css';

const steps = [
  {
    icon: <FiMonitor />,
    title: 'Book Online',
    desc: 'Enter your flight details, number of passengers, and destination. Takes about two minutes.',
  },
  {
    icon: <FiMessageCircle />,
    title: 'Get Confirmation',
    desc: "You'll receive an email and WhatsApp message with your driver's info and meeting instructions.",
  },
  {
    icon: <FiCheckCircle />,
    title: 'Your Driver is Waiting',
    desc: 'Walk out and look for your name on a sign. No calling around, no guessing which line is yours.',
  },
];

const features = [
  {
    icon: <FiShield />,
    title: '100% Private Rides',
    desc: 'Your vehicle, your group, your schedule — no shared vans, no unexpected stops or detours.',
  },
  {
    icon: <FiClock />,
    title: 'Real-Time Flight Tracking',
    desc: 'If your flight is delayed, your driver adjusts automatically. No extra charges, no need to notify us.',
  },
  {
    icon: <FiMapPin />,
    title: 'Door-to-Door Service',
    desc: 'Straight from the airport to your hotel, villa, or Airbnb. No stops for other passengers.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-in, .animate-in-left, .animate-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        {/* Intro */}
        <div className="services__header animate-in">
          <span className="section-label">Our Service</span>
          <h2 className="section-title">
            Private Airport Transportation from PVR
          </h2>
          <p className="section-subtitle">
            After a long flight, the last thing you want is to figure out transportation.
            Your driver will be waiting at PVR Airport with a sign showing your name,
            ready to take you straight to your destination.
          </p>
        </div>

        {/* Built for */}
        <div className="services__audience animate-in">
          <h3 className="services__audience-title">This service is built for:</h3>
          <div className="services__audience-grid">
            {[
              'Couples & families on vacation',
              'Groups of friends traveling together',
              'Wedding guests & planners',
              'Vacation home & Airbnb hosts',
              'Travel agencies & companies',
            ].map((item, i) => (
              <div className="services__audience-item" key={i}>
                <span className="services__audience-check">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="services__steps-section animate-in">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Book Your PVR Airport Transfer in 3 Steps</h2>
        </div>

        <div className="services__steps stagger-children">
          {steps.map((step, i) => (
            <div className="step-card animate-in" key={i}>
              <div className="step-card__number">{String(i + 1).padStart(2, '0')}</div>
              <div className="step-card__icon">{step.icon}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="step-card__connector" />}
            </div>
          ))}
        </div>

        <p className="services__whatsapp-note animate-in">
          Have questions before or during your trip? Reach us directly on WhatsApp — a real person answers, not a bot.
        </p>

        {/* Why private */}
        <div className="services__why animate-in">
          <div className="services__why-content">
            <span className="section-label">Why Private?</span>
            <h2 className="section-title">Why Choose Private Over Shared Shuttle</h2>
            <p className="services__why-text">
              Shared shuttles look cheaper on paper, but they come with a catch: multiple stops,
              other passengers' luggage, and no fixed arrival time. If someone else's hotel is
              40 minutes out of the way, that's 40 minutes added to your ride.
            </p>
            <p className="services__why-text">
              With a private transfer, you go straight from the airport to your door.
              For families with kids, groups with luggage, or anyone who wants their
              vacation to start the moment they land — private is worth the difference.
            </p>
          </div>
          <div className="services__features stagger-children">
            {features.map((feat, i) => (
              <div className="feature-card animate-in" key={i}>
                <div className="feature-card__icon">{feat.icon}</div>
                <div>
                  <h3 className="feature-card__title">{feat.title}</h3>
                  <p className="feature-card__desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
