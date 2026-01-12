import { useState } from 'react';
import { savePhotoMetadata } from '../utils/storage';
import './AdminUpload.css';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    eventId: '1',
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate photo upload
      const photoId = Date.now();
      
      // Save metadata locally
      savePhotoMetadata(photoId, {
        title: formData.title,
        price: parseFloat(formData.price),
        eventId: formData.eventId,
        uploadedAt: new Date().toISOString(),
      });

      // In a real app, this would upload to the API
      // const formDataToSend = new FormData();
      // formDataToSend.append('file', file);
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('price', formData.price);
      // formDataToSend.append('eventId', formData.eventId);
      // await uploadPhoto(formDataToSend);

      setMessage({ 
        type: 'success', 
        text: `Photo "${formData.title}" uploaded successfully!` 
      });
      
      // Reset form
      setFormData({ title: '', price: '', eventId: '1' });
      setPreview(null);
    } catch {
      setMessage({ 
        type: 'error', 
        text: 'Failed to upload photo. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-upload-page">
      <div className="admin-container">
        <h2>Upload Photo</h2>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Photo Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter photo title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (USD) *</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventId">Event</label>
            <select
              id="eventId"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              className="event-select"
            >
              <option value="1">Wedding Photography</option>
              <option value="2">Portrait Studio</option>
              <option value="3">Nature & Landscape</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file">Photo File</label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          {preview && (
            <div className="preview-container">
              <p>Preview:</p>
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <button 
            type="submit" 
            className="upload-btn"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>

        <p className="note">
          * Note: In this demo version, photo metadata is stored locally. 
          In production, this would upload to the API server.
        </p>
      </div>
    </div>
  );
};

export default AdminUpload;
