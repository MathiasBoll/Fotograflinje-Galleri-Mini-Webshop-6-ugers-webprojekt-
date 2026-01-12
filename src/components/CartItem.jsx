import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * CartItem component
 * Individual item in the shopping cart
 */
function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext)

  const itemId = item._id || item.id
  const itemPrice = Number(item.price) || 299

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="cart-item">
      <img src={item.thumbUrl || item.thumbnail || item.url} alt={item.originalFilename || item.title} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3>{item.originalFilename || item.title}</h3>
        <p className="cart-item-event">{item.eventName || ''}</p>
      </div>

      <div className="cart-item-quantity">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <div className="cart-item-price">
        {formatPrice(itemPrice * item.quantity)}
      </div>

      <button 
        onClick={() => removeFromCart(itemId)}
        className="remove-btn"
        title="Fjern fra kurv"
      >
        ✕
      </button>
    </div>
  )
}

export default CartItem
