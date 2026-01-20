import { useState, useEffect, useRef } from 'react';
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
  const [dominantColor, setDominantColor] = useState('#000000');
  const canvasRef = useRef(null);

  // Extract dominant color from image
  const extractDominantColor = (imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Scale down for performance
        canvas.width = 100;
        canvas.height = 100;
        
        ctx.drawImage(img, 0, 0, 100, 100);
        
        try {
          const imageData = ctx.getImageData(0, 0, 100, 100);
          const data = imageData.data;
          
          let r = 0, g = 0, b = 0;
          let count = 0;
          
          // Sample every 4th pixel for performance
          for (let i = 0; i < data.length; i += 16) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
          
          // Average color
          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);
          
          // Darken the color for better background (30% darker)
          r = Math.floor(r * 0.3);
          g = Math.floor(g * 0.3);
          b = Math.floor(b * 0.3);
          
          resolve(`rgb(${r}, ${g}, ${b})`);
        } catch (e) {
          // CORS or other error, fallback to black
          resolve('#000000');
        }
      };
      img.onerror = () => resolve('#000000');
      img.src = imgSrc;
    });
  };

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

  // Update dominant color when current photo changes
  useEffect(() => {
    if (carouselPhotos.length === 0) return;
    const currentPhoto = carouselPhotos[currentIndex];
    if (currentPhoto) {
      extractDominantColor(currentPhoto.url).then(color => {
        setDominantColor(color);
      });
    }
  }, [currentIndex, carouselPhotos]);

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
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="carousel-container" style={{ backgroundColor: dominantColor }}>
        {/* Main Image */}
        <Link to={`/photo/${currentPhoto._id}`} className="carousel-image-link">
          <div 
            className={`carousel-image-wrapper ${isTransitioning ? 'transitioning' : ''}`}
            style={{ '--bg-image': `url(${currentPhoto.url})` }}
          >
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
