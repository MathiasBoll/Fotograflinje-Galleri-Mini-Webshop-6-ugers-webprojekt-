import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

/**
 * Navbar component
 * Main navigation bar with links and cart count
 */
function Navbar() {
  const { cart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📷 Fotogalleri
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/">Galleri</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Kurv
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </li>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="btn-link">
                  Log ud ({user.username})
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Log ind</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
