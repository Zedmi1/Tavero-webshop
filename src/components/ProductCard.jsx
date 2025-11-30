import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0]);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist, heartAnimation } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          
          {product.new && <span className="product-badge new">New</span>}
          
          <button 
            className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${heartAnimation === product.id ? 'animate-heart' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <div className={`add-to-cart-overlay ${showAddToCart ? 'visible' : ''}`}>
            <div className="quick-size-select">
              {product.sizes.slice(0, 4).map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="btn btn-primary add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">€{product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
