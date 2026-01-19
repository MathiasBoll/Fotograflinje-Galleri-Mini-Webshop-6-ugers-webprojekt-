import { useState, useEffect } from 'react';
import { getOrders, getOrderStats, exportOrdersToCSV, updateOrderStatus } from '../services/demoDataService';
import { formatPrice } from '../utils/formatPrice';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pending: 0, processing: 0, completed: 0 });
  const [statusFilter, setStatusFilter] = useState('all');

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
    exportOrdersToCSV();
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'badge-warning',
      processing: 'badge-info',
      completed: 'badge-success'
    };
    return statusMap[status] || 'badge-default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Afventende',
      processing: 'Under behandling',
      completed: 'Afsluttet'
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
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-container">
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
                  <td>{order.customerName}</td>
                  <td className="table-email">{order.email}</td>
                  <td className="table-price">{formatPrice(order.total)}</td>
                  <td>{new Date(order.date).toLocaleDateString('da-DK')}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" title="Se detaljer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
    </div>
  );
}

export default AdminOrders;
