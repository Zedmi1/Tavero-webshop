import { useState } from 'react';
import './InfoPages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="info-page">
        <div className="info-header">
          <h1>Thank You!</h1>
          <p>We've received your message</p>
        </div>
        <div className="info-content">
          <div className="success-message">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2>Message Sent Successfully</h2>
            <p>Our team will get back to you within 24-48 hours. We appreciate your patience!</p>
            <a href="/" className="btn btn-primary">Return Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="info-content">
        <div className="contact-layout">
          <div className="contact-info">
            <section className="contact-section">
              <h2>Get in Touch</h2>
              <p>Have a question, concern, or just want to say hello? We're here to help and typically respond within 24-48 hours.</p>
            </section>

            <section className="contact-section">
              <h3>Contact Information</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>zedminabowan@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Response Time</h4>
                    <p>24-48 hours</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Eindhoven, Netherlands</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="contact-section">
              <h3>Quick Links</h3>
              <ul className="quick-links">
                <li><a href="/faq">Frequently Asked Questions</a></li>
                <li><a href="/shipping">Shipping Information</a></li>
                <li><a href="/returns">Returns & Exchanges</a></li>
                <li><a href="/size-guide">Size Guide</a></li>
              </ul>
            </section>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Question</option>
                  <option value="return">Return/Exchange</option>
                  <option value="sizing">Sizing Help</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {formData.subject === 'order' || formData.subject === 'return' ? (
                <div className="form-group">
                  <label htmlFor="orderNumber">Order Number</label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="e.g., TAV-12345"
                  />
                </div>
              ) : null}

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
