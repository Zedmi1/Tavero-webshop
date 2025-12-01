import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const summerCollection = products.filter(p => p.collection === 'summer').slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <img 
            src="/images/Tavero logo 1_1764453648718.jpg" 
            alt="Tavero" 
            className="hero-logo"
          />
          <h1 className="hero-title">Premium T-Shirts</h1>
          <p className="hero-subtitle">
            Simple. Comfortable. Timeless. Discover our collection of carefully crafted unisex T-shirts.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800" 
            alt="T-shirt collection" 
          />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/shop" className="view-all">View All</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="banner-section">
        <div className="container">
          <div className="banner">
            <div className="banner-content">
              <h2>Quality You Can Feel</h2>
              <p>Every Tavero T-shirt is made from premium materials, designed for lasting comfort and style.</p>
              <Link to="/shop" className="btn btn-secondary">Explore Collection</Link>
            </div>
            <div className="banner-image">
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600" 
                alt="Quality materials" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="summer-collection-section">
        <div className="container">
          <div className="section-header">
            <h2>Tavero's Summer Collection</h2>
            <Link to="/shop" className="view-all">View All</Link>
          </div>
          <div className="products-grid">
            {summerCollection.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
