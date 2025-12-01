const Brevo = require('@getbrevo/brevo');

let apiInstance = null;

function getBrevoClient() {
  if (apiInstance) {
    return apiInstance;
  }

  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    throw new Error('Email service not configured. Please set BREVO_API_KEY environment variable.');
  }

  apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.authentications['apiKey'].apiKey = apiKey;

  return apiInstance;
}

async function send2FACode(email, code) {
  try {
    const api = getBrevoClient();
    const senderName = process.env.BREVO_SENDER_NAME || 'Tavero';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@tavero.com';
    
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Your Tavero Login Code';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Tavero</h1>
        <h2 style="color: #666; text-align: center;">Your Login Verification Code</h2>
        <div style="background: #f5f5f5; padding: 30px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <p style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 8px; margin: 0;">${code}</p>
        </div>
        <p style="color: #666; text-align: center;">This code will expire in 10 minutes.</p>
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `;

    const result = await api.sendTransacEmail(sendSmtpEmail);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending 2FA code:', error);
    return { success: false, error: error.message };
  }
}

async function sendPasswordResetEmail(email, resetToken, resetUrl) {
  try {
    const api = getBrevoClient();
    const senderName = process.env.BREVO_SENDER_NAME || 'Tavero';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@tavero.com';
    
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Reset Your Tavero Password';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Tavero</h1>
        <h2 style="color: #666; text-align: center;">Password Reset Request</h2>
        <p style="color: #666; text-align: center;">
          We received a request to reset your password. Click the button below to create a new password.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #333; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; text-align: center; font-size: 14px;">
          Or copy and paste this link into your browser:
        </p>
        <p style="color: #999; text-align: center; font-size: 12px; word-break: break-all;">
          ${resetUrl}
        </p>
        <p style="color: #666; text-align: center;">This link will expire in 1 hour.</p>
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `;

    const result = await api.sendTransacEmail(sendSmtpEmail);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  send2FACode,
  sendPasswordResetEmail
};
