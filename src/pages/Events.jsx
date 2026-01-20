import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchEvents, fetchPhotos } from '../services/apiService';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventPhotos, setEventPhotos] = useState({});

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const [eventsData, photosData] = await Promise.all([
        fetchEvents(),
        fetchPhotos()
      ]);
      
      // Sort by start date, newest first
      const sortedEvents = [...eventsData].sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      );
      
      // Map photos to events
      const photosByEvent = {};
      photosData.forEach(photo => {
        if (photo.event && photo.thumbUrl) {
          if (!photosByEvent[photo.event]) {
            photosByEvent[photo.event] = photo.thumbUrl;
          }
        }
      });
      
      setEvents(sortedEvents);
      setEventPhotos(photosByEvent);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('da-DK', options);
  };

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'ongoing';
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'upcoming': return 'Kommende';
      case 'ongoing': return 'Åben nu';
      case 'past': return 'Afsluttet';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'upcoming': return 'event-status-upcoming';
      case 'ongoing': return 'event-status-ongoing';
      case 'past': return 'event-status-past';
      default: return '';
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const getEventExcerpt = (event) => {
    const eventName = event.name || event.title;
    
    // If there's a description, use it as the base
    if (event.description && event.description.length > 50) {
      return truncateText(event.description, 150);
    }
    
    // Otherwise, generate a descriptive excerpt
    return `${eventName} er en inspirerende fotoudstilling arrangeret af Media College Denmark. Udstillingen viser studenterarbejder og fremhæver den kreative udvikling inden for fotografisk kunst.`;
  };

  return (
    <>
      <Helmet>
        <title>Events & Udstillinger – Fotografuddannelsen | Media College Denmark</title>
        <meta name="description" content="Udforsk vores kommende og tidligere fotoudstillinger og events. Se studenterarbejder, portrætserier, arkitekturfotografi og meget mere fra Media College Denmarks fotograflinje." />
        <link rel="canonical" href="https://photography.mediacollege.dk/events" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Events & Udstillinger – Fotografuddannelsen | Media College Denmark" />
        <meta property="og:description" content="Udforsk vores kommende og tidligere fotoudstillinger og events. Se studenterarbejder, portrætserier, arkitekturfotografi og meget mere." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://photography.mediacollege.dk/events" />
        <meta property="og:site_name" content="Media College Denmark – Fotografuddannelsen" />
        <meta property="og:image" content="https://mediacollege.dk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Events & Udstillinger – Fotografuddannelsen" />
        <meta name="twitter:description" content="Udforsk vores kommende og tidligere fotoudstillinger og events fra Media College Denmark." />
        <meta name="twitter:image" content="https://mediacollege.dk/og-image.jpg" />
        
        {/* JSON-LD Schema: CollectionPage with ItemList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Events & Udstillinger",
            "description": "Oversigt over fotoudstillinger og events fra Media College Denmark",
            "url": "https://photography.mediacollege.dk/events",
            "publisher": {
              "@type": "EducationalOrganization",
              "name": "Media College Denmark",
              "url": "https://mediacollege.dk"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": events.map((event, index) => ({
                "@type": "Event",
                "position": index + 1,
                "name": event.name || event.title,
                "url": `https://photography.mediacollege.dk/events/${event.slug}`,
                "startDate": event.startDate,
                "endDate": event.endDate,
                "description": event.description,
                "organizer": {
                  "@type": "EducationalOrganization",
                  "name": "Media College Denmark"
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="container">
        <header className="page-header">
          <h1 className="rainbow-text">Events & Udstillinger</h1>
          <p className="page-subtitle">
            Oplev studenterarbejder og fotoudstillinger fra Media College Denmarks fotograflinje
          </p>
        </header>

        <main className="events-content">
          {loading ? (
            <div className="events-loading">
              <div className="spinner"></div>
              <p>Indlæser events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="events-empty">
              <p>Ingen events fundet i øjeblikket.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => {
                const status = getEventStatus(event.startDate, event.endDate);
                const eventImage = event.imageUrl || eventPhotos[event._id];
                
                return (
                  <article key={event._id || event.id} className="event-card">
                    {eventImage && (
                      <div className="event-card-image-container">
                        <img 
                          src={eventImage} 
                          alt={event.name || event.title}
                          className="event-card-image-full"
                        />
                      </div>
                    )}
                    
                    <div className="event-card-content">
                      <div className="event-card-header">
                        <h2 className="event-card-title">
                          <Link to={`/events/${event.slug}`}>
                            {event.name || event.title}
                          </Link>
                        </h2>
                        <span className={`event-status ${getStatusClass(status)}`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      
                      <div className="event-card-excerpt">
                        <p>{getEventExcerpt(event)}</p>
                      </div>
                      
                      <div className="event-card-dates">
                        <svg className="event-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 2V6M14 2V6M3 10H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="event-dates-text">
                          {formatDate(event.startDate) ? (
                            <>
                              <time dateTime={event.startDate}>
                                {formatDate(event.startDate)}
                              </time>
                              {event.endDate && event.endDate !== event.startDate && formatDate(event.endDate) && (
                                <>
                                  {' – '}
                                  <time dateTime={event.endDate}>
                                    {formatDate(event.endDate)}
                                  </time>
                                </>
                              )}
                            </>
                          ) : (
                            <span>Åben for besøg</span>
                          )}
                        </div>
                      </div>
                      
                      <Link to={`/events/${event.slug}`} className="event-card-link">
                        Læs mere →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Events;
