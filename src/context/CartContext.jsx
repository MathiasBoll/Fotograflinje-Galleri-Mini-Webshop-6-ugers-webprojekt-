import { createContext, useState, useEffect } from 'react'
import { saveCart, loadCart } from '../services/cartService'

/**
 * CartContext
 * Provides shopping cart state and functions to all components
 * Handles: add, remove, update quantity, clear cart, calculate total
 * Persists cart data to localStorage for persistence across page reloads
 */
export const CartContext = createContext()

/**
 * CartProvider component
 * Wraps the application to provide cart context to all child components
 */
export function CartProvider({ children }) {
  // Cart state - array of cart items with photo details and quantity
  const [cart, setCart] = useState([])

  // Load cart from localStorage on component mount (first render)
  useEffect(() => {
    const savedCart = loadCart()
    setCart(savedCart)
  }, [])

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    saveCart(cart)
  }, [cart])

  /**
   * Add item to cart or increase quantity if item already exists
   * @param {Object} photo - Photo object from API
   */
  const addToCart = (photo) => {
    setCart(prevCart => {
      // Handle both MongoDB (_id) and mock data (id) field names
      const photoId = photo._id || photo.id
      // Check if item already exists in cart
      const existingItem = prevCart.find(item => (item._id || item.id) === photoId)
      
      if (existingItem) {
        // Item already in cart - increase quantity by 1
        return prevCart.map(item =>
          (item._id || item.id) === photoId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item - add to cart with default price if API doesn't provide one
        return [...prevCart, { 
          ...photo, 
          price: photo.price || 299, // Default price: 299 DKK
          quantity: 1 
        }]
      }
    })
  }

  /**
   * Remove item completely from cart
   * @param {string} photoId - ID of photo to remove (_id or id)
   */
  const removeFromCart = (photoId) => {
    setCart(prevCart => prevCart.filter(item => (item._id || item.id) !== photoId))
  }

  /**
   * Update quantity of a specific item
   * @param {string} photoId - ID of photo to update
   * @param {number} quantity - New quantity (if 0 or less, item is removed)
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
   * Update print type and price for a specific item
   * @param {string} photoId - ID of photo to update
   * @param {string} printType - New print type name
   * @param {number} price - New price for the print type
   */
  const updatePrintType = (photoId, printType, price) => {
    setCart(prevCart =>
      prevCart.map(item =>
        (item._id || item.id) === photoId
          ? { ...item, printType, price }
          : item
      )
    )
  }

  /**
   * Clear all items from cart
   * Used after checkout or when user wants to start over
   */
  const clearCart = () => {
    setCart([])
  }

  /**
   * Calculate total price of all items in cart
   * @returns {number} Total price in DKK
   */
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      // Ensure price and quantity are numbers with fallback values
      const price = Number(item.price) || 299
      const quantity = Number(item.quantity) || 0
      return total + (price * quantity)
    }, 0)
  }

  // Value object containing all cart state and functions
  // This is provided to all child components via Context
  const value = {
    cart,              // Current cart array
    addToCart,         // Function to add items
    removeFromCart,    // Function to remove items
    updateQuantity,    // Function to update item quantity
    updatePrintType,   // Function to update print type and price
    clearCart,         // Function to empty cart
    getTotalPrice      // Function to calculate total
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
