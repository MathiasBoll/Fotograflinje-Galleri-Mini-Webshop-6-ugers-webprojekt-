/**
 * Format price utility
 * Formats numbers to Danish currency format (DKK)
 * @param {number} price - Price in DKK
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
