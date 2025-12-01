import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const getSize = (productId, defaultSize) => selectedSizes[productId] || defaultSize;
  const getQuantity = (productId) => selectedQuantities[productId] || 1;

  const handleAddToCart = (product) => {
    const size = getSize(product.id, product.sizes[2] || product.sizes[0]);
    const quantity = getQuantity(product.id);
    addToCart(product, size, quantity);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h2>Your Wishlist is Empty</h2>
            <p>Save items you love by clicking the heart icon on any product.</p>
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="wishlist-grid">
          {wishlist.map(product => (
            <div key={product.id} className="wishlist-item">
              <Link to={`/product/${product.id}`} className="wishlist-image">
                <img src={product.image} alt={product.name} />
              </Link>
              
              <div className="wishlist-details">
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="wishlist-price">€{product.price.toFixed(2)}</p>

                <div className="wishlist-options">
                  <div className="option-group">
                    <label>Size</label>
                    <select
                      value={getSize(product.id, product.sizes[2] || product.sizes[0])}
                      onChange={(e) => setSelectedSizes(prev => ({ ...prev, [product.id]: e.target.value }))}
                    >
                      {product.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="option-group">
                    <label>Qty</label>
                    <div className="quantity-selector">
                      <button 
                        onClick={() => setSelectedQuantities(prev => ({ 
                          ...prev, 
                          [product.id]: Math.max(1, getQuantity(product.id) - 1) 
                        }))}
                      >
                        -
                      </button>
                      <span>{getQuantity(product.id)}</span>
                      <button 
                        onClick={() => setSelectedQuantities(prev => ({ 
                          ...prev, 
                          [product.id]: getQuantity(product.id) + 1 
                        }))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="wishlist-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer">
          <Link to="/" className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
