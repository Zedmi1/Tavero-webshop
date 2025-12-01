import { useState } from 'react';
import './InfoPages.css';

function SizeGuide() {
  const [unit, setUnit] = useState('inches');

  const sizeChart = {
    inches: [
      { size: 'XS', chest: '34-36', length: '27', shoulder: '16' },
      { size: 'S', chest: '36-38', length: '28', shoulder: '17' },
      { size: 'M', chest: '38-40', length: '29', shoulder: '18' },
      { size: 'L', chest: '40-42', length: '30', shoulder: '19' },
      { size: 'XL', chest: '42-44', length: '31', shoulder: '20' },
      { size: 'XXL', chest: '44-46', length: '32', shoulder: '21' }
    ],
    cm: [
      { size: 'XS', chest: '86-91', length: '69', shoulder: '41' },
      { size: 'S', chest: '91-97', length: '71', shoulder: '43' },
      { size: 'M', chest: '97-102', length: '74', shoulder: '46' },
      { size: 'L', chest: '102-107', length: '76', shoulder: '48' },
      { size: 'XL', chest: '107-112', length: '79', shoulder: '51' },
      { size: 'XXL', chest: '112-117', length: '81', shoulder: '53' }
    ]
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Size Guide</h1>
        <p>Find your perfect fit with our sizing chart</p>
      </div>

      <div className="info-content">
        <section className="info-section">
          <div className="size-intro">
            <p>Our T-shirts feature a relaxed, unisex fit designed to be comfortable for all body types. Use the measurements below to find your ideal size.</p>
          </div>
        </section>

        <section className="info-section">
          <div className="unit-toggle">
            <button 
              className={`unit-btn ${unit === 'inches' ? 'active' : ''}`}
              onClick={() => setUnit('inches')}
            >
              Inches
            </button>
            <button 
              className={`unit-btn ${unit === 'cm' ? 'active' : ''}`}
              onClick={() => setUnit('cm')}
            >
              Centimeters
            </button>
          </div>

          <div className="size-table-wrapper">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th>Length ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th>Shoulder ({unit === 'inches' ? 'in' : 'cm'})</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart[unit].map((row) => (
                  <tr key={row.size}>
                    <td className="size-label">{row.size}</td>
                    <td>{row.chest}</td>
                    <td>{row.length}</td>
                    <td>{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="info-section">
          <h2>How to Measure</h2>
          <div className="measure-grid">
            <div className="measure-item">
              <div className="measure-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4>Chest</h4>
              <p>Measure around the fullest part of your chest, keeping the tape measure horizontal and level.</p>
            </div>
            <div className="measure-item">
              <div className="measure-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="2" x2="12" y2="22"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h4>Length</h4>
              <p>Measure from the highest point of the shoulder down to the bottom hem of the shirt.</p>
            </div>
            <div className="measure-item">
              <div className="measure-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
              <h4>Shoulder</h4>
              <p>Measure across the back from the edge of one shoulder to the edge of the other.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Fit Tips</h2>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">💡</span>
              <p><strong>Between sizes?</strong> We recommend sizing up for a more relaxed fit, or sizing down for a more fitted look.</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📏</span>
              <p><strong>First time buyer?</strong> Compare our measurements to a T-shirt you already own and love.</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">👕</span>
              <p><strong>Shrinkage:</strong> Our shirts are pre-shrunk, so they'll maintain their size after washing.</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔄</span>
              <p><strong>Easy exchanges:</strong> If your size isn't quite right, we offer free exchanges within 30 days.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Model Size Reference</h2>
          <div className="model-info">
            <div className="model-card">
              <h4>White Shirt Model</h4>
              <p>Height: 5'10" (178 cm)</p>
              <p>Chest: 38" (97 cm)</p>
              <p>Wearing: Size M</p>
            </div>
            <div className="model-card">
              <h4>Black Shirt Model</h4>
              <p>Height: 6'0" (183 cm)</p>
              <p>Chest: 40" (102 cm)</p>
              <p>Wearing: Size L</p>
            </div>
          </div>
        </section>

        <div className="info-cta">
          <h3>Still unsure about sizing?</h3>
          <p>Our team is happy to help you find the perfect fit.</p>
          <a href="/contact" className="btn btn-primary">Get Sizing Help</a>
        </div>
      </div>
    </div>
  );
}

export default SizeGuide;
