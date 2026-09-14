import { useState, useEffect } from 'react';
import './ImageCarousel.css';

const images = [
  { src: '/images/SUBURBAN.webp', alt: 'Chevy Suburban' },
  { src: '/images/ford_transit-1.webp', alt: 'Ford Transit' },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="image-carousel">
      {images.map((img, index) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`image-carousel__img ${index === current ? 'image-carousel__img--active' : ''}`}
        />
      ))}
    </div>
  );
}