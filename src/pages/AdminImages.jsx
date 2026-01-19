import { useState, useEffect } from 'react';
import { fetchPhotos } from '../services/apiService';

function AdminImages() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await fetchPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Failed to load photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (photoId) => {
    if (window.confirm('Er du sikker på, at du vil slette dette billede?')) {
      // In a real app, this would call an API endpoint
      console.log('Delete photo:', photoId);
      alert('Demo: Sletning af billeder er ikke implementeret i denne version.');
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
        <button className="btn btn-primary">
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
    </div>
  );
}

export default AdminImages;
