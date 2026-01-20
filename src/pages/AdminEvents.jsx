import { useState, useEffect } from 'react';
import { fetchPhotos, fetchEvents } from '../services/apiService';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [eventPhotos, setEventPhotos] = useState({});
  const [stats, setStats] = useState({ total: 0, active: 0, upcoming: 0 });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const [eventsData, photosData] = await Promise.all([
        fetchEvents(),
        fetchPhotos()
      ]);

      setEvents(eventsData);

      // Calculate stats
      const now = new Date();
      const active = eventsData.filter(e => e.active).length;
      const upcoming = eventsData.filter(e => new Date(e.startDate) > now).length;
      setStats({
        total: eventsData.length,
        active,
        upcoming
      });

      // Map first photo for each event
      const photosByEvent = {};
      photosData.forEach(photo => {
        if (photo.event && photo.thumbUrl) {
          if (!photosByEvent[photo.event]) {
            photosByEvent[photo.event] = photo.thumbUrl;
          }
        }
      });
      setEventPhotos(photosByEvent);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const getEventExcerpt = (event) => {
    const eventName = event.name || event.title;
    
    // If there's a description, use it as the base
    if (event.description && event.description.length > 50) {
      const maxLength = 150;
      if (event.description.length <= maxLength) return event.description;
      return event.description.substring(0, maxLength).trim() + '...';
    }
    
    // Otherwise, generate a descriptive excerpt
    return `${eventName} er en inspirerende fotoudstilling arrangeret af Media College Denmark. Udstillingen viser studenterarbejder og fremhæver den kreative udvikling inden for fotografisk kunst.`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('da-DK');
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      startDate: '',
      endDate: '',
      imageUrl: '',
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
      imageUrl: event.imageUrl || '',
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
      </div>

      {/* Events List */}
      <div className="events-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>Ingen events endnu. Klik på "Opret event" for at komme i gang.</p>
          </div>
        ) : (
          events.map(event => {
            const eventImage = event.imageUrl || eventPhotos[event._id || event.id];
            return (
            <div key={event._id || event.id} className="event-card">
              {eventImage ? (
                <div className="event-card-image-container">
                  <img src={eventImage} alt={event.title} className="event-card-image-full" />
                </div>
              ) : (
                <div className="event-card-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              )}
              
              <div className="event-card-content">
                <div className="event-card-header">
                  <h3 className="event-card-title">{event.title}</h3>
                  <span className="event-card-slug">{event.slug}</span>
                </div>
                <p className="event-card-description">{getEventExcerpt(event)}</p>
                <div className="event-card-meta">
                  <span className="event-card-date">
                    {formatDate(event.startDate) && formatDate(event.endDate) ? (
                      `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                    ) : (
                      'Åben for besøg'
                    )}
                  </span>
                  {event.active && <span className="event-card-active">Aktiv</span>}
                </div>
              </div>
            </div>
          );
          })
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
    </div>
  );
}

export default AdminEvents;
