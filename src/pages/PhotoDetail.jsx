import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchPhotos } from '../services/apiService'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * PhotoDetail page component
 * Displays detailed information about a single photo
 * Matches Figma design with two-column layout
 */
function PhotoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPrintType, setSelectedPrintType] = useState('digital')
  
  const printTypes = [
    { id: 'digital', name: 'Digital download', price: 299 },
    { id: 'a4', name: 'Print A4', price: 449 },
    { id: 'a2', name: 'Print A2', price: 799 }
  ]

  useEffect(() => {
    loadPhoto()
  }, [id])

  const loadPhoto = async () => {
    try {
      const photos = await fetchPhotos()
      const foundPhoto = photos.find(p => p._id === id)
      if (foundPhoto) {
        setPhoto(foundPhoto)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Error loading photo:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    const selectedPrint = printTypes.find(p => p.id === selectedPrintType)
    const cartItem = {
      ...photo,
      printType: selectedPrint.name,
      price: selectedPrint.price
    }
    addToCart(cartItem)
  }

  if (loading) {
    return <div className="loading">Indlæser...</div>
  }

  if (!photo) {
    return <div className="error">Billede ikke fundet</div>
  }

  const selectedPrint = printTypes.find(p => p.id === selectedPrintType)
  const photographer = photo.photographer || 'Ukendt Fotograf'
  const year = photo.year || new Date(photo.uploadedAt).getFullYear()
  const eventName = photo.eventName || photo.event || 'Generelt'

  return (
    <div className="photo-detail-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">Gallerier</Link>
        <span className="breadcrumb-separator">/</span>
        <span>{photo.originalFilename}</span>
      </nav>

      <div className="photo-detail-layout">
        {/* Left: Large Image */}
        <div className="photo-detail-image">
          <img src={photo.url} alt={photo.originalFilename} />
        </div>

        {/* Right: Content Panel */}
        <div className="photo-detail-content">
          <h1 className="photo-detail-title">{photo.originalFilename}</h1>
          <p className="photo-detail-meta">{photographer} · Årgang {year}</p>
          <p className="photo-detail-category">{eventName}</p>

          <div className="photo-detail-section">
            <h3>Om værket</h3>
            <p>{photo.description || 'Et unikt fotografi fra fotografuddannelsens studenter. Dette værk viser den kreative vision og tekniske kunnen hos kommende professionelle fotografer.'}</p>
          </div>

          <div className="photo-detail-section">
            <h3>Om fotografen</h3>
            <blockquote className="photographer-quote">
              "{photographer} er en talentfuld studerende på Media College Denmark's fotografuddannelse. Dette værk demonstrerer deres unikke perspektiv og kunstneriske udtryk."
            </blockquote>
          </div>

          <div className="photo-detail-section">
            <h3>Vælg print type</h3>
            <div className="print-type-selector">
              {printTypes.map(type => (
                <label key={type.id} className={`print-type-card ${selectedPrintType === type.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="printType"
                    value={type.id}
                    checked={selectedPrintType === type.id}
                    onChange={() => setSelectedPrintType(type.id)}
                  />
                  <div className="print-type-info">
                    <span className="print-type-name">{type.name}</span>
                    <span className="print-type-price">{formatPrice(type.price)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="photo-detail-price-summary">
            <span>Valgt pris:</span>
            <span className="price-amount">{formatPrice(selectedPrint.price)}</span>
          </div>

          <button className="btn-primary btn-add-large" onClick={handleAddToCart}>
            Tilføj til kurv – {formatPrice(selectedPrint.price)}
          </button>

          <div className="photo-detail-info-box">
            <h4>Rettigheder & brug</h4>
            <p>Alle billeder er beskyttet af ophavsret. Ved køb erhverver du ret til personlig brug. Kommerciel brug kræver særskilt aftale.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
