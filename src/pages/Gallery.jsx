import { useState, useEffect, useCallback } from 'react';
import { fetchEvents, fetchPhotos } from '../services/api';
import { getPhotoMetadata } from '../utils/storage';
import PhotoCard from '../components/PhotoCard';
import './Gallery.css';

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDemoPhotos = useCallback(() => {
    const metadata = getPhotoMetadata();
    const demoPhotos = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/400/300?random=${i + 1}`,
      title: metadata[i + 1]?.title || `Photograph ${i + 1}`,
      price: metadata[i + 1]?.price || (19.99 + Math.random() * 30),
    }));
    setPhotos(demoPhotos);
  }, []);

  const loadPhotos = useCallback(async (eventId) => {
    try {
      setLoading(true);
      const photosData = await fetchPhotos(eventId);
      const metadata = getPhotoMetadata();
      
      const photosWithMetadata = photosData.map((photo) => ({
        ...photo,
        title: metadata[photo.id]?.title || `Photo ${photo.id}`,
        price: metadata[photo.id]?.price || 29.99,
      }));
      
      setPhotos(photosWithMetadata);
      setLoading(false);
    } catch (error) {
      setError('Failed to load photos. Using demo data.');
      setLoading(false);
      loadDemoPhotos();
    }
  }, [loadDemoPhotos]);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const eventsData = await fetchEvents();
      setEvents(eventsData);
      if (eventsData.length > 0) {
        setSelectedEvent(eventsData[0].id);
        await loadPhotos(eventsData[0].id);
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to load events. Using demo data.');
      setLoading(false);
      // Demo data for when API is unavailable
      const demoEvents = [
        { id: 1, name: 'Wedding Photography', description: 'Beautiful wedding moments' },
        { id: 2, name: 'Portrait Studio', description: 'Professional portraits' },
        { id: 3, name: 'Nature & Landscape', description: 'Scenic photography' },
      ];
      setEvents(demoEvents);
      setSelectedEvent(1);
      loadDemoPhotos();
    }
  }, [loadPhotos, loadDemoPhotos]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleEventChange = async (eventId) => {
    setSelectedEvent(eventId);
    await loadPhotos(eventId);
  };

  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <h2>Photography Gallery</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {events.length > 0 && (
          <div className="event-selector">
            <label htmlFor="event-select">Select Event:</label>
            <select
              id="event-select"
              value={selectedEvent || ''}
              onChange={(e) => handleEventChange(parseInt(e.target.value))}
              className="event-select"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name || event.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="photos-grid">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))
          ) : (
            <p className="no-photos">No photos available for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
