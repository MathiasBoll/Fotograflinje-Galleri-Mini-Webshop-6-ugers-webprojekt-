import { Link } from 'react-router-dom'

/**
 * Footer component
 * Displays college information, contact details, and quick links
 * Appears at the bottom of every page
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Media College Denmark</h4>
          <p>Uddanner fremtidens kreative fagfolk inden for fotografi, film og medieproduktion.</p>
        </div>

        <div className="footer-section">
          <h4>Kontakt</h4>
          <p>E-mail: info@mediacollege.dk</p>
          <p>Telefon: +45 XX XX XX XX</p>
        </div>

        <div className="footer-section">
          <h4>Hurtige links</h4>
          <ul className="footer-links">
            <li><Link to="/">Gallerier</Link></li>
            <li><Link to="/cart">Kurv</Link></li>
            <li><Link to="/login">Admin login</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Media College Denmark – Fotografuddannelsen. Alle rettigheder forbeholdes.</p>
      </div>
    </footer>
  )
}

export default Footer
