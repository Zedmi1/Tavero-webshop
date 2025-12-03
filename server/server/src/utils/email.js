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
    const logoUrl = 'https://tavero.onrender.com/images/Tavero%20logo%201_1764453648718.jpg';
    
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Your Tavero Login Code';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #AFC6E9 0%, #87AEDF 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <img src="${logoUrl}" alt="Tavero" style="width: 80px; height: 80px; border-radius: 12px; margin-bottom: 16px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Tavero</h1>
        </div>
        <div style="padding: 40px 30px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; text-align: center; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">Your Login Verification Code</h2>
          <p style="color: #666; text-align: center; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
            Enter this code to complete your login:
          </p>
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; text-align: center; margin: 0 0 30px 0; border-radius: 12px; border: 2px dashed #AFC6E9;">
            <p style="font-size: 36px; font-weight: bold; color: #2A2A2A; letter-spacing: 10px; margin: 0; font-family: 'Courier New', monospace;">${code}</p>
          </div>
          <p style="color: #666; text-align: center; font-size: 14px; margin: 0 0 10px 0;">
            This code will expire in <strong>10 minutes</strong>.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">Tavero - Premium T-Shirts</p>
          <p style="margin: 5px 0 0 0;">Eindhoven, Netherlands</p>
        </div>
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
    const logoUrl = 'https://tavero.onrender.com/images/Tavero%20logo%201_1764453648718.jpg';
    
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Reset Your Tavero Password';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #AFC6E9 0%, #87AEDF 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <img src="${logoUrl}" alt="Tavero" style="width: 80px; height: 80px; border-radius: 12px; margin-bottom: 16px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Tavero</h1>
        </div>
        <div style="padding: 40px 30px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; text-align: center; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">Password Reset Request</h2>
          <p style="color: #666; text-align: center; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 0 0 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #2A2A2A 0%, #404040 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; text-align: center; font-size: 14px; margin: 0 0 10px 0;">
            Or copy and paste this link into your browser:
          </p>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 0 0 20px 0;">
            <p style="color: #666; text-align: center; font-size: 12px; word-break: break-all; margin: 0;">
              ${resetUrl}
            </p>
          </div>
          <p style="color: #666; text-align: center; font-size: 14px; margin: 0;">
            This link will expire in <strong>1 hour</strong>.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            If you didn't request a password reset, please ignore this email.
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">Tavero - Premium T-Shirts</p>
          <p style="margin: 5px 0 0 0;">Eindhoven, Netherlands</p>
        </div>
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
