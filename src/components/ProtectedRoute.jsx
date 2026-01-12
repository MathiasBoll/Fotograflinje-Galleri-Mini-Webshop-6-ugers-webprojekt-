import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/**
 * ProtectedRoute component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Can also check for admin role
 */
function ProtectedRoute({ children, requireAdmin = true }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    // Redirect to login, but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin && user.role !== 'admin') {
    // User is logged in but not an admin
    return (
      <div className="unauthorized">
        <h1>Adgang nægtet</h1>
        <p>Du har ikke adgang til denne side. Kun administratorer kan tilgå admin panelet.</p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
