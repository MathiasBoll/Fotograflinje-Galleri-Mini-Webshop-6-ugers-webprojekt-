import { useState, useEffect } from 'react';
import { fetchPhotos, fetchEvents } from '../services/apiService';

function AdminImages() {
  const [photos, setPhotos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    eventId: '',
    price: 299,
    file: null,
    previewUrl: null
  });
  const [uploading, setUploading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [photosData, eventsData] = await Promise.all([
        fetchPhotos(),
        fetchEvents()
      ]);
      setPhotos(photosData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async () => {
    try {
      const data = await fetchPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Failed to load photos:', error);
    }
  };

  const handleDelete = (photoId) => {
    if (window.confirm('Er du sikker på, at du vil slette dette billede?')) {
      // In a real app, this would call an API endpoint
      console.log('Delete photo:', photoId);
      alert('Demo: Sletning af billeder er ikke implementeret i denne version.');
    }
  };

  const handleOpenUpload = () => {
    setUploadForm({
      title: '',
      eventId: '',
      price: 299,
      file: null,
      previewUrl: null
    });
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Vælg venligst en billedfil (JPG, PNG, etc.)');
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setUploadForm(prev => ({
        ...prev,
        file,
        previewUrl
      }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      alert('Vælg venligst et billede at uploade');
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, you would upload to the API here
      console.log('Upload:', {
        title: uploadForm.title,
        eventId: uploadForm.eventId,
        price: uploadForm.price,
        file: uploadForm.file.name
      });
      
      alert('Demo: Billedupload er ikke fuldt implementeret endnu.\n\nI produktionsversionen vil billedet blive uploadet til serveren.');
      
      setShowUploadModal(false);
      // Reload photos after upload in production
      // await loadPhotos();
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Fejl ved upload af billede');
    } finally {
      setUploading(false);
    }
  };

  // Filter photos based on search query
  const filteredPhotos = photos.filter(photo => 
    photo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.photographer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.event?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPhotos = filteredPhotos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-state">Indlæser billeder...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Billeder</h1>
          <p className="admin-page-subtitle">Administrer og organiser billederne</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenUpload}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Tilføj billede
        </button>
      </div>

      {/* Search */}
      <div className="search-container">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Søg efter titel, fotograf eller event..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>

      {/* Images Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Billede</th>
              <th>Titel</th>
              <th>Fotograf</th>
              <th>Event</th>
              <th>Pris</th>
              <th style={{ width: '100px' }}>Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPhotos.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  {searchQuery ? 'Ingen billeder fundet der matcher søgningen' : 'Ingen billeder tilgængelige'}
                </td>
              </tr>
            ) : (
              paginatedPhotos.map(photo => (
                <tr key={photo._id}>
                  <td>
                    <img 
                      src={photo.url} 
                      alt={photo.title || 'Untitled'}
                      className="table-thumbnail"
                    />
                  </td>
                  <td>{photo.title || 'Untitled'}</td>
                  <td>{photo.photographer || 'Unknown'}</td>
                  <td>
                    {photo.event && (
                      <span className="event-pill">{photo.event}</span>
                    )}
                  </td>
                  <td className="table-price">{photo.price ? `${photo.price} kr.` : '—'}</td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-icon btn-icon-edit" 
                        title="Rediger"
                        onClick={() => alert('Demo: Redigering af billeder kommer snart.')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-icon btn-icon-delete" 
                        onClick={() => handleDelete(photo._id)}
                        title="Slet"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="table-footer">
        <div className="table-footer-info">
          Viser {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPhotos.length)} af {filteredPhotos.length} billeder
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Forrige
            </button>
            <span className="pagination-info">
              Side {currentPage} af {totalPages}
            </span>
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Næste
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => !uploading && setShowUploadModal(false)}>
          <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => !uploading && setShowUploadModal(false)}
              disabled={uploading}
              aria-label="Luk"
            >
              ×
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Upload nyt billede</h2>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="modal-body">
                {/* File Upload Area */}
                <div className="form-group">
                  <label>Vælg billede *</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload" className="file-upload-label">
                      {uploadForm.previewUrl ? (
                        <div className="file-preview">
                          <img src={uploadForm.previewUrl} alt="Preview" />
                          <p className="file-name">{uploadForm.file?.name}</p>
                        </div>
                      ) : (
                        <>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <p>Klik for at vælge billede</p>
                          <p className="file-hint">Eller træk og slip filen her</p>
                          <p className="file-hint">JPG, PNG, GIF (maks 10MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div className="form-group">
                  <label htmlFor="image-title">Titel *</label>
                  <input
                    type="text"
                    id="image-title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="F.eks. Solnedgang over stranden"
                    required
                  />
                </div>

                {/* Event Selection */}
                <div className="form-group">
                  <label htmlFor="image-event">Event</label>
                  <select
                    id="image-event"
                    value={uploadForm.eventId}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, eventId: e.target.value }))}
                  >
                    <option value="">Intet event</option>
                    {events.map(event => (
                      <option key={event._id} value={event._id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="form-group">
                  <label htmlFor="image-price">Pris (kr.) *</label>
                  <input
                    type="number"
                    id="image-price"
                    value={uploadForm.price}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-outlined"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Annuller
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={uploading || !uploadForm.file}
                >
                  {uploading ? (
                    <>
                      <span className="spinner"></span>
                      Uploader...
                    </>
                  ) : (
                    'Upload billede'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminImages;
