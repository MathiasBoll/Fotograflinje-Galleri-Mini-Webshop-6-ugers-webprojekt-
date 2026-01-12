/**
 * Cart Service
 * Handles cart persistence using localStorage
 */

const CART_STORAGE_KEY = 'photographyGalleryCart'

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
export function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

/**
 * Load cart from localStorage
 * @returns {Array} Cart items array
 */
export function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

/**
 * Clear cart from localStorage
 */
export function clearCartStorage() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error)
  }
}
