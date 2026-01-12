import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { formatPrice } from '../utils/formatPrice'

/**
 * Cart page component
 * Displays shopping cart items and checkout functionality
 */
function Cart() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    // In a real app, this would process payment
    alert('Checkout funktionalitet kommer snart!')
    clearCart()
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h1>Indkøbskurv</h1>
        <p>Din indkøbskurv er tom</p>
        <button onClick={() => navigate('/')}>Fortsæt med at browse</button>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Indkøbskurv</h1>
      
      <div className="cart-items">
        {cart.map(item => (
          <CartItem key={item._id || item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>

        <div className="cart-actions">
          <button className="btn-secondary" onClick={clearCart}>
            Tøm kurv
          </button>
          <button className="btn-primary" onClick={handleCheckout}>
            Gå til betaling
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
