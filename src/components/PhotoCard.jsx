import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * PhotoCard component
 * Individual photo card displayed in the gallery grid
 * Shows thumbnail, title, photographer, year, event, price, and "Add to cart" button
 * 
 * Props:
 * @param {Object} photo - Photo object from API containing all photo data
 * @param {Boolean} featured - Whether this photo is featured
 */
function PhotoCard({ photo, featured = false }) {
  // Get addToCart function from CartContext
  const { addToCart } = useContext(CartContext)
  
  // State for button animation
  const [isAdding, setIsAdding] = useState(false)

  /**
   * Add this photo to the shopping cart
   * Called when user clicks "Tilføj til kurv" button
   */
  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(photo)
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  // Extract photographer name and year from photo data
  const photographer = photo.photographer || 'Ukendt Fotograf'
  const year = photo.year || new Date(photo.uploadedAt).getFullYear()
  const eventName = photo.eventName || photo.event || 'Generelt'

  return (
    <div className={`photo-card ${featured ? 'photo-card-featured card-rainbow' : ''}`}>
      {/* Photo thumbnail - use thumbUrl for smaller file size, fallback to full url */}
      <Link to={`/photo/${photo._id}`} className="photo-image">
        {featured && <span className="featured-badge rainbow-border">Udvalgt værk</span>}
        <img src={photo.thumbUrl || photo.url} alt={photo.originalFilename} />
      </Link>
      
      <div className="photo-info">
        {/* Photo title/filename */}
        <h3 className="photo-title">{photo.originalFilename}</h3>
        
        {/* Photographer and year */}
        <p className="photo-meta">{photographer} · Årgang {year}</p>
        
        {/* Event name */}
        <p className="photo-event">{eventName}</p>
        
        <div className="photo-footer">
          {/* Price formatted as Danish currency (299 kr.) */}
          <span className="photo-price">Print fra {formatPrice(photo.price || 299)}</span>
          
          {/* Add to cart button */}
          <button 
            className={`btn-add-to-cart ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <span className="checkmark">✓</span> Tilføjet!
              </>
            ) : (
              'Tilføj til kurv'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
