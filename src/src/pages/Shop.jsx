import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, sizes, priceRanges, categories } from '../data/products';
import './Shop.css';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    size: searchParams.get('size') || 'all',
    price: searchParams.get('price') || 'all',
    search: searchParams.get('search') || ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || 'all',
      size: searchParams.get('size') || 'all',
      price: searchParams.get('price') || 'all',
      search: searchParams.get('search') || ''
    });
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category !== 'all') {
      if (filters.category === 'new') {
        result = result.filter(p => p.new === true);
      } else {
        result = result.filter(p => p.category === filters.category);
      }
    }

    if (filters.size !== 'all') {
      result = result.filter(p => p.sizes.includes(filters.size));
    }

    if (filters.price !== 'all') {
      const priceRange = priceRanges.find(pr => pr.id === filters.price);
      if (priceRange) {
        result = result.filter(p => p.price >= priceRange.min && p.price < priceRange.max);
      }
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.size !== 'all') params.set('size', newFilters.size);
    if (newFilters.price !== 'all') params.set('price', newFilters.price);
    if (newFilters.search) params.set('search', newFilters.search);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ category: 'all', size: 'all', price: 'all', search: '' });
    setSearchParams({});
  };

  const hasActiveFilters = filters.category !== 'all' || filters.size !== 'all' || 
    filters.price !== 'all' || filters.search;

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Shop All</h1>
          <p>{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="shop-container container">
        <aside className={`filters-panel ${mobileFiltersOpen ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear all
              </button>
            )}
            <button 
              className="close-filters"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {categories.map(cat => (
              <label key={cat.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.id}
                  onChange={() => updateFilter('category', cat.id)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="size-options">
              <button
                className={`size-filter-btn ${filters.size === 'all' ? 'active' : ''}`}
                onClick={() => updateFilter('size', 'all')}
              >
                All
              </button>
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-filter-btn ${filters.size === size ? 'active' : ''}`}
                  onClick={() => updateFilter('size', size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            {priceRanges.map(range => (
              <label key={range.id} className="filter-option">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === range.id}
                  onChange={() => updateFilter('price', range.id)}
                />
                <span>{range.name}</span>
              </label>
            ))}
          </div>

        </aside>

        <div className="shop-content">
          <div className="shop-toolbar">
            <button 
              className="mobile-filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14"/>
                <line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/>
                <line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="1" y1="14" x2="7" y2="14"/>
                <line x1="9" y1="8" x2="15" y2="8"/>
                <line x1="17" y1="16" x2="23" y2="16"/>
              </svg>
              Filters
            </button>

            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
              />
              {filters.search && (
                <button 
                  className="clear-search"
                  onClick={() => updateFilter('search', '')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="filters-overlay" onClick={() => setMobileFiltersOpen(false)} />
      )}
    </div>
  );
}

export default Shop;
