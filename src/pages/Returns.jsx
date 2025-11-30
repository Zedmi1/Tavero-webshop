import { Link } from 'react-router-dom';
import './InfoPages.css';

function Returns() {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Returns & Exchanges</h1>
        <p>We want you to love your Tavero T-shirt</p>
      </div>

      <div className="info-content">
        <section className="info-section">
          <div className="policy-highlight">
            <div className="policy-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            </div>
            <h2>30-Day Return Policy</h2>
            <p>Not completely satisfied? No problem. Return any unworn item within 30 days for a full refund.</p>
          </div>
        </section>

        <section className="info-section">
          <h2>Return Eligibility</h2>
          <div className="eligibility-grid">
            <div className="eligibility-item eligible">
              <div className="eligibility-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4>Eligible for Return</h4>
              <ul>
                <li>Unworn and unwashed items</li>
                <li>Original tags still attached</li>
                <li>Within 30 days of delivery</li>
                <li>Original packaging (preferred)</li>
              </ul>
            </div>
            <div className="eligibility-item not-eligible">
              <div className="eligibility-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <h4>Not Eligible</h4>
              <ul>
                <li>Worn or washed items</li>
                <li>Items without tags</li>
                <li>Items purchased over 30 days ago</li>
                <li>Items marked as final sale</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>How to Return</h2>
          <div className="steps-list">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Start Your Return</h4>
                <p>Contact our customer service team via email or through our contact page. Provide your order number and reason for return.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Receive Return Label</h4>
                <p>We'll email you a prepaid return shipping label within 24 hours. Print the label and attach it to your package.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Pack Your Item</h4>
                <p>Place the item in its original packaging or a suitable alternative. Ensure all tags are attached and the item is in unworn condition.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Ship It Back</h4>
                <p>Drop off your package at any authorized shipping location. Keep your tracking receipt for reference.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Get Your Refund</h4>
                <p>Once we receive and inspect your return, we'll process your refund within 5-7 business days to your original payment method.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Exchanges</h2>
          <p>Need a different size or color? We're happy to help! The easiest way to exchange is:</p>
          <ol className="exchange-steps">
            <li>Return your original item for a refund (following the steps above)</li>
            <li>Place a new order for the item you want</li>
            <li>This ensures you get the item you want before it sells out</li>
          </ol>
          <p>If you prefer a direct exchange, contact our team and we'll do our best to accommodate your request.</p>
        </section>

        <section className="info-section">
          <h2>Refund Information</h2>
          <div className="refund-info">
            <div className="refund-item">
              <h4>Refund Method</h4>
              <p>Refunds are issued to the original payment method used for the purchase.</p>
            </div>
            <div className="refund-item">
              <h4>Processing Time</h4>
              <p>5-7 business days after we receive your return. Bank processing may take additional time.</p>
            </div>
            <div className="refund-item">
              <h4>Shipping Costs</h4>
              <p>Original shipping costs are non-refundable unless the return is due to our error.</p>
            </div>
          </div>
        </section>

        <div className="info-cta">
          <h3>Ready to start a return?</h3>
          <p>Contact our team and we'll guide you through the process.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default Returns;
