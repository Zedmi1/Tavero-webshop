import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [heartAnimation, setHeartAnimation] = useState(null);
  const lastUserId = useRef(undefined);
  const isInitialized = useRef(false);

  const getStorageKey = useCallback((userId) => {
    return userId ? `tavero_wishlist_${userId}` : 'tavero_wishlist_guest';
  }, []);

  useEffect(() => {
    const currentUserId = user?.id || null;
    const previousUserId = lastUserId.current;
    
    if (previousUserId !== undefined && previousUserId !== currentUserId && isInitialized.current) {
      const prevStorageKey = getStorageKey(previousUserId);
      const prevWishlist = wishlist;
      if (prevWishlist.length > 0) {
        localStorage.setItem(prevStorageKey, JSON.stringify(prevWishlist));
      }
    }
    
    lastUserId.current = currentUserId;
    
    const storageKey = getStorageKey(currentUserId);
    const savedWishlist = localStorage.getItem(storageKey);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        setWishlist([]);
      }
    } else {
      setWishlist([]);
    }
    isInitialized.current = true;
  }, [user?.id, getStorageKey]);

  useEffect(() => {
    if (!isInitialized.current) return;
    const storageKey = getStorageKey(user?.id || null);
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, user?.id, getStorageKey]);

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
      setHeartAnimation(product.id);
      setTimeout(() => setHeartAnimation(null), 600);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      heartAnimation,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
