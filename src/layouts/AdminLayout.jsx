import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function AdminLayout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Dark Header */}
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <Link to="/" className="admin-logo-link">
              <img 
                src="/images/logo.png" 
                alt="Media College Denmark" 
                className="admin-logo"
              />
            </Link>
            <div className="admin-header-text">
              <h1 className="admin-title">Admin Panel</h1>
              <p className="admin-subtitle">Media College Denmark – Fotografuddannelsen</p>
            </div>
            <a href="#" onClick={handleLogoutClick} className="admin-logout-link">
              Log ud
            </a>
          </div>

          {/* Tab Navigation */}
          <nav className="admin-nav">
            <NavLink 
              to="/admin/billeder" 
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Billeder
            </NavLink>
            <NavLink 
              to="/admin/events" 
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Events
            </NavLink>
            <NavLink 
              to="/admin/ordrer" 
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Ordrer
            </NavLink>
            <NavLink 
              to="/admin/emails" 
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Emails
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Content Area */}
      <main className="admin-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowLogoutModal(false)}
              aria-label="Luk"
            >
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-icon modal-icon-warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h2 className="modal-title">Log ud?</h2>
            </div>

            <p className="modal-text">
              Er du sikker på, at du vil logge ud af admin-panelet? Du skal logge ind igen for at få adgang.
            </p>

            <div className="modal-actions">
              <button 
                className="btn btn-outlined"
                onClick={() => setShowLogoutModal(false)}
              >
                Forbliv logget ind
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Log ud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;
