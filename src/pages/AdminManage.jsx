import { useState, useCallback, useEffect } from 'react';
import { getPhotoMetadata } from '../utils/storage';
import './AdminManage.css';

const AdminManage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const metadata = getPhotoMetadata();
      
      // In demo mode, create photos from metadata
      const demoPhotos = Object.entries(metadata).map(([id, data]) => ({
        id: parseInt(id),
        url: `https://picsum.photos/400/300?random=${id}`,
        title: data.title,
        price: data.price,
        eventId: data.eventId,
      }));

      // If there are no photos in metadata, load some demo photos
      if (demoPhotos.length === 0) {
        const defaultPhotos = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          url: `https://picsum.photos/400/300?random=${i + 1}`,
          title: `Photograph ${i + 1}`,
          price: 19.99 + Math.random() * 30,
        }));
        setPhotos(defaultPhotos);
      } else {
        setPhotos(demoPhotos);
      }
      
      setLoading(false);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to load photos' 
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleDelete = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      // In a real app, this would call the API
      // await deletePhoto(photoId);
      
      setPhotos(photos.filter(photo => photo.id !== photoId));
      setMessage({ 
        type: 'success', 
        text: 'Photo deleted successfully' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to delete photo' 
      });
    }
  };

  if (loading) {
    return (
      <div className="admin-manage-page">
        <div className="loading">Loading photos...</div>
      </div>
    );
  }

  return (
    <div className="admin-manage-page">
      <div className="admin-container">
        <h2>Manage Photos</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {photos.length === 0 ? (
          <div className="no-photos">
            <p>No photos to manage</p>
          </div>
        ) : (
          <div className="photos-list">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="photo-thumbnail"
                />
                <div className="photo-details">
                  <h3>{photo.title}</h3>
                  <p className="photo-price">${photo.price?.toFixed(2)}</p>
                  <p className="photo-id">ID: {photo.id}</p>
                </div>
                <button 
                  onClick={() => handleDelete(photo.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="note">
          * In this demo version, deletions are temporary. 
          In production, this would delete from the API server.
        </p>
      </div>
    </div>
  );
};

export default AdminManage;
