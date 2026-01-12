import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/**
 * ThemeToggle component
 * Button to switch between light and dark mode
 * Shows sun icon for light mode, moon icon for dark mode
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={theme === 'light' ? 'Skift til mørk tilstand' : 'Skift til lys tilstand'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle
