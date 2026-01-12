import { useState, useEffect } from 'react'
import { fetchPhotos, fetchEvents } from '../services/apiService'
import EventSelector from '../components/EventSelector'
import PhotoGrid from '../components/PhotoGrid'

/**
 * Home page component
 * Displays the main photo gallery with event filtering
 * Fetches data from external API
 */
function Home() {
  const [photos, setPhotos] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch events on component mount
    loadEvents()
  }, [])

  useEffect(() => {
    // Fetch photos when selected event changes
    if (events.length > 0 || selectedEvent === 'all') {
      loadPhotos()
    }
  }, [selectedEvent])

  const loadEvents = async () => {
    try {
      const eventsData = await fetchEvents()
      setEvents(eventsData || [])
      setError(null)
      // After events are loaded, load photos
      loadPhotos()
    } catch (error) {
      console.error('Error loading events:', error)
      setError('Kunne ikke indlæse events')
      setLoading(false)
    }
  }

  const loadPhotos = async () => {
    setLoading(true)
    try {
      let photosData
      
      if (selectedEvent === 'all') {
        // Fetch all photos
        photosData = await fetchPhotos()
      } else {
        // Find the selected event's slug
        const event = events.find(e => e._id === selectedEvent)
        if (event && event.slug) {
          // Fetch photos for specific event using slug
          photosData = await fetchPhotos(event.slug)
        } else {
          photosData = await fetchPhotos()
        }
      }
      
      setPhotos(photosData || [])
      setError(null)
    } catch (error) {
      console.error('Error loading photos:', error)
      setError('Kunne ikke indlæse billeder')
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  // Filter photos based on selected event (for mock data fallback)
  const filteredPhotos = selectedEvent === 'all' 
    ? photos 
    : photos.filter(photo => photo.event === selectedEvent)

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Fotogalleri</h1>
        <p>Gennemse og køb professionelle eventbilleder</p>
      </header>

      {events.length > 0 && (
        <EventSelector 
          events={events}
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
        />
      )}

      {error && (
        <div className="error-message" style={{padding: '20px', backgroundColor: '#fdecea', color: '#e74c3c', borderRadius: '8px', marginBottom: '20px'}}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Indlæser billeder...</div>
      ) : (
        <PhotoGrid photos={filteredPhotos} />
      )}
    </div>
  )
}

export default Home
