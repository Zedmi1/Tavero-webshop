import './InfoPages.css';

function Privacy() {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: November 2024</p>
      </div>

      <div className="info-content legal-content">
        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>At Tavero, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this policy carefully.</p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide, including:</p>
          <ul>
            <li>Name and contact information (email, phone, address)</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely by our payment providers)</li>
            <li>Account credentials if you create an account</li>
            <li>Order history and preferences</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send promotional emails (with your consent)</li>
            <li>Improve our website and products</li>
            <li>Prevent fraud and maintain security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third parties who help us operate our business (payment processors, shipping carriers, email services)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section className="legal-section">
          <h2>5. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and cart items</li>
            <li>Analyze website traffic and usage</li>
            <li>Personalize your experience</li>
            <li>Enable certain website features</li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
        </section>

        <section className="legal-section">
          <h2>6. Data Security</h2>
          <p>We implement appropriate security measures to protect your information, including:</p>
          <ul>
            <li>SSL encryption for data transmission</li>
            <li>Secure payment processing through trusted providers</li>
            <li>Regular security assessments</li>
            <li>Limited access to personal information</li>
          </ul>
          <p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="legal-section">
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Object to certain processing activities</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section className="legal-section">
          <h2>8. Marketing Communications</h2>
          <p>With your consent, we may send you promotional emails about products and offers. You can unsubscribe at any time by:</p>
          <ul>
            <li>Clicking the "unsubscribe" link in any marketing email</li>
            <li>Contacting us directly</li>
            <li>Updating your account preferences</li>
          </ul>
          <p>We will still send transactional emails related to your orders.</p>
        </section>

        <section className="legal-section">
          <h2>9. Children's Privacy</h2>
          <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
        </section>

        <section className="legal-section">
          <h2>10. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read the privacy policies of any third-party sites you visit.</p>
        </section>

        <section className="legal-section">
          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
        </section>

        <section className="legal-section">
          <h2>12. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
          <p><strong>Email:</strong> privacy@tavero.com</p>
          <p><strong>Address:</strong> Tavero, Los Angeles, CA</p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
