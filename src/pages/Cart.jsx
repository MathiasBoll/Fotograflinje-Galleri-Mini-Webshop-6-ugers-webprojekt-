import { useContext, useState } from 'react'
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
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleCheckout = (e) => {
    e.preventDefault()
    
    // Create order object
    const order = {
      id: 'order-' + Date.now(),
      customer: customerInfo,
      items: cart.map(item => ({
        id: item._id || item.id,
        title: item.originalFilename || item.title,
        quantity: item.quantity,
        price: item.price,
        thumbnail: item.thumbUrl || item.thumbnail || item.url
      })),
      total: getTotalPrice(),
      date: new Date().toISOString(),
      status: 'pending'
    }
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    existingOrders.push(order)
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    
    // Clear cart and show success
    clearCart()
    alert(`Tak for din ordre, ${customerInfo.name}!\n\nOrdre ID: ${order.id}\nTotal: ${formatPrice(order.total)}\n\nDu vil modtage en bekræftelse på ${customerInfo.email}`)
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
          <button className="btn-primary" onClick={() => setShowCheckoutForm(!showCheckoutForm)}>
            {showCheckoutForm ? 'Skjul checkout' : 'Gå til betaling'}
          </button>
        </div>
      </div>

      {showCheckoutForm && (
        <div className="checkout-form-container">
          <h2>Kundeoplysninger</h2>
          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Fulde navn *</label>
              <input
                type="text"
                id="name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon *</label>
              <input
                type="tel"
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                required
                placeholder="+45 12 34 56 78"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Adresse *</label>
              <textarea
                id="address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                required
                placeholder="Gadenavn 123, 1234 By"
                rows="3"
              />
            </div>

            <div className="checkout-note">
              <p><strong>Note:</strong> Dette er en demo webshop. Ingen reel betaling vil blive behandlet.</p>
            </div>

            <div className="checkout-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowCheckoutForm(false)}>
                Annuller
              </button>
              <button type="submit" className="btn-primary">
                Bekræft ordre ({formatPrice(getTotalPrice())})
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Cart
