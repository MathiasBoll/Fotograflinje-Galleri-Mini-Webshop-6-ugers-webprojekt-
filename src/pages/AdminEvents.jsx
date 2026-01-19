import { useState, useEffect } from 'react';
import { getDemoEvents, createDemoEvent, updateDemoEvent, deleteDemoEvent, getEventStats } from '../services/demoDataService';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, upcoming: 0 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    startDate: '',
    endDate: '',
    active: true
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const allEvents = getDemoEvents();
    setEvents(allEvents);
    setStats(getEventStats());
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      startDate: '',
      endDate: '',
      active: true
    });
    setShowCreateModal(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      slug: event.slug,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      active: event.active
    });
    setShowCreateModal(true);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Er du sikker på, at du vil slette dette event?')) {
      deleteDemoEvent(eventId);
      loadEvents();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateDemoEvent(editingEvent.id, formData);
    } else {
      createDemoEvent(formData);
    }
    
    setShowCreateModal(false);
    loadEvents();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Events</h1>
          <p className="admin-page-subtitle">{events.length} events i systemet</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Opret event
        </button>
      </div>

      {/* Events List */}
      <div className="events-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>Ingen events endnu. Opret dit første event for at komme i gang.</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              
              <div className="event-card-content">
                <div className="event-card-header">
                  <h3 className="event-card-title">{event.title}</h3>
                  <span className="event-card-slug">{event.slug}</span>
                </div>
                <p className="event-card-description">{event.description}</p>
                <div className="event-card-meta">
                  <span className="event-card-date">
                    {new Date(event.startDate).toLocaleDateString('da-DK')} - {new Date(event.endDate).toLocaleDateString('da-DK')}
                  </span>
                  {event.active && <span className="event-card-active">Aktiv</span>}
                </div>
              </div>

              <div className="event-card-actions">
                <button 
                  className="btn-icon btn-icon-edit" 
                  onClick={() => handleEdit(event)}
                  title="Rediger"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button 
                  className="btn-icon btn-icon-delete" 
                  onClick={() => handleDelete(event.id)}
                  title="Slet"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="stats-grid stats-grid-3">
        <div className="stat-card">
          <div className="stat-label">Totalt events</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Aktive udstillinger</div>
          <div className="stat-value">{stats.active}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Kommende events</div>
          <div className="stat-value">{stats.upcoming}</div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowCreateModal(false)}
              aria-label="Luk"
            >
              ×
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">
                {editingEvent ? 'Rediger event' : 'Opret nyt event'}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titel</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug (URL-venligt navn)</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="f.eks. eksamen-2025"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Beskrivelse</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Startdato</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">Slutdato</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <span>Eventet er aktivt</span>
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-outlined"
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuller
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Gem ændringer' : 'Opret event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;
