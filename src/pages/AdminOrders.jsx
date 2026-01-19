import { useState, useEffect } from 'react';
import { getOrders, getOrderStats, exportOrdersToCSV, updateOrderStatus } from '../services/demoDataService';
import { formatPrice } from '../utils/formatPrice';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pending: 0, processing: 0, completed: 0, cancelled: 0 });
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getOrders();
    setOrders(allOrders);
    setStats(getOrderStats());
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const handleExport = () => {
    exportOrdersToCSV(orders);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleSendEmail = (order) => {
    setEmailData({
      to: order.customer.email,
      subject: `Vedr. din ordre #${order.id}`,
      message: `Hej ${order.customer.name},\n\nDin ordre #${order.id} er blevet opdateret.\n\nMed venlig hilsen,\nMedia College Denmark`
    });
    setShowEmailModal(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`;
    window.location.href = mailtoLink;
    setShowEmailModal(false);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'badge-warning',
      processing: 'badge-info',
      completed: 'badge-success',
      cancelled: 'badge-danger'
    };
    return statusMap[status] || 'badge-default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Afventende',
      processing: 'Under behandling',
      completed: 'Afsluttet',
      cancelled: 'Annulleret'
    };
    return labels[status] || status;
  };

  const totalFiltered = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Ordrer</h1>
          <p className="admin-page-subtitle">{orders.length} ordrer i alt</p>
        </div>
        <button className="btn btn-outlined" onClick={handleExport}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Eksporter til CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total omsætning</div>
          <div className="stat-value">{formatPrice(stats.totalRevenue)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Afventende</div>
          <div className="stat-value">{stats.pending}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Under behandling</div>
          <div className="stat-value">{stats.processing}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Afsluttet</div>
          <div className="stat-value">{stats.completed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Annulleret</div>
          <div className="stat-value">{stats.cancelled}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <label htmlFor="status-filter" className="filter-label">Filtrer efter status:</label>
        <select 
          id="status-filter"
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Alle ordrer</option>
          <option value="pending">Afventende</option>
          <option value="processing">Under behandling</option>
          <option value="completed">Afsluttet</option>
          <option value="cancelled">Annulleret</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        {orders.length === 0 ? (
          <div className="empty-state" style={{padding: '80px 20px', textAlign: 'center'}}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{margin: '0 auto 20px', opacity: 0.3}}>
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h3 style={{fontSize: '1.5rem', marginBottom: '10px', color: 'var(--color-text)'}}>Ingen ordrer endnu</h3>
            <p style={{color: 'var(--color-text-muted)', marginBottom: '20px'}}>Ordrer vil vises her når kunder gennemfører køb i webshoppen.</p>
            <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>
              💡 Tip: For at teste systemet, gå til galleriet, læg billeder i kurven og gennemfør en testordre.
            </p>
          </div>
        ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ordre ID</th>
              <th>Kunde</th>
              <th>E-mail</th>
              <th>Total</th>
              <th>Dato</th>
              <th>Status</th>
              <th>Handling</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-empty">
                  Ingen ordrer fundet
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="table-id">#{order.id}</td>
                  <td>{order.customer.name}</td>
                  <td className="table-email">{order.customer.email}</td>
                  <td className="table-price">{formatPrice(order.total)}</td>
                  <td>{new Date(order.date).toLocaleDateString('da-DK')}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button 
                        className="btn-icon" 
                        title="Se detaljer"
                        onClick={() => handleViewOrder(order)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-icon btn-icon-email" 
                        title="Send e-mail"
                        onClick={() => handleSendEmail(order)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        )}
      </div>

      {/* Footer */}
      <div className="table-footer">
        <div className="table-footer-info">
          Viser {filteredOrders.length} af {orders.length} ordrer
        </div>
        <div className="table-footer-total">
          Total for valgte: <strong>{formatPrice(totalFiltered)}</strong>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedOrder(null)}
              aria-label="Luk"
            >
              ×
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Ordre detaljer #{selectedOrder.id}</h2>
            </div>

            <div className="modal-body">
              <div className="order-details-section">
                <h3>Kunde information</h3>
                <div className="order-info-grid">
                  <div>
                    <strong>Navn:</strong>
                    <p>{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <strong>E-mail:</strong>
                    <p>{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <strong>Telefon:</strong>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <strong>Adresse:</strong>
                    <p>{selectedOrder.customer.address}</p>
                  </div>
                </div>
              </div>

              <div className="order-details-section">
                <h3>Ordre information</h3>
                <div className="order-info-grid">
                  <div>
                    <strong>Ordre dato:</strong>
                    <p>{new Date(selectedOrder.date).toLocaleString('da-DK')}</p>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <p>
                      <span className={`badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <strong>Total:</strong>
                    <p className="order-total-price">{formatPrice(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              <div className="order-details-section">
                <h3>Produkter</h3>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item-row">
                      <div className="order-item-info">
                        <strong>{item.title}</strong>
                        <span className="order-item-quantity">Antal: {item.quantity}</span>
                      </div>
                      <div className="order-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-outlined"
                onClick={() => handleSendEmail(selectedOrder)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send e-mail til kunde
              </button>
              
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                {selectedOrder.status !== 'cancelled' && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      if (confirm('Er du sikker på, at du vil annullere denne ordre?')) {
                        handleStatusChange(selectedOrder.id, 'cancelled');
                        setSelectedOrder(null);
                      }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Annuller ordre
                  </button>
                )}
                
                {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                  <button 
                    className="btn btn-success"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'completed');
                      setSelectedOrder(null);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Afslut ordre
                  </button>
                )}
                
                <button 
                  className="btn btn-outlined"
                  onClick={() => setSelectedOrder(null)}
                >
                  Luk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowEmailModal(false)}
              aria-label="Luk"
            >
              ×
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Send e-mail</h2>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label htmlFor="email-to">Til:</label>
                <input
                  type="email"
                  id="email-to"
                  value={emailData.to}
                  onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                  required
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="email-subject">Emne:</label>
                <input
                  type="text"
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email-message">Besked:</label>
                <textarea
                  id="email-message"
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  rows="8"
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-outlined"
                  onClick={() => setShowEmailModal(false)}
                >
                  Annuller
                </button>
                <button type="submit" className="btn btn-primary">
                  Åbn i e-mail klient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
