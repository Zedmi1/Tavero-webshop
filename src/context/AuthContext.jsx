import { createContext, useContext, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('tavero_user');
    const savedToken = localStorage.getItem('tavero_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      if (data.requires2FA) {
        return { 
          success: true, 
          requires2FA: true, 
          userId: data.userId,
          email: email
        };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('tavero_user', JSON.stringify(data.user));
      localStorage.setItem('tavero_token', data.token);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Failed to connect to server' };
    }
  };

  const completeLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('tavero_user', JSON.stringify(userData));
    localStorage.setItem('tavero_token', authToken);
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      return { success: true, redirectToLogin: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Failed to connect to server' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tavero_user');
    localStorage.removeItem('tavero_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, completeLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
