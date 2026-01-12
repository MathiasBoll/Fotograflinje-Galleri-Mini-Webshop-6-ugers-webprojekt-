import { createContext, useState, useEffect } from 'react'

/**
 * ThemeContext
 * Manages light/dark theme state across the application
 * Persists theme preference to localStorage
 */
export const ThemeContext = createContext()

/**
 * ThemeProvider component
 * Wraps the application to provide theme context to all child components
 */
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  // Apply theme to document root and save to localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,           // Current theme ('light' or 'dark')
    toggleTheme      // Function to toggle theme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
