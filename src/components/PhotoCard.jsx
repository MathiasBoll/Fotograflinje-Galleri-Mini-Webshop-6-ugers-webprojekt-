import { useCart } from '../contexts/CartContext';
import './PhotoCard.css';

const PhotoCard = ({ photo }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(photo);
  };

  return (
    <div className="photo-card">
      <div className="photo-image-container">
        <img 
          src={photo.url || photo.image} 
          alt={photo.title || 'Photo'} 
          className="photo-image"
        />
      </div>
      <div className="photo-info">
        <h3 className="photo-title">{photo.title || 'Untitled'}</h3>
        <p className="photo-price">${photo.price?.toFixed(2) || '0.00'}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
