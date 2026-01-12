import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const [order] = useState(location.state?.order || null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (order) {
      // Simulate sending confirmation email
      const timer = setTimeout(() => {
        setEmailSent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container">
          <h2>No Order Found</h2>
          <Link to="/" className="home-link">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p className="confirmation-message">
          Thank you for your order. Your order has been successfully placed.
        </p>

        {emailSent && (
          <div className="email-notification">
            ✉️ A confirmation email has been sent to {order.customer.email}
          </div>
        )}

        <div className="order-details">
          <h3>Order Details</h3>
          <div className="order-info">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          </div>

          <h3>Shipping Address</h3>
          <div className="shipping-info">
            <p>{order.customer.name}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}, {order.customer.zipCode}</p>
            <p>{order.customer.country}</p>
          </div>

          <h3>Items Ordered</h3>
          <div className="ordered-items">
            {order.items.map((item) => (
              <div key={item.id} className="ordered-item">
                <img 
                  src={item.url || item.image} 
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-info">
                  <p className="item-title">{item.title}</p>
                  <p className="item-details">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
