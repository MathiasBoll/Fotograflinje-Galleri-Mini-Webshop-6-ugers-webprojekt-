import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { fetchPhotos, fetchEvents } from '../services/apiService'
import EventSelector from '../components/EventSelector'
import PhotoGrid from '../components/PhotoGrid'
import PhotographerCarousel from '../components/PhotographerCarousel'
import HeroSection from '../components/HeroSection'

/**
 * Home page component
 * Displays the main photo gallery with filtering and search
 * Matches Figma design exactly
 */
function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [photos, setPhotos] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedPhotographer, setSelectedPhotographer] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const photosPerPage = 21
  const filtersRef = useRef(null)

  useEffect(() => {
    // Fetch events on component mount
    loadEvents()
  }, [])

  useEffect(() => {
    // Read query parameter and set selected event when events are loaded
    const eventSlug = searchParams.get('event')
    if (eventSlug && events.length > 0) {
      const matchingEvent = events.find(e => e.slug === eventSlug)
      if (matchingEvent) {
        setSelectedEvent(matchingEvent._id)
      }
    }
  }, [events, searchParams])

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

  // Handle event selection change and update query parameter
  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId)
    
    // Update URL query parameter
    if (eventId === 'all') {
      // Remove event parameter if "all" is selected
      searchParams.delete('event')
      setSearchParams(searchParams)
    } else {
      // Find the event and set its slug in the URL
      const event = events.find(e => e._id === eventId)
      if (event && event.slug) {
        setSearchParams({ event: event.slug })
      }
    }
  }

  // Filter photos based on selected event (for mock data fallback)
  const filteredPhotos = selectedEvent === 'all' 
    ? photos 
    : photos.filter(photo => photo.event === selectedEvent)

  // Further filter by year if selected
  const yearFilteredPhotos = selectedYear === 'all'
    ? filteredPhotos
    : filteredPhotos.filter(photo => {
        const photoYear = new Date(photo.uploadedAt).getFullYear()
        return photoYear.toString() === selectedYear
      })

  // Filter by photographer
  const photographerFilteredPhotos = selectedPhotographer === 'all'
    ? yearFilteredPhotos
    : yearFilteredPhotos.filter(photo => photo.photographer === selectedPhotographer)

  // Hide "Ukendt Fotograf" by default to showcase student work
  const showcasePhotos = photographerFilteredPhotos.filter(photo => photo.photographer !== 'Ukendt Fotograf')

  // Filter by search query
  const searchFilteredPhotos = searchQuery
    ? showcasePhotos.filter(photo => 
        photo.originalFilename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.photographer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.eventName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : showcasePhotos

  // Sort photos
  const sortedPhotos = [...searchFilteredPhotos].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt)
      case 'oldest':
        return new Date(a.uploadedAt) - new Date(b.uploadedAt)
      case 'price-low':
        return (a.price || 299) - (b.price || 299)
      case 'price-high':
        return (b.price || 299) - (a.price || 299)
      default:
        return 0
    }
  })

  // Create balanced photo selection to ensure fair representation of all photographers
  const getBalancedPhotos = (photos, page, perPage) => {
    // Group photos by photographer
    const photosByPhotographer = {}
    photos.forEach(photo => {
      const photographer = photo.photographer || 'Ukendt Fotograf'
      if (!photosByPhotographer[photographer]) {
        photosByPhotographer[photographer] = []
      }
      photosByPhotographer[photographer].push(photo)
    })

    const photographers = Object.keys(photosByPhotographer).sort()
    const photosPerPhotographer = Math.ceil(perPage / photographers.length)
    
    // Calculate which photos to take from each photographer for this page
    const pageStartIdx = (page - 1) * perPage
    const photosPerPhotographerPerPage = Math.ceil(perPage / photographers.length)
    const photographerStartIdx = Math.floor(pageStartIdx / photographers.length / photosPerPhotographerPerPage)
    
    // Interleave photos from all photographers
    const balancedPhotos = []
    let photosAdded = 0
    let roundIndex = Math.floor(pageStartIdx / photographers.length)
    
    while (balancedPhotos.length < perPage && photosAdded < perPage) {
      let addedThisRound = false
      
      photographers.forEach(photographer => {
        if (balancedPhotos.length >= perPage) return
        
        const photographerPhotos = photosByPhotographer[photographer]
        const photoIndex = roundIndex
        
        if (photoIndex < photographerPhotos.length) {
          balancedPhotos.push(photographerPhotos[photoIndex])
          addedThisRound = true
        }
      })
      
      if (!addedThisRound) break
      roundIndex++
      photosAdded += photographers.length
    }

    return balancedPhotos.slice(0, perPage)
  }

  // Pagination
  const totalPages = Math.ceil(sortedPhotos.length / photosPerPage)
  const displayedPhotos = getBalancedPhotos(sortedPhotos, currentPage, photosPerPage)

  const goToPage = (page) => {
    setCurrentPage(page)
    // Scroll to filters section
    if (filtersRef.current) {
      const yOffset = -20 // Add small offset from top
      const y = filtersRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Get featured photos (first 3 with newest dates)
  const featuredPhotos = [...photos]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 3)

  // Get unique years from photos
  const availableYears = [...new Set(photos.map(photo => 
    new Date(photo.uploadedAt).getFullYear().toString()
  ))].sort((a, b) => b - a)

  // Get unique photographers
  const availablePhotographers = [...new Set(photos.map(photo => 
    photo.photographer || 'Ukendt Fotograf'
  ))].sort()

  return (
    <>
      <Helmet>
        <title>Fotogalleri – Køb Unikke Fotoprints | Media College Denmark</title>
        <meta name="description" content="Udforsk vores kurerede galleri med over 100 kunstfotografier fra talentfulde fotografstuderende. Køb signerede prints i museumskvalitet og støt fremtidens fotografer." />
        <link rel="canonical" href="https://photography.mediacollege.dk/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fotogalleri – Køb Unikke Fotoprints" />
        <meta property="og:description" content="Udforsk vores kurerede galleri med over 100 kunstfotografier fra talentfulde fotografstuderende." />
        <meta property="og:url" content="https://photography.mediacollege.dk/" />
        <meta property="og:site_name" content="Media College Denmark – Fotografuddannelsen" />
        <meta property="og:image" content="https://mediacollege.dk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fotogalleri – Køb Unikke Fotoprints" />
        <meta name="twitter:description" content="Udforsk vores kurerede galleri med over 100 kunstfotografier fra talentfulde fotografstuderende." />
        <meta name="twitter:image" content="https://mediacollege.dk/og-image.jpg" />
      </Helmet>

      {/* Hero Section - Full Width */}
      {!loading && photos.length > 0 && (
        <HeroSection photos={photos} />
      )}

      <div className="home-page">
        <header className="page-header">
          <h1>Gallerier – Fotografuddannelsen</h1>
          <h2 className="page-subtitle">Studentarbejder til salg</h2>
          <p>Udvalgte værker fra vores fotografstuderende. Alle prints er af høj kvalitet og signeret af fotografen. Køb et fotografi og støt de kommende professionelle fotografer.</p>
        </header>

      {/* Featured Works Section - Photographer Carousel */}
      {!loading && photos.length > 0 && (
        <section className="featured-section">
          <h3 className="featured-title" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <span className="rainbow-underline">Udvalgte værker</span>
          </h3>
          <p className="featured-subtitle">Kurateret af fotografiuddannelsens lærere. Disse værker fremhæver det bedste af årets studentproduktioner.</p>
          <PhotographerCarousel photos={photos} />
        </section>
      )}

      {/* Search Input */}
      <div className="search-container" ref={filtersRef}>
        <input
          type="text"
          className="search-input"
          placeholder="Søg efter titel, fotograf eller event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-row">
          {events.length > 0 && (
            <select 
              value={selectedEvent} 
              onChange={(e) => handleEventChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">Event</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>
                  {event.name && event.name.trim() ? event.name : 'Unavngivet event'}
                </option>
              ))}
            </select>
          )}

          <select 
            value={selectedPhotographer} 
            onChange={(e) => setSelectedPhotographer(e.target.value)}
            className="filter-select"
          >
            <option value="all">Fotograf</option>
            {availablePhotographers.map(photographer => (
              <option key={photographer} value={photographer}>{photographer}</option>
            ))}
          </select>
          
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option value="all">Årgang</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select filter-select-sort"
          >
            <option value="newest">Sorter efter</option>
            <option value="newest">Nyeste først</option>
            <option value="oldest">Ældste først</option>
            <option value="price-low">Pris: Lav til høj</option>
            <option value="price-high">Pris: Høj til lav</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      {!loading && sortedPhotos.length > 0 && (
        <p className="results-count">Side {currentPage} af {totalPages} - Viser {displayedPhotos.length} billeder</p>
      )}

      {error && (
        <div className="error-message" style={{padding: '20px', backgroundColor: '#fdecea', color: '#e74c3c', borderRadius: '8px', marginBottom: '20px'}}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Indlæser billeder...</div>
      ) : (
        <>
          <PhotoGrid photos={displayedPhotos} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 'var(--spacing-s)', 
              marginTop: 'var(--spacing-xxl)', 
              marginBottom: 'var(--spacing-xxl)',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-secondary"
                style={{ padding: 'var(--spacing-s) var(--spacing-m)' }}
              >
                ← Forrige
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                // Show first 2, last 2, current, and pages around current
                if (
                  page === 1 || 
                  page === 2 || 
                  page === totalPages || 
                  page === totalPages - 1 ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={currentPage === page ? 'btn-primary' : 'btn-secondary'}
                      style={{ 
                        padding: 'var(--spacing-s) var(--spacing-m)',
                        minWidth: '40px'
                      }}
                    >
                      {page}
                    </button>
                  )
                } else if (
                  page === currentPage - 2 || 
                  page === currentPage + 2
                ) {
                  return <span key={page}>...</span>
                }
                return null
              })}
              
              <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-secondary"
                style={{ padding: 'var(--spacing-s) var(--spacing-m)' }}
              >
                Næste →
              </button>
            </div>
          )}
        </>
      )}
      </div>
    </>
  )
}

export default Home
