import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    const checks = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: (password.match(/[0-9]/g) || []).length >= 2,
      specials: (password.match(/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/g) || []).length >= 2,
      noRepeats: !/(.)\1{2,}/.test(password),
      noCommon: !/^(password|123456|qwerty|admin|letmein|welcome)/i.test(password)
    };

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.numbers) score++;
    if (checks.specials) score++;
    if (checks.noRepeats) score++;
    if (checks.noCommon) score++;
    if (password.length >= 16) score++;

    const labels = ['', 'Very Weak', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent'];
    const colors = ['', '#dc3545', '#dc3545', '#dc3545', '#ffc107', '#17a2b8', '#28a745', '#28a745', '#1a7f37'];

    return { 
      score, 
      label: labels[score] || 'Excellent', 
      color: colors[score] || '#1a7f37',
      checks
    };
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validatePassword = () => {
    const password = formData.password;
    const errors = [];

    if (password.length < 12) {
      errors.push('At least 12 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('One lowercase letter');
    }
    if ((password.match(/[0-9]/g) || []).length < 2) {
      errors.push('At least 2 numbers');
    }
    if ((password.match(/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/g) || []).length < 2) {
      errors.push('At least 2 special characters');
    }
    if (/(.)\1{2,}/.test(password)) {
      errors.push('No more than 2 repeated characters in a row');
    }
    if (/^(password|123456|qwerty|admin|letmein|welcome)/i.test(password)) {
      errors.push('Cannot use common passwords');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const passwordErrors = validatePassword();
    if (passwordErrors.length > 0) {
      setError('Password requirements: ' + passwordErrors.join(', '));
      setIsLoading(false);
      return;
    }

    const result = await register(formData.firstName, formData.lastName, formData.email, formData.password);
    
    if (result.success) {
      navigate('/login', { state: { registrationSuccess: true, email: formData.email } });
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const EyeIcon = ({ show }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      )}
    </svg>
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card animate-fade-in">
          <div className="auth-logo">
            <img 
              src="/images/Tavero logo 1_1764453648718.jpg" 
              alt="Tavero" 
            />
          </div>

          <h1>Create Account</h1>
          <p className="auth-subtitle">Join Tavero and start shopping</p>

          {error && (
            <div className="auth-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${(passwordStrength.score / 6) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  <span className="strength-label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}

              {formData.password && passwordStrength.checks && (
                <div className="password-requirements">
                  <div className={`requirement ${passwordStrength.checks.length ? 'met' : ''}`}>
                    {passwordStrength.checks.length ? '✓' : '○'} At least 12 characters
                  </div>
                  <div className={`requirement ${passwordStrength.checks.uppercase ? 'met' : ''}`}>
                    {passwordStrength.checks.uppercase ? '✓' : '○'} One uppercase letter
                  </div>
                  <div className={`requirement ${passwordStrength.checks.lowercase ? 'met' : ''}`}>
                    {passwordStrength.checks.lowercase ? '✓' : '○'} One lowercase letter
                  </div>
                  <div className={`requirement ${passwordStrength.checks.numbers ? 'met' : ''}`}>
                    {passwordStrength.checks.numbers ? '✓' : '○'} At least 2 numbers
                  </div>
                  <div className={`requirement ${passwordStrength.checks.specials ? 'met' : ''}`}>
                    {passwordStrength.checks.specials ? '✓' : '○'} At least 2 special characters
                  </div>
                  <div className={`requirement ${passwordStrength.checks.noRepeats ? 'met' : ''}`}>
                    {passwordStrength.checks.noRepeats ? '✓' : '○'} No repeated characters (aaa, 111)
                  </div>
                  <div className={`requirement ${passwordStrength.checks.noCommon ? 'met' : ''}`}>
                    {passwordStrength.checks.noCommon ? '✓' : '○'} Not a common password
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  <EyeIcon show={showConfirmPassword} />
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="password-match-error">Passwords do not match</div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <Link to="/login" className="btn btn-outline auth-btn">
            Log In to Existing Account
          </Link>

          <p className="auth-footer">
            By creating an account, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
