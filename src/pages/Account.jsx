import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import './Account.css';

const API_URL = import.meta.env.VITE_API_URL || '';

function Account() {
  const { user, token, logout, refreshUser, isLoading: authLoading } = useAuth();
  const { cart, cartTotal, cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    postcode: '',
    country: 'Netherlands',
    isDefault: false
  });

  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || !token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user, token, authLoading]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [userRes, ordersRes] = await Promise.all([
        fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setProfileForm({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || ''
        });
        setAddresses(userData.addresses || []);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (refreshUser) refreshUser();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const url = editingAddress 
        ? `${API_URL}/api/auth/addresses/${editingAddress}`
        : `${API_URL}/api/auth/addresses`;
      
      const response = await fetch(url, {
        method: editingAddress ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressForm)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: editingAddress ? 'Address updated!' : 'Address added!' });
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({ street: '', city: '', postcode: '', country: 'Netherlands', isDefault: false });
        fetchUserData();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save address' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Address deleted!' });
        fetchUserData();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete address' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    }
  };

  const startEditAddress = (address) => {
    setAddressForm({
      street: address.street,
      city: address.city,
      postcode: address.postcode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingAddress(address.id);
    setShowAddressForm(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#f59e0b',
      CONFIRMED: '#3b82f6',
      PROCESSING: '#8b5cf6',
      SHIPPED: '#06b6d4',
      DELIVERED: '#10b981',
      CANCELLED: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (authLoading || !user) {
    return (
      <div className="account-page">
        <div className="account-loading">Loading your account...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-loading">Loading your account...</div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Welcome back, {user.firstName || user.name}!</p>
        </div>

        {message.text && (
          <div className={`account-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="account-layout">
          <div className="account-sidebar">
            <button 
              className={`sidebar-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Dashboard
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Orders
              {orders.length > 0 && <span className="tab-badge">{orders.length}</span>}
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Addresses
              {addresses.length > 0 && <span className="tab-badge">{addresses.length}</span>}
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Security
            </button>
            <button className="sidebar-tab logout-tab" onClick={logout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>

          <div className="account-content">
            {activeTab === 'dashboard' && (
              <div className="content-section dashboard-section">
                <h2>Dashboard</h2>
                <p className="section-description">Overview of your account activity</p>

                <div className="dashboard-stats">
                  <div className="stat-card">
                    <div className="stat-icon cart-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{cartCount}</span>
                      <span className="stat-label">Items in Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="stat-total">{cartTotal.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon wishlist-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{wishlist.length}</span>
                      <span className="stat-label">Wishlist Items</span>
                    </div>
                    <Link to="/wishlist" className="stat-link">View</Link>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon orders-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{orders.length}</span>
                      <span className="stat-label">Total Orders</span>
                    </div>
                    <button className="stat-link" onClick={() => setActiveTab('orders')}>View</button>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon viewed-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{recentlyViewed.length}</span>
                      <span className="stat-label">Recently Viewed</span>
                    </div>
                    {recentlyViewed.length > 0 && (
                      <button className="stat-link clear-link" onClick={clearRecentlyViewed}>Clear</button>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="dashboard-card">
                    <div className="dashboard-card-header">
                      <h3>Your Cart</h3>
                      <Link to="/shop" className="view-all-link">Continue Shopping</Link>
                    </div>
                    <div className="cart-preview">
                      {cart.slice(0, 3).map((item, index) => (
                        <div key={`${item.id}-${item.size}-${index}`} className="cart-preview-item">
                          <img src={item.images?.[0] || item.image} alt={item.name} />
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-details">Size: {item.size} | Qty: {item.quantity}</span>
                          </div>
                          <span className="item-price">{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {cart.length > 3 && (
                        <p className="more-items">+ {cart.length - 3} more item{cart.length - 3 > 1 ? 's' : ''}</p>
                      )}
                    </div>
                    <div className="cart-summary">
                      <span className="total-label">Total:</span>
                      <span className="total-value">{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {wishlist.length > 0 && (
                  <div className="dashboard-card">
                    <div className="dashboard-card-header">
                      <h3>Your Wishlist</h3>
                      <Link to="/wishlist" className="view-all-link">View All</Link>
                    </div>
                    <div className="wishlist-preview">
                      {wishlist.slice(0, 4).map(item => (
                        <Link key={item.id} to={`/product/${item.id}`} className="wishlist-preview-item">
                          <img src={item.images?.[0] || item.image} alt={item.name} />
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">{item.price.toFixed(2)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {recentlyViewed.length > 0 && (
                  <div className="dashboard-card">
                    <div className="dashboard-card-header">
                      <h3>Recently Viewed</h3>
                      <button className="view-all-link clear-btn" onClick={clearRecentlyViewed}>Clear History</button>
                    </div>
                    <div className="recently-viewed-preview">
                      {recentlyViewed.slice(0, 4).map(item => (
                        <Link key={item.id} to={`/product/${item.id}`} className="recently-viewed-item">
                          <img src={item.images?.[0] || item.image} alt={item.name} />
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">{item.price.toFixed(2)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {cart.length === 0 && wishlist.length === 0 && recentlyViewed.length === 0 && (
                  <div className="empty-dashboard">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <h3>Start exploring!</h3>
                    <p>Browse our collection to add items to your cart and wishlist.</p>
                    <Link to="/shop" className="shop-link">Shop Now</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="content-section">
                <h2>Profile Information</h2>
                <p className="section-description">Update your personal details</p>
                
                <form onSubmit={handleProfileSubmit} className="account-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  
                  <button type="submit" className="save-btn">Save Changes</button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="content-section">
                <h2>Order History</h2>
                <p className="section-description">View your past purchases and track orders</p>
                
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <h3>No orders yet</h3>
                    <p>When you make a purchase, your orders will appear here.</p>
                    <Link to="/shop" className="shop-link">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div 
                          className="order-header"
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        >
                          <div className="order-info">
                            <span className="order-number">{order.orderNumber}</span>
                            <span className="order-date">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-meta">
                            <span 
                              className="order-status" 
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </span>
                            <span className="order-total">{Number(order.total).toFixed(2)}</span>
                            <svg 
                              className={`expand-icon ${expandedOrder === order.id ? 'expanded' : ''}`}
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </div>
                        </div>
                        
                        {expandedOrder === order.id && (
                          <div className="order-details">
                            <div className="order-items">
                              <h4>Items</h4>
                              {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                  <span className="item-name">{item.productName}</span>
                                  <span className="item-size">Size: {item.size}</span>
                                  <span className="item-qty">Qty: {item.quantity}</span>
                                  <span className="item-price">{Number(item.price).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="order-summary">
                              <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{Number(order.subtotal).toFixed(2)}</span>
                              </div>
                              <div className="summary-row">
                                <span>Shipping ({order.shippingMethod?.name})</span>
                                <span>{Number(order.shippingCost) === 0 ? 'FREE' : `€${Number(order.shippingCost).toFixed(2)}`}</span>
                              </div>
                              <div className="summary-row total">
                                <span>Total</span>
                                <span>{Number(order.total).toFixed(2)}</span>
                              </div>
                            </div>
                            
                            {order.address && (
                              <div className="order-address">
                                <h4>Shipping Address</h4>
                                <p>{order.address.street}</p>
                                <p>{order.address.postcode} {order.address.city}</p>
                                <p>{order.address.country}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="content-section">
                <div className="section-header">
                  <div>
                    <h2>Saved Addresses</h2>
                    <p className="section-description">Manage your delivery addresses</p>
                  </div>
                  {!showAddressForm && (
                    <button 
                      className="add-btn"
                      onClick={() => {
                        setShowAddressForm(true);
                        setEditingAddress(null);
                        setAddressForm({ street: '', city: '', postcode: '', country: 'Netherlands', isDefault: false });
                      }}
                    >
                      + Add Address
                    </button>
                  )}
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="account-form address-form">
                    <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                    
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Postcode</label>
                        <input
                          type="text"
                          value={addressForm.postcode}
                          onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      >
                        <option value="Netherlands">Netherlands</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        />
                        Set as default address
                      </label>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="cancel-btn" onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}>
                        Cancel
                      </button>
                      <button type="submit" className="save-btn">
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </button>
                    </div>
                  </form>
                )}

                {!showAddressForm && addresses.length === 0 ? (
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <h3>No saved addresses</h3>
                    <p>Add an address to make checkout faster.</p>
                  </div>
                ) : !showAddressForm && (
                  <div className="addresses-grid">
                    {addresses.map(address => (
                      <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                        {address.isDefault && <span className="default-badge">Default</span>}
                        <p className="address-street">{address.street}</p>
                        <p>{address.postcode} {address.city}</p>
                        <p>{address.country}</p>
                        <div className="address-actions">
                          <button onClick={() => startEditAddress(address)}>Edit</button>
                          <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="content-section">
                <h2>Security Settings</h2>
                <p className="section-description">Manage your password and security preferences</p>
                
                <form onSubmit={handlePasswordSubmit} className="account-form">
                  <h3>Change Password</h3>
                  
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                    <span className="form-hint">
                      At least 12 characters with uppercase, lowercase, 2 numbers, and 2 special characters
                    </span>
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="save-btn">Change Password</button>
                </form>

                <div className="security-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Your account is protected with email-based two-factor authentication. A verification code will be sent to your email each time you log in.</p>
                  <div className="twofa-status enabled">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    2FA is enabled for your account
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
