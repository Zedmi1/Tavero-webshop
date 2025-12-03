import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("tavero_last_order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="confirmation-empty">
            <h2>No order found</h2>
            <p>It looks like you haven't placed an order yet.</p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content animate-fade-in">
          <div className="success-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1>Thank You for Your Order!</h1>
          <p className="confirmation-subtitle">
            Your order has been placed successfully. We'll send you a
            confirmation email shortly.
          </p>

          <div className="order-details">
            <div className="order-header">
              <div>
                <span className="label">Order Number</span>
                <span className="value">{order.orderNumber}</span>
              </div>
              <div>
                <span className="label">Date</span>
                <span className="value">{order.date}</span>
              </div>
            </div>

            <div className="order-items">
              <h3>Order Summary</h3>
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="confirmation-item-price">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="order-shipping">
              <h3>Shipping To</h3>
              <p>{order.shipping.fullName}</p>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.postcode}
              </p>
              <p>{order.shipping.email}</p>
            </div>

            <div className="order-total">
              <span>Total</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/shop" className="btn btn-outline">
              View More Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
