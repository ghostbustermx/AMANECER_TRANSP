import { useEffect, useRef } from 'react';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import './Destinations.css';

const destinations = [
  {
    name: 'San Pancho',
    image: '/images/san-pancho.png',
    time: '45–60 min',
    desc: "One of our most requested routes. We're one of the few companies that knows the area well and can get you there directly.",
  },
  {
    name: 'Sayulita',
    image: '/images/sayulita-beach.png',
    time: '45–60 min',
    desc: 'Popular with surfers, couples, and travelers looking for a laid-back beach town feel.',
  },
  {
    name: 'Punta de Mita',
    image: '/images/punta-mita.png',
    time: '30–45 min',
    desc: 'Quick transfers, popular with guests staying at resorts and hotel-zone properties.',
  },
];

export default function Destinations() {
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
    <section className="destinations" id="destinations" ref={sectionRef}>
      <div className="destinations__bg-pattern" />
      <div className="container">
        <div className="destinations__header animate-in">
          <span className="section-label">Destinations</span>
          <h2 className="section-title section-title--light">
            From PVR Airport to Riviera Nayarit
          </h2>
          <p className="section-subtitle section-subtitle--light">
            Most transportation companies stop at Nuevo Vallarta. We go further — deep into the
            Riviera Nayarit, where vacation rentals and boutique hotels are located.
          </p>
        </div>

        <div className="destinations__grid stagger-children">
          {destinations.map((dest, i) => (
            <div className="dest-card animate-in" key={i}>
              <div className="dest-card__image">
                <img src={dest.image} alt={`Airport transfer to ${dest.name}`} loading="lazy" />
                <div className="dest-card__overlay" />
                <div className="dest-card__time">
                  <FiClock /> {dest.time}
                </div>
              </div>
              <div className="dest-card__content">
                <h3 className="dest-card__name">{dest.name}</h3>
                <p className="dest-card__desc">{dest.desc}</p>
                <a href="#booking" className="dest-card__link">
                  Book Transfer <FiArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
