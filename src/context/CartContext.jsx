import { createContext, useState, useEffect } from 'react'
import { saveCart, loadCart } from '../services/cartService'

/**
 * CartContext
 * Manages shopping cart state across the application
 * Persists cart data to localStorage
 */
export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCart()
    setCart(savedCart)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cart)
  }, [cart])

  /**
   * Add item to cart or increase quantity if already exists
   */
  const addToCart = (photo) => {
    setCart(prevCart => {
      // Ensure photo has an id (_id from API or id from mock)
      const photoId = photo._id || photo.id
      const existingItem = prevCart.find(item => (item._id || item.id) === photoId)
      
      if (existingItem) {
        // Item already in cart, increase quantity
        return prevCart.map(item =>
          (item._id || item.id) === photoId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item, add to cart with default price if not present
        return [...prevCart, { 
          ...photo, 
          price: photo.price || 299, // Default price if not provided by API
          quantity: 1 
        }]
      }
    })
  }

  /**
   * Remove item from cart
   */
  const removeFromCart = (photoId) => {
    setCart(prevCart => prevCart.filter(item => (item._id || item.id) !== photoId))
  }

  /**
   * Update item quantity
   */
  const updateQuantity = (photoId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(photoId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          (item._id || item.id) === photoId ? { ...item, quantity } : item
        )
      )
    }
  }

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCart([])
  }

  /**
   * Get total price of all items in cart
   */
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 299
      const quantity = Number(item.quantity) || 0
      return total + (price * quantity)
    }, 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
