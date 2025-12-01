import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const FREE_SHIPPING_THRESHOLD = 50;

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 Business Days',
    price: 5.99,
    freeOver: FREE_SHIPPING_THRESHOLD
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 Business Days',
    price: 12.99,
    freeOver: null
  }
];

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  
  const [selectedShipping, setSelectedShipping] = useState('standard');
  
  const getShippingCost = () => {
    const option = SHIPPING_OPTIONS.find(o => o.id === selectedShipping);
    if (!option) return 0;
    if (option.freeOver && cartTotal >= option.freeOver) return 0;
    return option.price;
  };
  
  const shippingCost = getShippingCost();
  const orderTotal = cartTotal + shippingCost;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateShipping()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    if (validatePayment()) {
      const selectedOption = SHIPPING_OPTIONS.find(o => o.id === selectedShipping);
      const orderData = {
        items: cart,
        total: orderTotal,
        shipping: formData,
        shippingMethod: selectedOption?.name || 'Standard Shipping',
        orderNumber: `TAV-${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleDateString()
      };
      localStorage.setItem('tavero_last_order', JSON.stringify(orderData));
      clearCart();
      navigate('/order-confirmation');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out.</p>
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line" />
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {step === 1 && (
              <div className="form-section animate-fade-in">
                <h2>Shipping Information</h2>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="10001"
                      className={errors.postcode ? 'error' : ''}
                    />
                    {errors.postcode && <span className="error-text">{errors.postcode}</span>}
                  </div>
                </div>

                <div className="shipping-method-section">
                  <h3>Shipping Method</h3>
                  <div className="shipping-options">
                    {SHIPPING_OPTIONS.map(option => {
                      const isFree = option.freeOver && cartTotal >= option.freeOver;
                      const displayPrice = isFree ? 0 : option.price;
                      return (
                        <label 
                          key={option.id} 
                          className={`shipping-option ${selectedShipping === option.id ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={() => setSelectedShipping(option.id)}
                          />
                          <div className="shipping-option-content">
                            <div className="shipping-option-header">
                              <span className="shipping-option-name">{option.name}</span>
                              <span className="shipping-option-price">
                                {displayPrice === 0 ? 'Free' : `€${displayPrice.toFixed(2)}`}
                              </span>
                            </div>
                            <span className="shipping-option-time">{option.description}</span>
                            {option.freeOver && !isFree && (
                              <span className="shipping-option-note">
                                Free on orders over €{option.freeOver}
                              </span>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="form-actions">
                  <Link to="/shop" className="btn btn-outline">Back to Cart</Link>
                  <button className="btn btn-primary" onClick={handleContinue}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section animate-fade-in">
                <h2>Payment Information</h2>
                <p className="payment-note">This is a demo checkout. No real payment will be processed.</p>
                
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>
                    Back to Shipping
                  </button>
                  <button className="btn btn-primary" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-items">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping ({SHIPPING_OPTIONS.find(o => o.id === selectedShipping)?.name})</span>
                <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
              </div>
              {selectedShipping === 'standard' && cartTotal < FREE_SHIPPING_THRESHOLD && (
                <div className="shipping-notice">
                  Add €{(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free standard shipping
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>€{orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
