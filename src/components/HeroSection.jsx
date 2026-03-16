import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection Component
 * Displays a rotating hero image from student photographers
 * Shows landscape-oriented photos with photographer credit
 */
function HeroSection({ photos }) {
  const [heroPhoto, setHeroPhoto] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    // Filter for landscape photos from 2025-2 event
    // Only select Arkitektur (A prefix) photos which are guaranteed landscape format
    const landscapePhotos = photos.filter(p => {
      if (p.eventSlug !== 'fotograflinje-2025-2') return false;
      // Only Arkitektur category - these are landscape orientation architecture photos
      return p.category === 'Arkitektur';
    });

    if (landscapePhotos.length === 0) {
      console.warn('No landscape Arkitektur photos found from 2025-2 event');
      return;
    }

    // Pick a random landscape photo
    const randomIndex = Math.floor(Math.random() * landscapePhotos.length);
    setHeroPhoto(landscapePhotos[randomIndex]);
  }, [photos]);

  useEffect(() => {
    if (!heroPhoto) return;

    // Preload image
    const img = new Image();
    img.src = heroPhoto.url;
    img.onload = () => setIsLoaded(true);
  }, [heroPhoto]);

  if (!heroPhoto) return null;

  return (
    <section className="hero-section">
      <div className={`hero-container ${isLoaded ? 'loaded' : ''}`}>
        <Link to={`/photo/${heroPhoto._id}`} className="hero-image-link">
          <div className="hero-image-wrapper">
            <img 
              src={heroPhoto.url} 
              alt={heroPhoto.title}
              className="hero-image"
            />
            <div className="hero-gradient-overlay"></div>
            <div className="hero-content">
              <div className="hero-label rainbow-border">Udvalgt Værk</div>
              <h2 className="hero-title">{heroPhoto.title}</h2>
              <p className="hero-photographer">Fotografi af {heroPhoto.photographer}</p>
              <span className="hero-cta">Se mere →</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
