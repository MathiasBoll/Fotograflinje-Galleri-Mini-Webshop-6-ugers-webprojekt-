import { useState, useEffect } from 'react';
import { getSentEmails, clearSentEmails } from '../services/emailService';

function AdminEmails() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    const sentEmails = getSentEmails();
    setEmails(sentEmails);
  };

  const handleClearAll = () => {
    if (window.confirm('Er du sikker på, at du vil slette alle sendte emails?')) {
      clearSentEmails();
      setEmails([]);
      setSelectedEmail(null);
    }
  };

  const handleViewEmail = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Sendte Emails</h1>
          <p className="admin-page-subtitle">{emails.length} emails sendt (demo mode)</p>
        </div>
        <button 
          className="btn btn-outlined" 
          onClick={handleClearAll}
          disabled={emails.length === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Slet alle
        </button>
      </div>

      {emails.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 20px', opacity: 0.3 }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <p>Ingen emails sendt endnu. Afslut en ordre for at teste email-funktionen.</p>
        </div>
      ) : (
        <div className="emails-layout">
          {/* Email List */}
          <div className="emails-list">
            {emails.map((email, index) => (
              <div 
                key={index}
                className={`email-item ${selectedEmail === email ? 'active' : ''}`}
                onClick={() => handleViewEmail(email)}
              >
                <div className="email-item-header">
                  <strong>{email.subject}</strong>
                  <span className="email-item-date">
                    {new Date(email.sentAt).toLocaleDateString('da-DK', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="email-item-to">
                  Til: {email.to}
                </div>
                {email.orderId && (
                  <div className="email-item-order">
                    Ordre ID: {email.orderId}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Email Preview */}
          {selectedEmail ? (
            <div className="email-preview">
              <div className="email-preview-header">
                <div>
                  <h3>{selectedEmail.subject}</h3>
                  <p className="email-preview-meta">
                    <strong>Til:</strong> {selectedEmail.to}<br />
                    <strong>Fra:</strong> {selectedEmail.from}<br />
                    <strong>Sendt:</strong> {new Date(selectedEmail.sentAt).toLocaleString('da-DK')}
                  </p>
                </div>
                <button 
                  className="btn btn-outlined btn-sm"
                  onClick={() => {
                    const win = window.open('', '_blank');
                    win.document.write(selectedEmail.html);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Åbn i nyt vindue
                </button>
              </div>
              
              <div className="email-preview-content">
                <iframe 
                  srcDoc={selectedEmail.html}
                  title="Email preview"
                  style={{
                    width: '100%',
                    height: '600px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--border-radius)',
                    background: '#fff'
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="email-preview-empty">
              <p>Vælg en email fra listen for at se forhåndsvisning</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminEmails;
