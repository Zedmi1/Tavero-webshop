import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartSlider.css';

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

function CartSlider() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = cartTotal + shippingCost;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className={`cart-slider ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty</p>
              <button 
                className="btn btn-primary"
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-size">Size: {item.size}</p>
                      <p className="cart-item-price">€{item.price.toFixed(2)}</p>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-selector">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id, item.size)}
                          aria-label="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {cartTotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="shipping-notice">
                      Add €{(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>€{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSlider;
