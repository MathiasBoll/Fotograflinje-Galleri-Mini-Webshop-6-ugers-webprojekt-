import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchEvents } from '../services/apiService';

function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [slug]);

  const loadEvent = async () => {
    try {
      const allEvents = await fetchEvents();
      const foundEvent = allEvents.find(e => e.slug === slug);
      
      if (foundEvent) {
        setEvent(foundEvent);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading event:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('da-DK', options);
  };

  const getEventYear = (dateString) => {
    return new Date(dateString).getFullYear();
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
      case 'upcoming': return 'Kommende event';
      case 'ongoing': return 'Åbent nu';
      case 'past': return 'Afsluttet event';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="event-detail-loading">
          <div className="spinner"></div>
          <p>Indlæser event...</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="container">
        <div className="event-detail-notfound">
          <h1>Event ikke fundet</h1>
          <p>Det event du leder efter findes ikke eller er blevet fjernet.</p>
          <Link to="/events" className="btn btn-primary">
            ← Tilbage til events
          </Link>
        </div>
      </div>
    );
  }

  const eventName = event.name || event.title;
  const eventYear = getEventYear(event.startDate);
  const status = getEventStatus(event.startDate, event.endDate);
  const pageTitle = `${eventName} ${eventYear} – Fotografuddannelsen | Media College Denmark`;
  const metaDescription = `${event.description || eventName} – Udstilling fra ${formatDate(event.startDate)} til ${formatDate(event.endDate)} på Media College Denmark.`;
  const eventUrl = `https://photography.mediacollege.dk/events/${event.slug}`;
  const ogImage = event.coverImage || 'https://mediacollege.dk/og-image.jpg';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={eventUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={eventUrl} />
        <meta property="og:site_name" content="Media College Denmark – Fotografuddannelsen" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* JSON-LD Schema: Event */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": eventName,
            "description": event.description,
            "startDate": event.startDate,
            "endDate": event.endDate,
            "eventStatus": status === 'past' ? "https://schema.org/EventScheduled" : "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Media College Denmark",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Viborg",
                "addressCountry": "DK"
              }
            },
            "organizer": {
              "@type": "EducationalOrganization",
              "name": "Media College Denmark",
              "url": "https://mediacollege.dk"
            },
            "image": ogImage,
            "url": eventUrl,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "DKK",
              "availability": "https://schema.org/InStock",
              "url": eventUrl
            }
          })}
        </script>
      </Helmet>

      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Forside</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/events">Events</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{eventName}</span>
        </nav>

        <article className="event-detail">
          <header className="event-detail-header">
            <div className="event-detail-meta">
              <span className={`event-status event-status-${status}`}>
                {getStatusText(status)}
              </span>
              <span className="event-year">{eventYear}</span>
            </div>
            
            <h1 className="event-detail-title">{eventName}</h1>
            
            <div className="event-detail-dates">
              <svg className="event-icon" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2V6M14 2V6M3 10H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <time dateTime={event.startDate}>
                  {formatDate(event.startDate)}
                </time>
                {event.endDate && event.endDate !== event.startDate && (
                  <>
                    {' – '}
                    <time dateTime={event.endDate}>
                      {formatDate(event.endDate)}
                    </time>
                  </>
                )}
              </div>
            </div>
          </header>

          <section className="event-detail-content">
            <div className="event-detail-intro">
              <h2>Om udstillingen</h2>
              <p className="event-detail-description">
                {event.description || `${eventName} er en fotoudstilling arrangeret af Media College Denmark som en del af fotografuddannelsens aktiviteter. Udstillingen viser studenterarbejder og fremhæver den kreative udvikling inden for fotografisk kunst.`}
              </p>
            </div>

            <div className="event-detail-info-grid">
              <div className="event-info-card">
                <h3>Datoer & Tidspunkt</h3>
                <p>
                  <strong>Åbning:</strong> {formatDate(event.startDate)}<br />
                  {event.endDate && event.endDate !== event.startDate && (
                    <>
                      <strong>Lukker:</strong> {formatDate(event.endDate)}<br />
                    </>
                  )}
                  <strong>Åbningstider:</strong> Man-Fre 10:00-16:00
                </p>
              </div>

              <div className="event-info-card">
                <h3>Lokation</h3>
                <p>
                  <strong>Media College Denmark</strong><br />
                  Fotografuddannelsen<br />
                  Viborg, Danmark
                </p>
              </div>

              <div className="event-info-card">
                <h3>Praktisk Information</h3>
                <p>
                  Gratis adgang for alle<br />
                  Handicapvenligt<br />
                  Guidede ture efter aftale
                </p>
              </div>
            </div>

            <div className="event-detail-gallery-cta">
              <h2>Se billeder fra eventet</h2>
              <p>
                Udforsk de fantastiske fotografier fra {eventName}. 
                Alle billeder kan købes som prints i forskellige størrelser.
              </p>
              <Link to={`/?event=${event.slug}`} className="btn btn-primary btn-large">
                Se billeder fra eventet →
              </Link>
            </div>

            {status === 'past' && (
              <div className="event-detail-archive">
                <p className="event-archive-notice">
                  ℹ️ Dette event er afsluttet, men billederne er stadig tilgængelige i vores arkiv.
                </p>
              </div>
            )}
          </section>

          <footer className="event-detail-footer">
            <Link to="/events" className="btn btn-secondary">
              ← Tilbage til alle events
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}

export default EventDetail;
