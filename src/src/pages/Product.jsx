import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Product.css';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist, heartAnimation } = useWishlist();

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[2] || found.sizes[0]);
      setSelectedImage(0);
      setQuantity(1);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found container">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-main">
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="main-image"
              />
              {product.new && <span className="product-badge new">New</span>}
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">€{product.price.toFixed(2)}</p>
            
            <p className="product-description">{product.description}</p>

            <div className="product-colors">
              <h4>Available Colors</h4>
              <div className="color-tags">
                {product.colors.map(color => (
                  <span key={color} className="color-tag">{color}</span>
                ))}
              </div>
            </div>

            <div className="product-sizes">
              <h4>Select Size</h4>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-quantity">
              <h4>Quantity</h4>
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button 
                className={`btn btn-primary add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              
              <button 
                className={`btn wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${heartAnimation === product.id ? 'animate-heart' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span>Free shipping on orders over €50</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Easy 30-day returns</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Product;
