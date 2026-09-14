import { useState, useEffect, useRef } from 'react';
import { FiStar } from 'react-icons/fi';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Boskie',
    location: 'Santa Cruz, California',
    text: "Perfect for our reunion\n\nGreat service - adapted to our changing needs!\n\nWe used Amanancer to pick up and return our two families from PVR airport for our week holiday in Sayulita. Our two families had different arrival times and a delayed flight - but Amanancer worked with our schedules. We also booked two ATVs with them and they were at our Airbnb when we arrived. Everything was very smooth and communication via WhatsApp was very easy. Highly recommend!\n\nExperienced: July, 2026",
    rating: 5,
  },
  {
    name: 'SteveO',
    location: 'Redondo Beach, CA, USA',
    text: "Perfect for Our Family Celebration\n\nWe used Amanancer to pick up and return my family from and to the PTO airport for our stay at Casa Gallo in north Sayulita. They were great!!!! We had different times and day for pick ups and returns and they managed that flawlessly. They accommodated grocery shopping trips after pick-up and they rented us two golf carts that made it so we didn't need to rent cars while we were there. Lucio got all the instructions perfectly for all 17 of us. I will use them again when we go back to Casa Gallo.\n\nExperienced: June, 2026",
    rating: 5,
  },
  {
    name: 'DavidH',
    location: 'Los Angeles, CA, USA',
    text: "The Best Service To Get You Around Sayulita\n\nThey were the absolute best service to get our guests and us around Sayulita during our wedding week. *Transportation from the airport: they picked up some of our guests from the PVR airport and took them back at the end of their vacation. They had cold Coronas ready when picking up the guests in their comfortable and clean suburbans. *Golf carts: we rented golf carts from them, it was such a great idea to get around Sayulita. *Transportation on the wedding day: on the wedding day, they took care of the transportation to and from the venue. After the party they took our guests all the way to their hotels or villas. We would highly recommend them to anyone needing end-to-end transportation services in Sayuilta.\n\nExperienced: November, 2025",
    rating: 5,
    readMore: true,
  },
];

const PREVIEW_LENGTH = 400;

function getPreview(text) {
  const sliced = text.slice(0, PREVIEW_LENGTH);
  const idx = sliced.lastIndexOf(' ');
  return (idx > 250 ? sliced.slice(0, idx) : sliced) + '...';
}

function TestimonialCard({ t }) {
  const [expanded, setExpanded] = useState(false);
  const text = t.readMore && !expanded ? getPreview(t.text) : t.text;

  return (
    <div className="testimonial-card animate-in">
      <div className="testimonial-card__stars">
        {Array.from({ length: t.rating }).map((_, si) => (
          <FiStar key={si} className="testimonial-card__star" />
        ))}
      </div>
      <blockquote className="testimonial-card__text">
        &ldquo;{text}&rdquo;
      </blockquote>
      {t.readMore && (
        <button className="testimonial-card__more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Read less' : 'Read more..'}
        </button>
      )}
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="testimonial-card__name">{t.name}</div>
          <div className="testimonial-card__location">{t.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header animate-in">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">
            Real reviews from real travelers who've used our service.
          </p>
        </div>

        <div className="testimonials__carousel">
          <div className="testimonials__track">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-slide ${i === current ? 'testimonial-slide--active' : ''}`}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
          <div className="testimonials__dots">
            {testimonials.map((t, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
