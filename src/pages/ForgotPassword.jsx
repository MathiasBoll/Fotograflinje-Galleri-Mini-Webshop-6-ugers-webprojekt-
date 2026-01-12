import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Forgot Password page component
 * Allows users to request a password reset
 * Note: This is a demo implementation without real email sending
 */
function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real application, this would send a password reset email
    console.log('Password reset requested for:', email)
    
    // Show success message
    setIsSubmitted(true)
    
    // Redirect to login after 5 seconds
    setTimeout(() => {
      navigate('/login')
    }, 5000)
  }

  if (isSubmitted) {
    return (
      <div className="forgot-password-page">
        <div className="auth-container">
          <h1>Email Sendt! ✅</h1>
          <div className="success-message">
            <p>
              Hvis der findes en konto med emailen <strong>{email}</strong>, 
              vil du modtage en email med instruktioner til at nulstille din adgangskode.
            </p>
            <p>
              Tjek din indbakke og spam-mappe.
            </p>
            <p className="note">
              <strong>Note:</strong> Dette er en demo-implementering. 
              I produktion ville der blive sendt en rigtig email med et reset-link.
            </p>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Tilbage til login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="forgot-password-page">
      <div className="auth-container">
        <h1>Glemt Adgangskode?</h1>
        <p className="auth-description">
          Indtast din email adresse, så sender vi dig et link til at nulstille din adgangskode.
        </p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email adresse</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@email.dk"
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn-primary btn-full">
            Send nulstillingslink
          </button>
        </form>

        <div className="auth-links">
          <button onClick={() => navigate('/login')} className="link-button">
            ← Tilbage til login
          </button>
        </div>

        <div className="demo-note">
          <p><strong>Demo Info:</strong></p>
          <p>Dette er en simuleret "glemt adgangskode" funktion til demonstration.</p>
          <p>I en rigtig applikation ville der:</p>
          <ul>
            <li>Blive tjekket om emailen findes i databasen</li>
            <li>Genereres et unikt reset-token med udløbstid</li>
            <li>Sendes en email med et sikkert reset-link</li>
            <li>Tillades brugeren at oprette ny adgangskode via linket</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
