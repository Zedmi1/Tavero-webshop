import { Link } from 'react-router-dom';
import './InfoPages.css';

function Shipping() {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Shipping Information</h1>
        <p>Everything you need to know about delivery</p>
      </div>

      <div className="info-content">
        <section className="info-section">
          <h2>Shipping Options</h2>
          <div className="shipping-options">
            <div className="shipping-card">
              <div className="shipping-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3>Standard Shipping</h3>
              <p className="shipping-time">5-7 Business Days</p>
              <p className="shipping-price">€5.99</p>
              <p className="shipping-note">Free on orders over €50</p>
            </div>

            <div className="shipping-card featured">
              <div className="shipping-badge">Most Popular</div>
              <div className="shipping-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>Express Shipping</h3>
              <p className="shipping-time">2-3 Business Days</p>
              <p className="shipping-price">€12.99</p>
              <p className="shipping-note">Guaranteed fast delivery</p>
            </div>

          </div>
        </section>

        <section className="info-section">
          <h2>Processing Time</h2>
          <p>All orders are processed within 1-2 business days (excluding weekends and holidays). You will receive an email confirmation with tracking information once your order has shipped.</p>
        </section>

        <section className="info-section">
          <h2>Order Tracking</h2>
          <p>Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can track your package directly through the carrier's website or by logging into your account on our site.</p>
        </section>

        <section className="info-section">
          <h2>Shipping Destinations</h2>
          <p>We currently ship within Europe. All orders are delivered via trusted carriers with full tracking available.</p>
        </section>

        <section className="info-section">
          <h2>Shipping FAQs</h2>
          <div className="mini-faq">
            <div className="mini-faq-item">
              <h4>What if my package is lost or damaged?</h4>
              <p>Contact our customer service team within 7 days of expected delivery. We'll work with the carrier to locate your package or send a replacement.</p>
            </div>
            <div className="mini-faq-item">
              <h4>Can I change my shipping address after ordering?</h4>
              <p>If your order hasn't shipped yet, contact us immediately and we'll update your address. Once shipped, changes cannot be made.</p>
            </div>
          </div>
        </section>

        <div className="info-cta">
          <h3>Have more questions?</h3>
          <p>Our team is ready to help with any shipping inquiries.</p>
          <Link to="/contact" className="btn btn-primary">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
