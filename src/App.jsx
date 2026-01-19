import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { initializeDemoData } from './services/demoDataService'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import PhotoDetail from './pages/PhotoDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Kontakt from './pages/Kontakt'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import AdminLayout from './layouts/AdminLayout'
import AdminOrders from './pages/AdminOrders'
import AdminEvents from './pages/AdminEvents'
import AdminImages from './pages/AdminImages'
import AdminEmails from './pages/AdminEmails'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * Main App component
 * Sets up routing, context providers, and main layout structure
 */
function App() {
  useEffect(() => {
    initializeDemoData()
  }, [])

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Admin Routes - Separate Layout */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/billeder" replace />} />
                <Route path="billeder" element={<AdminImages />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="ordrer" element={<AdminOrders />} />
                <Route path="emails" element={<AdminEmails />} />
              </Route>

              {/* Public Routes - Main Site Layout */}
              <Route path="*" element={
                <div className="app">
                  <Navbar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/fotograf-print-viborg" element={<LandingPage />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/events/:slug" element={<EventDetail />} />
                      <Route path="/kontakt" element={<Kontakt />} />
                      <Route path="/photo/:id" element={<PhotoDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App