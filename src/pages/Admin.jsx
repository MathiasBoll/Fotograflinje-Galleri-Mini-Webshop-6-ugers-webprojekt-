import { useState, useEffect } from 'react'
import { fetchPhotos, fetchEvents } from '../services/apiService'

/**
 * Admin page component
 * Protected route for administrators to manage photos and events
 * Implements full CRUD operations (Create, Read, Update, Delete)
 */
function Admin() {
  const [photos, setPhotos] = useState([])
  const [events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState('photos')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showCreateEventForm, setShowCreateEventForm] = useState(false)
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    eventId: '',
    price: 299,
    url: '',
    thumbnail: ''
  })
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    slug: '',
    startsAt: '',
    endsAt: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [photosData, eventsData] = await Promise.all([
        fetchPhotos(),
        fetchEvents()
      ])
      console.log('Admin loaded events:', eventsData)
      setPhotos(photosData)
      setEvents(eventsData)
    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  // CREATE - Add new photo
  const handleCreatePhoto = (e) => {
    e.preventDefault()
    
    const photoToAdd = {
      _id: 'local-' + Date.now(), // Generate unique ID with prefix to avoid conflicts
      ...newPhoto,
      event: newPhoto.eventId, // Store event ID in 'event' field to match API structure
      price: parseInt(newPhoto.price),
      originalFilename: newPhoto.title,
      uploadedAt: new Date().toISOString()
    }
    
    setPhotos([...photos, photoToAdd])
    
    // Reset form
    setNewPhoto({
      title: '',
      description: '',
      eventId: '',
      price: 299,
      url: '',
      thumbnail: ''
    })
    setShowCreateForm(false)
    
    alert('Billede oprettet! (Note: Dette er kun lokalt - i produktion ville det gemmes til database)')
  }

  // DELETE - Remove photo
  const handleDeletePhoto = (photoId) => {
    if (confirm('Er du sikker på at du vil slette dette billede?')) {
      setPhotos(photos.filter(p => (p._id || p.id) !== photoId))
      alert('Billede slettet! (Note: Dette er kun lokalt - i produktion ville det slettes fra database)')
    }
  }

  // UPDATE - Edit photo (placeholder)
  const handleEditPhoto = (photoId) => {
    const photo = photos.find(p => (p._id || p.id) === photoId)
    alert(`Rediger funktionalitet for: ${photo.originalFilename || photo.title}\n\nDenne feature kan implementeres med en edit modal lignende create formen.`)
  }

  // CREATE Event
  const handleCreateEvent = (e) => {
    e.preventDefault()
    
    const eventToAdd = {
      _id: 'local-event-' + Date.now(),
      ...newEvent,
      slug: newEvent.slug || newEvent.title.toLowerCase().replace(/\s+/g, '-').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a'),
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setEvents([...events, eventToAdd])
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      slug: '',
      startsAt: '',
      endsAt: ''
    })
    setShowCreateEventForm(false)
    
    alert('Event oprettet! (Note: Dette er kun lokalt - i produktion ville det gemmes til database)')
  }

  // DELETE Event
  const handleDeleteEvent = (eventId) => {
    if (confirm('Er du sikker på at du vil slette dette event?')) {
      setEvents(events.filter(e => (e._id || e.id) !== eventId))
      alert('Event slettet! (Note: Dette er kun lokalt - i produktion ville det slettes fra database)')
    }
  }

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p className="admin-intro">Velkommen til admin panelet. Her kan du administrere produkter med CRUD operationer.</p>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'photos' ? 'active' : ''}
          onClick={() => setActiveTab('photos')}
        >
          Billeder ({photos.length})
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events ({events.length})
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Ordrer
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'photos' && (
          <div className="photos-admin">
            <div className="admin-header">
              <h2>Administrer Billeder (CRUD)</h2>
              <button 
                className="btn-primary" 
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                {showCreateForm ? '✕ Annuller' : '➕ Opret nyt billede'}
              </button>
            </div>

            {showCreateForm && (
              <div className="create-form-container">
                <h3>Opret nyt billede</h3>
                <form onSubmit={handleCreatePhoto} className="create-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Titel *</label>
                      <input
                        type="text"
                        id="title"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="price">Pris (DKK) *</label>
                      <input
                        type="number"
                        id="price"
                        value={newPhoto.price}
                        onChange={(e) => setNewPhoto({...newPhoto, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Beskrivelse *</label>
                    <textarea
                      id="description"
                      value={newPhoto.description}
                      onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventId">Event *</label>
                    <select
                      id="eventId"
                      value={newPhoto.eventId}
                      onChange={(e) => setNewPhoto({...newPhoto, eventId: e.target.value})}
                      required
                    >
                      <option value="">Vælg event</option>
                      {events.map(event => (
                        <option key={event._id} value={event._id}>
                          {event.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="url">Billede URL *</label>
                    <input
                      type="url"
                      id="url"
                      value={newPhoto.url}
                      onChange={(e) => setNewPhoto({...newPhoto, url: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail URL *</label>
                    <input
                      type="url"
                      id="thumbnail"
                      value={newPhoto.thumbnail}
                      onChange={(e) => setNewPhoto({...newPhoto, thumbnail: e.target.value})}
                      placeholder="https://example.com/thumb.jpg"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Opret billede
                  </button>
                </form>
              </div>
            )}

            <p className="admin-description">
              Her kan du oprette, redigere og slette billeder (produkter).
            </p>
            
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Billede</th>
                    <th>Titel</th>
                    <th>Beskrivelse</th>
                    <th>Pris</th>
                    <th>Event</th>
                    <th>Handlinger</th>
                  </tr>
                </thead>
                <tbody>
                  {photos.map(photo => {
                    const photoId = photo._id || photo.id
                    const eventInfo = events.find(e => (e._id || e.id) === photo.event)
                    return (
                      <tr key={photoId}>
                        <td>{photoId.toString().substring(0, 8)}...</td>
                        <td>
                          <img src={photo.thumbUrl || photo.thumbnail || photo.url} alt={photo.originalFilename || photo.title} className="admin-thumb" />
                        </td>
                        <td>{photo.originalFilename || photo.title}</td>
                        <td className="description-cell">{photo.description || 'Ingen beskrivelse'}</td>
                        <td>{photo.price || 299} kr</td>
                        <td>{eventInfo?.title || 'Ukendt'}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditPhoto(photoId)}
                          >
                            ✏️ Rediger
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeletePhoto(photoId)}
                          >
                            🗑️ Slet
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-admin">
            <div className="admin-header">
              <h2>Administrer Events</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowCreateEventForm(!showCreateEventForm)}
              >
                {showCreateEventForm ? '✕ Annuller' : '➕ Opret nyt event'}
              </button>
            </div>

            {showCreateEventForm && (
              <div className="create-form-container">
                <h3>Opret nyt event</h3>
                <form onSubmit={handleCreateEvent} className="create-form">
                  <div className="form-group">
                    <label htmlFor="eventTitle">Event Titel *</label>
                    <input
                      type="text"
                      id="eventTitle"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="F.eks. Julefrokost 2026"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventSlug">Slug (URL-venlig navn)</label>
                    <input
                      type="text"
                      id="eventSlug"
                      value={newEvent.slug}
                      onChange={(e) => setNewEvent({...newEvent, slug: e.target.value})}
                      placeholder="Lad være tom for automatisk generering"
                    />
                    <small>Bruges i URL. Genereres automatisk fra titel hvis tom.</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventDescription">Beskrivelse</label>
                    <textarea
                      id="eventDescription"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      rows="3"
                      placeholder="Event beskrivelse..."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="eventStartsAt">Start Dato & Tid *</label>
                      <input
                        type="datetime-local"
                        id="eventStartsAt"
                        value={newEvent.startsAt}
                        onChange={(e) => setNewEvent({...newEvent, startsAt: e.target.value})}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="eventEndsAt">Slut Dato & Tid</label>
                      <input
                        type="datetime-local"
                        id="eventEndsAt"
                        value={newEvent.endsAt}
                        onChange={(e) => setNewEvent({...newEvent, endsAt: e.target.value})}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    Opret event
                  </button>
                </form>
              </div>
            )}

            <p className="admin-description">
              Her kan du oprette og administrere events.
            </p>

            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titel</th>
                    <th>Slug</th>
                    <th>Beskrivelse</th>
                    <th>Start Dato</th>
                    <th>Slut Dato</th>
                    <th>Handlinger</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => {
                    const eventId = event._id || event.id
                    return (
                      <tr key={eventId}>
                        <td>{eventId.toString().substring(0, 8)}...</td>
                        <td>{event.title}</td>
                        <td>{event.slug}</td>
                        <td className="description-cell">{event.description || 'Ingen beskrivelse'}</td>
                        <td>{event.startsAt ? new Date(event.startsAt).toLocaleDateString('da-DK') : '-'}</td>
                        <td>{event.endsAt ? new Date(event.endsAt).toLocaleDateString('da-DK') : '-'}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteEvent(eventId)}
                          >
                            🗑️ Slet
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-admin">
            <h2>Ordrer</h2>
            <p>Her kan du se og administrere kundeordrer.</p>
            {/* Orders list would go here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
