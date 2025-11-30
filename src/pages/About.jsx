import { Link } from 'react-router-dom';
import './InfoPages.css';

function About() {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>About Tavero</h1>
        <p>Simple. Comfortable. Timeless.</p>
      </div>

      <div className="info-content">
        <section className="info-section about-intro">
          <div className="about-story">
            <h2>Our Story</h2>
            <p>Tavero was born from a simple idea: everyone deserves a perfect T-shirt. Not one that fades after a few washes, shrinks unexpectedly, or loses its shape. A T-shirt that feels as good on day 100 as it did on day one.</p>
            <p>We spent years searching for the ultimate everyday tee, trying countless brands and styles. When we couldn't find exactly what we were looking for, we decided to create it ourselves.</p>
          </div>
        </section>

        <section className="info-section">
          <h2>What We Believe</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Quality First</h3>
              <p>We never compromise on materials or craftsmanship. Every T-shirt is made from 100% premium cotton and built to last.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <h3>Comfort Matters</h3>
              <p>A great T-shirt should feel like a second skin. Our relaxed fit and soft fabrics ensure all-day comfort.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>Simplicity</h3>
              <p>We believe in doing one thing and doing it well. No gimmicks, no trends—just timeless, versatile basics.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7"/>
                </svg>
              </div>
              <h3>Sustainability</h3>
              <p>We're committed to responsible production. Minimal packaging, ethical manufacturing, lasting quality.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>The Tavero Difference</h2>
          <div className="difference-list">
            <div className="difference-item">
              <div className="difference-number">01</div>
              <div className="difference-content">
                <h4>Premium Materials</h4>
                <p>We source only the finest cotton from trusted suppliers. Each batch is tested for softness, durability, and color retention.</p>
              </div>
            </div>
            <div className="difference-item">
              <div className="difference-number">02</div>
              <div className="difference-content">
                <h4>Perfect Fit</h4>
                <p>Our unisex design is carefully tailored to flatter all body types. Not too tight, not too loose—just right.</p>
              </div>
            </div>
            <div className="difference-item">
              <div className="difference-number">03</div>
              <div className="difference-content">
                <h4>Pre-Shrunk</h4>
                <p>Every T-shirt is pre-shrunk before it reaches you, so you never have to worry about sizing changes after washing.</p>
              </div>
            </div>
            <div className="difference-item">
              <div className="difference-number">04</div>
              <div className="difference-content">
                <h4>Colorfast Dyes</h4>
                <p>Our colors stay vibrant wash after wash. No fading, no bleeding—your T-shirt looks new for years.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Our Promise</h2>
          <div className="promise-box">
            <p>Every Tavero T-shirt comes with our quality guarantee. If you're not completely satisfied with your purchase, we'll make it right. That's not just a policy—it's our promise to you.</p>
          </div>
        </section>

        <div className="info-cta">
          <h3>Experience the Tavero difference</h3>
          <p>Find your perfect T-shirt today.</p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default About;
