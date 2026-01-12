/**
 * Authentication Service
 * Handles user login/logout
 * Currently uses mock authentication, but can be adapted for real API
 */

// Mock users for development
const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'password123', // In production, NEVER store passwords like this!
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    role: 'user'
  }
]

/**
 * Login user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<Object|null>} User object if successful, null if failed
 */
export async function login(username, password) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In production, this would be:
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, password })
  // })
  // return response.json()
  
  // Mock authentication
  const user = MOCK_USERS.find(
    u => u.username === username && u.password === password
  )
  
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  
  return null
}

/**
 * Logout user
 * @returns {Promise<void>}
 */
export async function logout() {
  // In production:
  // await fetch('/api/auth/logout', { method: 'POST' })
  
  return Promise.resolve()
}

/**
 * Verify if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const user = localStorage.getItem('user')
  return !!user
}

/**
 * Check if user has admin role
 * @returns {boolean}
 */
export function isAdmin() {
  const userStr = localStorage.getItem('user')
  if (!userStr) return false
  
  try {
    const user = JSON.parse(userStr)
    return user.role === 'admin'
  } catch {
    return false
  }
}
