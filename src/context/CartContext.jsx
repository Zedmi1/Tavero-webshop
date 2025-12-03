import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const lastUserId = useRef(undefined);
  const isInitialized = useRef(false);

  const getStorageKey = useCallback((userId) => {
    return userId ? `tavero_cart_${userId}` : 'tavero_cart_guest';
  }, []);

  useEffect(() => {
    const currentUserId = user?.id || null;
    const previousUserId = lastUserId.current;
    
    if (previousUserId !== undefined && previousUserId !== currentUserId && isInitialized.current) {
      const prevStorageKey = getStorageKey(previousUserId);
      const prevCart = cart;
      if (prevCart.length > 0) {
        localStorage.setItem(prevStorageKey, JSON.stringify(prevCart));
      }
    }
    
    lastUserId.current = currentUserId;
    
    const storageKey = getStorageKey(currentUserId);
    const savedCart = localStorage.getItem(storageKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }
    isInitialized.current = true;
  }, [user?.id, getStorageKey]);

  useEffect(() => {
    if (!isInitialized.current) return;
    const storageKey = getStorageKey(user?.id || null);
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, user?.id, getStorageKey]);

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { ...product, size, quantity }];
    });

    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 400);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(
      item => !(item.id === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setCart(prev => prev.map(item => 
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      cartAnimation,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
