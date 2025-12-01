import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || '';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="auth-container">
            <div className="auth-box">
              <h1>Check Your Email</h1>
              <div className="success-message">
                <p>If an account exists with the email <strong>{email}</strong>, we've sent a password reset link.</p>
                <p>Please check your inbox and spam folder.</p>
              </div>
              <Link to="/login" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-box">
            <h1>Forgot Password</h1>
            <p className="auth-subtitle">Enter your email address and we'll send you a link to reset your password.</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="auth-link">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
