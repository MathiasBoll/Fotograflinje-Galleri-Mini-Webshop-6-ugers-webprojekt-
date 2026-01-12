import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminUpload from './pages/AdminUpload';
import AdminManage from './pages/AdminManage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-confirmation" 
                  element={
                    <ProtectedRoute>
                      <OrderConfirmation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/upload" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminUpload />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/manage" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminManage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
