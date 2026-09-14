import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiAdjustments, HiX, HiSearch } from 'react-icons/hi'
import ProductCard from '../components/common/ProductCard'
import { PRODUCTS, COLLECTIONS } from '../utils/products'

// Only show these textures in the shop filter
const TEXTURES = [
  { id: 'straight',  label: 'Straight'   },
  { id: 'body-wave', label: 'Body Wave'  },
  { id: 'curly',     label: 'Curly'      },
]
import './Shop.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'New Arrivals' },
]

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [activeCollection, setActiveCollection] = useState(searchParams.get('collection') || '')
  const [activeTexture, setActiveTexture] = useState(searchParams.get('texture') || '')
  const [priceRange, setPriceRange] = useState([0, 500000])

  // Sync state when URL params change (e.g. clicking a collection link)
  React.useEffect(() => {
    setActiveCollection(searchParams.get('collection') || '')
    setActiveTexture(searchParams.get('texture') || '')
  }, [searchParams])

  const filtered = useMemo(() => {
    let results = [...PRODUCTS]

    // Filter param shortcuts
    const filter = searchParams.get('filter')
    if (filter === 'new') results = results.filter(p => p.isNew)
    if (filter === 'bestseller') results = results.filter(p => p.isBestSeller)

    // Collection
    if (activeCollection) results = results.filter(p => p.category === activeCollection)

    // Texture
    if (activeTexture) results = results.filter(p => p.texture === activeTexture)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.texture?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    // Price range
    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sort) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break
      case 'price-desc': results.sort((a, b) => b.price - a.price); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      case 'newest': results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      default: break
    }

    return results
  }, [searchParams, activeCollection, activeTexture, search, priceRange, sort])

  const clearFilters = () => {
    setActiveCollection('')
    setActiveTexture('')
    setSearch('')
    setSort('default')
    setPriceRange([0, 200000])
    setSearchParams({})
  }

  const hasFilters = activeCollection || activeTexture || search || sort !== 'default'

  return (
    <div className="shop">
      <div className="container">
        {/* Page header */}
        <div className="shop__header">
          <div>
            <p className="section-label">Our Collection</p>
            <h1 className="shop__title">
              {searchParams.get('filter') === 'new' ? 'New Arrivals'
                : searchParams.get('filter') === 'bestseller' ? 'Best Sellers'
                : activeCollection
                  ? COLLECTIONS.find(c => c.slug === activeCollection || c.id === activeCollection)?.title || 'Shop'
                  : 'All Wigs'}
            </h1>
            <p className="shop__count">{filtered.length} styles</p>
          </div>

          {/* Toolbar */}
          <div className="shop__toolbar">
            {/* Search */}
            <div className="shop__search">
              <HiSearch size={16} className="shop__search-icon" />
              <input
                type="text"
                placeholder="Search wigs…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="shop__search-input"
                aria-label="Search products"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="shop__sort"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filter toggle (mobile) */}
            <button
              className="shop__filter-toggle"
              onClick={() => setShowFilters(s => !s)}
              aria-label="Toggle filters"
            >
              <HiAdjustments size={18} />
              Filters
              {hasFilters && <span className="shop__filter-dot" />}
            </button>
          </div>
        </div>

        <div className="shop__layout">
          {/* Sidebar filters */}
          <aside className={`shop__sidebar${showFilters ? ' shop__sidebar--open' : ''}`} aria-label="Product filters">
            <div className="shop__sidebar-header">
              <h2 className="shop__sidebar-title">Filters</h2>
              {hasFilters && (
                <button className="shop__clear-filters" onClick={clearFilters}>
                  <HiX size={14} /> Clear all
                </button>
              )}
            </div>

            {/* Collection filter */}
            <div className="shop__filter-group">
              <h3 className="shop__filter-label">Collection</h3>
              <div className="shop__filter-options">
                <button
                  className={`shop__filter-btn${!activeCollection ? ' shop__filter-btn--active' : ''}`}
                  onClick={() => setActiveCollection('')}
                >
                  All
                </button>
                {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    className={`shop__filter-btn${activeCollection === col.id ? ' shop__filter-btn--active' : ''}`}
                    onClick={() => setActiveCollection(col.id)}
                  >
                    {col.title}
                  </button>
                ))}              </div>
            </div>

            {/* Texture filter */}
            <div className="shop__filter-group">
              <h3 className="shop__filter-label">Texture</h3>
              <div className="shop__filter-options">
                <button
                  className={`shop__filter-btn${!activeTexture ? ' shop__filter-btn--active' : ''}`}
                  onClick={() => setActiveTexture('')}
                >
                  All
                </button>
                {TEXTURES.map(t => (
                  <button
                    key={t.id}
                    className={`shop__filter-btn${activeTexture === t.id ? ' shop__filter-btn--active' : ''}`}
                    onClick={() => setActiveTexture(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <main className="shop__main">
            {filtered.length === 0 ? (
              <div className="shop__empty">
                <p>No products found.</p>
                <button className="btn btn-ghost" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="shop__grid">
                {filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Shop
