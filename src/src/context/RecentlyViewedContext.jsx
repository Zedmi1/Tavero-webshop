import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

const RecentlyViewedContext = createContext();

const MAX_RECENTLY_VIEWED = 12;

export function RecentlyViewedProvider({ children }) {
  const { user } = useAuth();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const lastUserId = useRef(undefined);
  const isInitialized = useRef(false);

  const getStorageKey = useCallback((userId) => {
    return userId ? `tavero_recently_viewed_${userId}` : 'tavero_recently_viewed_guest';
  }, []);

  useEffect(() => {
    const currentUserId = user?.id || null;
    const previousUserId = lastUserId.current;
    
    if (previousUserId !== undefined && previousUserId !== currentUserId && isInitialized.current) {
      const prevStorageKey = getStorageKey(previousUserId);
      const prevRecentlyViewed = recentlyViewed;
      if (prevRecentlyViewed.length > 0) {
        localStorage.setItem(prevStorageKey, JSON.stringify(prevRecentlyViewed));
      }
    }
    
    lastUserId.current = currentUserId;
    
    const storageKey = getStorageKey(currentUserId);
    const savedRecentlyViewed = localStorage.getItem(storageKey);
    if (savedRecentlyViewed) {
      try {
        setRecentlyViewed(JSON.parse(savedRecentlyViewed));
      } catch {
        setRecentlyViewed([]);
      }
    } else {
      setRecentlyViewed([]);
    }
    isInitialized.current = true;
  }, [user?.id, getStorageKey]);

  useEffect(() => {
    if (!isInitialized.current) return;
    const storageKey = getStorageKey(user?.id || null);
    localStorage.setItem(storageKey, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, user?.id, getStorageKey]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      const productWithTimestamp = { 
        ...product, 
        viewedAt: Date.now() 
      };
      const updated = [productWithTimestamp, ...filtered];
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
