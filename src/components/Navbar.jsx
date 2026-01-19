import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

/**
 * Navbar component
 * Main navigation bar displayed at the top of all pages
 * Shows: Logo, navigation links, cart with item count, user menu with login/logout
 * Adapts based on authentication state (logged in/out) and user role (admin/user)
 */
function Navbar() {
  // Get cart state and user authentication state from contexts
  const { cart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  // Calculate total number of items in cart (sum of all quantities)
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/brand - links to homepage */}
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="Media College Denmark" className="navbar-logo-img" />
        </Link>

        <ul className="navbar-menu">
          {/* Gallery link - always visible */}
          <li>
            <Link to="/">Galleri</Link>
          </li>
          
          {/* Cart link with item count badge */}
          <li>
            <Link to="/cart" className="cart-link">
              Kurv
              {/* Show red badge with number of items if cart is not empty */}
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </li>
          
          {/* Conditional rendering based on authentication state */}
          {user ? (
            <>
              {/* Show Admin link only if user has admin role */}
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              {/* Logout button showing username */}
              <li>
                <button onClick={logout} className="btn-link">
                  Log ud ({user.username})
                </button>
              </li>
            </>
          ) : (
            /* Show login link if user is not authenticated */
            <li>
              <Link to="/login">Log ind</Link>
            </li>
          )}
          {/* Theme toggle button for dark/light mode */}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
