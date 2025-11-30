import './InfoPages.css';

function Terms() {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Terms & Conditions</h1>
        <p>Last updated: November 2024</p>
      </div>

      <div className="info-content legal-content">
        <section className="legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>By accessing and using the Tavero website (tavero.com), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.</p>
        </section>

        <section className="legal-section">
          <h2>2. Use of Website</h2>
          <p>You may use our website for lawful purposes only. You agree not to:</p>
          <ul>
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Use the website to transmit harmful code or malware</li>
            <li>Interfere with or disrupt the website's functionality</li>
            <li>Collect or harvest user information without consent</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Products and Pricing</h2>
          <p>All products displayed on our website are subject to availability. We reserve the right to:</p>
          <ul>
            <li>Modify or discontinue products without notice</li>
            <li>Limit quantities of products purchased</li>
            <li>Correct pricing errors at any time</li>
            <li>Refuse or cancel orders affected by pricing errors</li>
          </ul>
          <p>Prices are displayed in US Dollars and do not include applicable taxes or shipping costs, which will be calculated at checkout.</p>
        </section>

        <section className="legal-section">
          <h2>4. Orders and Payment</h2>
          <p>When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order for any reason. Orders are not confirmed until you receive an order confirmation email.</p>
          <p>Payment must be made at the time of purchase. We accept major credit cards and other payment methods as displayed at checkout. All payment information is processed securely.</p>
        </section>

        <section className="legal-section">
          <h2>5. Shipping and Delivery</h2>
          <p>We aim to process and ship orders within 1-2 business days. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by:</p>
          <ul>
            <li>Shipping carrier issues</li>
            <li>Incorrect shipping information provided</li>
            <li>Carrier delays beyond our control</li>
            <li>Force majeure events</li>
          </ul>
          <p>Risk of loss and title for items pass to you upon delivery to the carrier.</p>
        </section>

        <section className="legal-section">
          <h2>6. Returns and Refunds</h2>
          <p>Our return policy allows returns within 30 days of delivery for unworn items with original tags attached. Please refer to our Returns page for complete details. Refunds will be processed to the original payment method within 5-7 business days of receiving the return.</p>
        </section>

        <section className="legal-section">
          <h2>7. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and designs, is the property of Tavero and is protected by copyright and trademark laws. You may not:</p>
          <ul>
            <li>Copy, reproduce, or distribute our content without permission</li>
            <li>Use our trademarks without written authorization</li>
            <li>Create derivative works based on our content</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. User Accounts</h2>
          <p>If you create an account, you are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
          <p>We reserve the right to terminate accounts that violate these terms.</p>
        </section>

        <section className="legal-section">
          <h2>9. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Tavero shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product in question.</p>
        </section>

        <section className="legal-section">
          <h2>10. Indemnification</h2>
          <p>You agree to indemnify and hold harmless Tavero, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your violation of these terms or your use of the website.</p>
        </section>

        <section className="legal-section">
          <h2>11. Governing Law</h2>
          <p>These Terms and Conditions are governed by the laws of the State of California, United States. Any disputes shall be resolved in the courts of Los Angeles County, California.</p>
        </section>

        <section className="legal-section">
          <h2>12. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.</p>
        </section>

        <section className="legal-section">
          <h2>13. Contact Information</h2>
          <p>For questions about these Terms and Conditions, please contact us at:</p>
          <p><strong>Email:</strong> legal@tavero.com</p>
          <p><strong>Address:</strong> Tavero, Los Angeles, CA</p>
        </section>
      </div>
    </div>
  );
}

export default Terms;
