import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getItemCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Photography Gallery</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Gallery</Link>
          {isAuthenticated && (
            <>
              <Link to="/cart" className="cart-link">
                Cart ({getItemCount()})
              </Link>
              {isAdmin && (
                <>
                  <Link to="/admin/upload">Upload</Link>
                  <Link to="/admin/manage">Manage</Link>
                </>
              )}
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && <Link to="/login">Login</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
