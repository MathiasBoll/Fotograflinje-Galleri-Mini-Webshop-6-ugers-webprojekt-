import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { login } from '../services/authService'

/**
 * Login page component
 * Handles user authentication
 */
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to the page user tried to access, or home
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Attempt login
      const userData = await login(username, password)
      
      if (userData) {
        setUser(userData)
        navigate(from, { replace: true })
      } else {
        setError('Ugyldigt brugernavn eller adgangskode')
      }
    } catch (err) {
      setError('Der opstod en fejl ved login. Prøv igen.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Log ind</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Brugernavn</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Adgangskode</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logger ind...' : 'Log ind'}
          </button>
        </form>

        <div className="login-links">
          <button 
            onClick={() => navigate('/forgot-password')}
            className="link-button"
          >
            Glemt adgangskode?
          </button>
        </div>

        <div className="login-hint">
          <p><strong>Demo login:</strong></p>
          <p>Brugernavn: admin</p>
          <p>Adgangskode: password123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
