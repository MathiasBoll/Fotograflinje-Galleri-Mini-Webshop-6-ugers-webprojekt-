import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

/**
 * CartItem component
 * Displays a single item in the shopping cart
 * Shows: thumbnail, title, quantity controls, price, and remove button
 * 
 * Props:
 * @param {Object} item - Cart item with photo details (title, price, quantity, etc.)
 */
function CartItem({ item }) {
  // Get cart management functions from context
  const { removeFromCart, updateQuantity, updatePrintType } = useContext(CartContext)
  
  // Available print types with prices
  const printTypes = [
    { id: 'digital', name: 'Digital download', price: 299 },
    { id: 'a4', name: 'Print A4', price: 449 },
    { id: 'a2', name: 'Print A2', price: 799 }
  ]

  // Handle both MongoDB (_id) and mock data (id) formats
  const itemId = item._id || item.id
  // Ensure price is a number, default to 299 DKK if missing
  const itemPrice = Number(item.price) || 299

  /**
   * Update quantity or remove item if quantity reaches 0
   * @param {number} newQuantity - New quantity value
   */
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  /**
   * Handle print type change
   * @param {Event} e - Change event from select
   */
  const handlePrintTypeChange = (e) => {
    const selectedType = printTypes.find(pt => pt.name === e.target.value)
    if (selectedType) {
      updatePrintType(itemId, selectedType.name, selectedType.price)
    }
  }

  return (
    <div className="cart-item">
      {/* Thumbnail image with fallback chain: thumbUrl → thumbnail → url */}
      <img src={item.thumbUrl || item.thumbnail || item.url} alt={item.originalFilename || item.title} className="cart-item-image" />
      
      <div className="cart-item-details">
        {/* Display photo title/filename */}
        <h3>{item.originalFilename || item.title}</h3>
        {/* Show photographer if available */}
        {item.photographer && (
          <p className="cart-item-meta">{item.photographer}</p>
        )}
        {/* Print type selector */}
        <div className="cart-item-print-selector">
          <label htmlFor={`print-type-${itemId}`}>Type:</label>
          <select
            id={`print-type-${itemId}`}
            value={item.printType || 'Digital download'}
            onChange={handlePrintTypeChange}
            className="print-type-select"
          >
            {printTypes.map(type => (
              <option key={type.id} value={type.name}>
                {type.name} - {formatPrice(type.price)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity controls: - / number / + */}
      <div className="cart-item-quantity">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
          title="Reducer antal"
        >
          −
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
          title="Forøg antal"
        >
          +
        </button>
      </div>

      {/* Total price for this item (price × quantity) */}
      <div className="cart-item-price">
        {formatPrice(itemPrice * item.quantity)}
      </div>

      {/* Remove item button */}
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
