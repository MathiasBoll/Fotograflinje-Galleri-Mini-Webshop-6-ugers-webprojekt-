import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * PhotoCard component
 * Individual photo card displayed in the gallery grid
 * Shows thumbnail, title, date, price, and "Add to cart" button
 * 
 * Props:
 * @param {Object} photo - Photo object from API containing all photo data
 */
function PhotoCard({ photo }) {
  // Get addToCart function from CartContext
  const { addToCart } = useContext(CartContext)

  /**
   * Add this photo to the shopping cart
   * Called when user clicks "Tilføj til kurv" button
   */
  const handleAddToCart = () => {
    addToCart(photo)
  }

  return (
    <div className="photo-card">
      {/* Photo thumbnail - use thumbUrl for smaller file size, fallback to full url */}
      <div className="photo-image">
        <img src={photo.thumbUrl || photo.url} alt={photo.originalFilename} />
      </div>
      
      <div className="photo-info">
        {/* Photo title/filename */}
        <h3 className="photo-title">{photo.originalFilename}</h3>
        
        {/* Upload date formatted in Danish */}
        <p className="photo-date">{new Date(photo.uploadedAt).toLocaleDateString('da-DK')}</p>
        
        <div className="photo-footer">
          {/* Price formatted as Danish currency (299 kr.) */}
          <span className="photo-price">{formatPrice(photo.price || 299)}</span>
          
          {/* Add to cart button */}
          <button 
            className="btn-add-to-cart"
            onClick={handleAddToCart}
          >
            Tilføj til kurv
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
