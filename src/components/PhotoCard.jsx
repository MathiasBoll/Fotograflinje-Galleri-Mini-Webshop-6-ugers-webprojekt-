import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * PhotoCard component
 * Individual photo card with add to cart functionality
 */
function PhotoCard({ photo }) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart(photo)
  }

  return (
    <div className="photo-card">
      <div className="photo-image">
        <img src={photo.thumbUrl || photo.url} alt={photo.originalFilename} />
      </div>
      
      <div className="photo-info">
        <h3 className="photo-title">{photo.originalFilename}</h3>
        <p className="photo-date">{new Date(photo.uploadedAt).toLocaleDateString('da-DK')}</p>
        
        <div className="photo-footer">
          <span className="photo-price">{formatPrice(photo.price || 299)}</span>
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
