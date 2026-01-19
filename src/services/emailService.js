/**
 * Email Service
 * Handles sending order confirmation emails
 * For production: Configure with backend API endpoint
 * For demo: Simulates email sending and logs to console
 */

const EMAIL_API_ENDPOINT = import.meta.env.VITE_EMAIL_API_URL || null;
const IS_DEMO_MODE = !EMAIL_API_ENDPOINT;

/**
 * Generate HTML email template for order confirmation
 */
function generateOrderConfirmationEmail(order) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong><br>
        <span style="color: #666; font-size: 14px;">
          Antal: ${item.quantity} × ${formatPrice(item.price)}
        </span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${formatPrice(item.quantity * item.price)}
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ordrebekræftelse</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #1a1a1a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">Tak for din ordre!</h1>
    <p style="margin: 10px 0 0; color: #ccc;">Media College Denmark – Fotografuddannelsen</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hej <strong>${order.customer.name}</strong>,
    </p>
    
    <p style="margin-bottom: 20px;">
      Vi har modtaget din ordre og behandler den nu. Du vil snart modtage dine billeder.
    </p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
      <h2 style="margin: 0 0 15px; color: #ff6b35; font-size: 18px;">Ordredetaljer</h2>
      <p style="margin: 5px 0; color: #666;">
        <strong>Ordre ID:</strong> ${order.id}<br>
        <strong>Dato:</strong> ${new Date(order.date).toLocaleDateString('da-DK', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
    
    <table style="width: 100%; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0; margin: 20px 0;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="padding: 15px; text-align: left; border-bottom: 2px solid #e0e0e0;">Produkt</th>
          <th style="padding: 15px; text-align: right; border-bottom: 2px solid #e0e0e0;">Pris</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
        <tr>
          <td colspan="2" style="padding: 15px; text-align: right; font-size: 18px; font-weight: bold; background: #f9f9f9;">
            Total: <span style="color: #ff6b35;">${formatPrice(order.total)}</span>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
      <h3 style="margin: 0 0 10px; font-size: 16px;">Leveringsoplysninger</h3>
      <p style="margin: 5px 0; color: #666; line-height: 1.8;">
        <strong>${order.customer.name}</strong><br>
        ${order.customer.email}<br>
        ${order.customer.phone ? order.customer.phone + '<br>' : ''}
        ${order.customer.address ? order.customer.address : ''}
      </p>
    </div>
    
    <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-size: 14px;">
        <strong>⚠️ Demo Mode:</strong> Dette er en demo-ordre. Ingen betaling er foretaget, og ingen varer vil blive sendt.
      </p>
    </div>
    
    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      Har du spørgsmål til din ordre? Kontakt os på 
      <a href="mailto:info@mediacollege.dk" style="color: #ff6b35;">info@mediacollege.dk</a>
    </p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
      <p style="color: #999; font-size: 12px; margin: 5px 0;">
        Media College Denmark<br>
        Fotografuddannelsen<br>
        © ${new Date().getFullYear()} Alle rettigheder forbeholdes
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Helper function to format price
 */
function formatPrice(amount) {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Send order confirmation email
 * @param {Object} order - Order object containing customer info and order details
 * @returns {Promise<Object>} - Result object with success status and message
 */
export async function sendOrderConfirmationEmail(order) {
  try {
    const emailData = {
      to: order.customer.email,
      subject: `Ordrebekræftelse - ${order.id}`,
      html: generateOrderConfirmationEmail(order),
      from: 'noreply@mediacollege.dk',
      replyTo: 'info@mediacollege.dk'
    };

    if (IS_DEMO_MODE) {
      // Demo mode: Simulate email sending
      console.group('📧 Email Sendt (Demo Mode)');
      console.log('Til:', emailData.to);
      console.log('Emne:', emailData.subject);
      console.log('Ordre ID:', order.id);
      console.log('Total:', formatPrice(order.total));
      console.log('Antal varer:', order.items.length);
      console.groupEnd();

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store email in localStorage for demo purposes
      const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
      sentEmails.push({
        ...emailData,
        sentAt: new Date().toISOString(),
        orderId: order.id
      });
      localStorage.setItem('sentEmails', JSON.stringify(sentEmails));

      return {
        success: true,
        message: 'Email sendt (demo mode)',
        emailId: `demo-${Date.now()}`
      };
    }

    // Production mode: Send email via backend API
    const response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Email sendt succesfuldt',
      emailId: result.id || result.messageId
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    
    return {
      success: false,
      message: 'Der opstod en fejl ved afsendelse af email',
      error: error.message
    };
  }
}

/**
 * Get all sent emails from demo storage
 * @returns {Array} - Array of sent emails
 */
export function getSentEmails() {
  return JSON.parse(localStorage.getItem('sentEmails') || '[]');
}

/**
 * Clear sent emails history (demo only)
 */
export function clearSentEmails() {
  localStorage.removeItem('sentEmails');
}

/**
 * Send password reset email
 * @param {string} email - User email address
 * @param {string} resetLink - Password reset link
 * @returns {Promise<Object>} - Result object
 */
export async function sendPasswordResetEmail(email, resetLink) {
  try {
    const emailData = {
      to: email,
      subject: 'Nulstil din adgangskode',
      html: `
        <h2>Nulstil adgangskode</h2>
        <p>Du har anmodet om at nulstille din adgangskode.</p>
        <p>Klik på linket nedenfor for at nulstille din adgangskode:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #ff6b35; color: white; text-decoration: none; border-radius: 5px;">Nulstil adgangskode</a>
        <p>Hvis du ikke har anmodet om dette, kan du ignorere denne email.</p>
        <p style="color: #999; font-size: 12px;">Dette link udløber om 24 timer.</p>
      `,
      from: 'noreply@mediacollege.dk'
    };

    if (IS_DEMO_MODE) {
      console.log('📧 Password reset email sent (Demo):', email);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        message: 'Nulstillingslink sendt (demo mode)'
      };
    }

    // Production implementation
    const response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Email sending failed');
    }

    return {
      success: true,
      message: 'Nulstillingslink sendt til din email'
    };

  } catch (error) {
    console.error('Password reset email failed:', error);
    return {
      success: false,
      message: 'Der opstod en fejl ved afsendelse af email'
    };
  }
}
