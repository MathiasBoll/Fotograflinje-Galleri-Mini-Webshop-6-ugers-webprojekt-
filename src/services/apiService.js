/**
 * API Service
 * Handles all API calls for photos and events
 * Integrates with DigitalOcean API for real data
 */

// Import local photo data for 2025-2 collection
import localPhotos2025_2 from '../data/photos2025-2.json'

// API Configuration
const API_BASE_URL = 'https://photobooth-lx7n9.ondigitalocean.app'

// Fallback mock data for development/offline mode
const MOCK_PHOTOS = [
  {
    id: 1,
    title: "Solnedgang ved stranden",
    description: "Smukt bryllupsfoto med solnedgang i baggrunden. Perfekt til store prints.",
    eventId: 1,
    eventName: "Bryllup - Hansen",
    url: "https://picsum.photos/800/600?random=1",
    thumbnail: "https://picsum.photos/400/300?random=1",
    price: 299,
    date: "2026-01-05"
  },
  {
    id: 2,
    title: "Brudepar i haven",
    description: "Romantisk portræt af brudeparret omgivet af grønne planter og blomster.",
    eventId: 1,
    eventName: "Bryllup - Hansen",
    url: "https://picsum.photos/800/600?random=2",
    thumbnail: "https://picsum.photos/400/300?random=2",
    price: 299,
    date: "2026-01-05"
  },
  {
    id: 3,
    title: "Festbillede",
    description: "Livligt gruppebillede fra receptionen med gæster og festglad stemning.",
    eventId: 1,
    eventName: "Bryllup - Hansen",
    url: "https://picsum.photos/800/600?random=3",
    thumbnail: "https://picsum.photos/400/300?random=3",
    price: 249,
    date: "2026-01-05"
  },
  {
    id: 4,
    title: "Børnefødselsdag",
    description: "Glad fødselsdagsbarn omgivet af venner og gaver. Farverigt og festligt.",
    eventId: 2,
    eventName: "Fødselsdag - Emma 10 år",
    url: "https://picsum.photos/800/600?random=4",
    thumbnail: "https://picsum.photos/400/300?random=4",
    price: 199,
    date: "2026-01-08"
  },
  {
    id: 5,
    title: "Kagemoment",
    description: "Det magiske øjeblik hvor lyset tændes på fødselsdagskagen.",
    eventId: 2,
    eventName: "Fødselsdag - Emma 10 år",
    url: "https://picsum.photos/800/600?random=5",
    thumbnail: "https://picsum.photos/400/300?random=5",
    price: 199,
    date: "2026-01-08"
  },
  {
    id: 6,
    title: "Firmafest gruppe",
    description: "Professionelt gruppebillede af teamet til firmajulefrokosten.",
    eventId: 3,
    eventName: "Firmajulefrokost - TechCorp",
    url: "https://picsum.photos/800/600?random=6",
    thumbnail: "https://picsum.photos/400/300?random=6",
    price: 349,
    date: "2025-12-15"
  }
]

const MOCK_EVENTS = [
  {
    id: 1,
    name: "Bryllup - Hansen",
    date: "2026-01-05",
    photoCount: 3
  },
  {
    id: 2,
    name: "Fødselsdag - Emma 10 år",
    date: "2026-01-08",
    photoCount: 2
  },
  {
    id: 3,
    name: "Firmajulefrokost - TechCorp",
    date: "2025-12-15",
    photoCount: 1
  },
  // Local event for 2025-2 collection
  localPhotos2025_2.event
]

/**
 * Fetch all photos (optionally filtered by event slug)
 * @param {string} eventSlug - Optional event slug to filter photos
 * @returns {Promise<Array>} Array of photo objects
 */
export async function fetchPhotos(eventSlug = null) {
  try {
    let url = `${API_BASE_URL}/photos`
    
    // Add eventSlug query parameter if provided
    if (eventSlug) {
      url += `?eventSlug=${eventSlug}`
    }
    
    console.log('Fetching photos from:', url)
    const response = await fetch(url)
    
    if (!response.ok) {
      console.warn(`API returned status ${response.status}, using local data`)
      // Merge mock photos with local 2025-2 photos
      const allPhotos = [...MOCK_PHOTOS, ...localPhotos2025_2.photos]
      
      // Filter by event slug if provided
      if (eventSlug) {
        return allPhotos.filter(photo => photo.eventSlug === eventSlug)
      }
      return allPhotos
    }
    
    const data = await response.json()
    console.log('API response:', data)
    console.log('Photos array sample:', JSON.stringify(data.data?.[0], null, 2))
    
    // Merge API data with local 2025-2 photos
    const apiPhotos = data.data || data
    const allPhotos = [...apiPhotos, ...localPhotos2025_2.photos]
    
    // Filter by event slug if provided
    if (eventSlug) {
      return allPhotos.filter(photo => photo.eventSlug === eventSlug)
    }
    
    return allPhotos
  } catch (error) {
    console.error('Error fetching photos:', error)
    console.log('Using local data as fallback')
    // Merge mock photos with local 2025-2 photos
    const allPhotos = [...MOCK_PHOTOS, ...localPhotos2025_2.photos]
    
    // Filter by event slug if provided
    if (eventSlug) {
      return allPhotos.filter(photo => photo.eventSlug === eventSlug)
    }
    return allPhotos
  }
}

/**
 * Fetch all events
 * @returns {Promise<Array>} Array of event objects
 */
export async function fetchEvents() {
  try {
    const url = `${API_BASE_URL}/events`
    console.log('Fetching events from:', url)
    const response = await fetch(url)
    
    if (!response.ok) {
      console.warn(`API returned status ${response.status}, using local data`)
      return MOCK_EVENTS
    }
    
    const data = await response.json()
    console.log('Events API response:', data)
    console.log('Events array:', JSON.stringify(data.data, null, 2))
    
    // Merge API events with local events
    const apiEvents = data.data || data
    const allEvents = [...apiEvents, localPhotos2025_2.event]
    
    // Remove duplicates by slug
    const uniqueEvents = allEvents.filter((event, index, self) => 
      index === self.findIndex(e => e.slug === event.slug)
    )
    
    return uniqueEvents
  } catch (error) {
    console.error('Error fetching events:', error)
    console.log('Using local events as fallback')
    return MOCK_EVENTS
  }
}

/**
 * Fetch single photo by ID
 * @param {number} id - Photo ID
 * @returns {Promise<Object>} Photo object
 */
export async function fetchPhotoById(id) {
  try {
    // Note: This endpoint may need to be adjusted based on actual API structure
    const response = await fetch(`${API_BASE_URL}/photos/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching photo by ID:', error)
    // Return mock data as fallback
    return MOCK_PHOTOS.find(photo => photo.id === id)
  }
}
