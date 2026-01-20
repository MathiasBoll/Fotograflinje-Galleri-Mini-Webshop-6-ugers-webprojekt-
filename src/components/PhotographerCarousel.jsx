import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PhotographerCarousel.css';

/**
 * PhotographerCarousel Component
 * Displays one random photo from each photographer in the 2025-2 collection
 * Auto-rotates through the photos with photographer name overlay
 */
function PhotographerCarousel({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselPhotos, setCarouselPhotos] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get one random photo from each photographer on mount
  useEffect(() => {
    if (!photos || photos.length === 0) return;

    // Filter to only 2025-2 photos
    const event2025Photos = photos.filter(p => p.eventSlug === 'fotograflinje-2025-2');
    
    if (event2025Photos.length === 0) return;

    // Group photos by photographer
    const photosByPhotographer = {};
    event2025Photos.forEach(photo => {
      if (!photosByPhotographer[photo.photographer]) {
        photosByPhotographer[photo.photographer] = [];
      }
      photosByPhotographer[photo.photographer].push(photo);
    });

    // Get one random photo from each photographer
    const selectedPhotos = Object.keys(photosByPhotographer).map(photographer => {
      const photographerPhotos = photosByPhotographer[photographer];
      const randomIndex = Math.floor(Math.random() * photographerPhotos.length);
      return photographerPhotos[randomIndex];
    });

    // Shuffle the selected photos for random order
    const shuffled = selectedPhotos.sort(() => Math.random() - 0.5);
    
    setCarouselPhotos(shuffled);
  }, [photos]);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (carouselPhotos.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselPhotos.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselPhotos.length]);

  if (carouselPhotos.length === 0) return null;

  const currentPhoto = carouselPhotos[currentIndex];

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + carouselPhotos.length) % carouselPhotos.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselPhotos.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="photographer-carousel">
      <div className="carousel-container">
        {/* Main Image */}
        <Link to={`/photo/${currentPhoto._id}`} className="carousel-image-link">
          <div className={`carousel-image-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
            <img 
              src={currentPhoto.url} 
              alt={currentPhoto.title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="photographer-name">{currentPhoto.photographer}</div>
              <div className="photo-category">{currentPhoto.category}</div>
            </div>
          </div>
        </Link>

        {/* Navigation Arrows */}
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={handlePrevious}
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={handleNext}
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="carousel-dots">
        {carouselPhotos.map((photo, index) => (
          <button
            key={photo._id}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to ${photo.photographer}'s photo`}
            title={photo.photographer}
          />
        ))}
      </div>

      {/* Photo Info */}
      <div className="carousel-info">
        <div className="carousel-counter">
          {currentIndex + 1} / {carouselPhotos.length}
        </div>
        <Link to={`/photo/${currentPhoto._id}`} className="carousel-view-link">
          Se billede →
        </Link>
      </div>
    </div>
  );
}

export default PhotographerCarousel;
