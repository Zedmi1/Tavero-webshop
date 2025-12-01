import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar({ showAnnouncement = false }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen, cartAnimation } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${showAnnouncement ? 'with-announcement' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/images/Tavero logo 3_1764453648719.jpg" 
            alt="Tavero" 
            className="logo-image"
          />
        </Link>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''} ${showAnnouncement ? 'with-announcement' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link to="/wishlist" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Wishlist
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </Link>
        </div>

        <div className="navbar-actions">
          <div className={`search-container ${searchOpen ? 'active' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
            <button 
              className="icon-btn search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          <button 
            className={`icon-btn cart-btn ${cartAnimation ? 'animate-cart' : ''}`}
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </button>

          {user ? (
            <div className="user-menu">
              <button className="icon-btn user-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
              <div className="user-dropdown">
                <span className="user-name">Hi, {user.name}</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          )}

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
