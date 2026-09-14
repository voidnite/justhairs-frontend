import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  HiStar, HiOutlineHeart, HiHeart, HiOutlineShoppingBag,
  HiArrowLeft, HiPlus, HiMinus, HiShieldCheck, HiTruck, HiRefresh,
} from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { PRODUCTS } from '../utils/products'
import toast from 'react-hot-toast'
import './ProductDetail.css'

const ProductDetail = () => {
  const { slug } = useParams()
  const { addItem } = useCart()

  const product = PRODUCTS.find(p => p.slug === slug)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedLength, setSelectedLength] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [wished, setWished] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (product) {
      const hasImages = product.images?.some(Boolean)
      setSelectedImage(hasImages ? 0 : (product.video ? -1 : 0))
      setSelectedLength(product.variants?.lengths?.[0] || '')
      setSelectedColor(product.variants?.colors?.[0] || '')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [slug, product])

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedLength) { toast.error('Please select a length'); return }
    if (!selectedColor) { toast.error('Please select a colour'); return }
    const variant = { length: selectedLength, color: selectedColor, texture: product.texture }
    addItem(product, variant, quantity)
    toast.success(`${product.name} (${selectedLength}) added to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
  }

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <div className="product-detail__breadcrumb container">
        <Link to="/" className="breadcrumb__link">Home</Link>
        <span>/</span>
        <Link to="/shop" className="breadcrumb__link">Shop</Link>
        <span>/</span>
        <span className="breadcrumb__current">{product.name}</span>
      </div>

      <div className="container product-detail__layout">
        {/* ── Left: image gallery ── */}
        <div className="product-detail__gallery">
          {/* Thumbnail strip — only show if there are real images or video */}
          <div className="product-detail__thumbs">
            {product.video && (
              <button
                className={`product-detail__thumb${selectedImage === -1 ? ' product-detail__thumb--active' : ''}`}
                onClick={() => setSelectedImage(-1)}
                aria-label="Watch video"
              >
                <div className="product-detail__thumb-img" style={{ background: '#111', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>
                  🎥
                </div>
              </button>
            )}
            {product.images.filter(Boolean).map((img, i) => (
              <button
                key={i}
                className={`product-detail__thumb${selectedImage === i ? ' product-detail__thumb--active' : ''}`}
                onClick={() => setSelectedImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <div className="img-placeholder product-detail__thumb-img">
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Main display — video or image */}
          <div className="product-detail__main-img img-placeholder">
            {selectedImage === -1 && product.video ? (
              <video
                src={product.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-xl)' }}
                aria-label={product.name}
              />
            ) : product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} — view ${selectedImage + 1}`}
              />
            ) : product.video ? (
              <video
                src={product.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-xl)' }}
                aria-label={product.name}
              />
            ) : (
              <div className="product-detail__img-placeholder">
                <span className="product-detail__img-hint">📸 Add Product Photo</span>
              </div>
            )}
            {product.badge && (
              <span className={`product-detail__badge badge--${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                {product.badge}
              </span>
            )}
            <button
              className="product-detail__wish-btn"
              onClick={() => { setWished(w => !w); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist') }}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wished ? <HiHeart size={20} color="#c9a96e" /> : <HiOutlineHeart size={20} />}
            </button>
          </div>
        </div>

        {/* ── Right: product info ── */}
        <div className="product-detail__info">
          {/* Category */}
          <p className="product-detail__category">
            {product.category?.replace(/-/g, ' ')} · {product.texture?.replace(/-/g, ' ')}
          </p>

          <h1 className="product-detail__name">{product.name}</h1>

          {/* Rating */}
          <div className="product-detail__rating">
            <div className="product-detail__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar key={i} size={16} color={i < Math.round(product.rating) ? '#c9a96e' : '#333'} />
              ))}
            </div>
            <span className="product-detail__rating-text">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          {/* Price */}
          <div className="product-detail__pricing">
            <span className="product-detail__price">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <>
                <span className="product-detail__compare">{formatPrice(product.comparePrice)}</span>
                <span className="product-detail__save">
                  Save {formatPrice(product.comparePrice - product.price)}
                </span>
              </>
            )}
          </div>

          <div className="product-detail__divider" />

          {/* Length selector */}
          {product.variants?.lengths && (
            <div className="product-detail__selector">
              <div className="product-detail__selector-header">
                <span className="product-detail__selector-label">Length</span>
                <span className="product-detail__selector-value">{selectedLength}</span>
              </div>
              <div className="product-detail__options">
                {product.variants.lengths.map(len => (
                  <button
                    key={len}
                    className={`product-detail__option${selectedLength === len ? ' product-detail__option--active' : ''}`}
                    onClick={() => setSelectedLength(len)}
                    aria-pressed={selectedLength === len}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.variants?.colors && (
            <div className="product-detail__selector">
              <div className="product-detail__selector-header">
                <span className="product-detail__selector-label">Colour</span>
                <span className="product-detail__selector-value">{selectedColor}</span>
              </div>
              <div className="product-detail__options">
                {product.variants.colors.map(color => (
                  <button
                    key={color}
                    className={`product-detail__option${selectedColor === color ? ' product-detail__option--active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    aria-pressed={selectedColor === color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="product-detail__quantity">
            <span className="product-detail__selector-label">Quantity</span>
            <div className="product-detail__qty-control">
              <button
                className="product-detail__qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <HiMinus size={16} />
              </button>
              <span className="product-detail__qty-value">{quantity}</span>
              <button
                className="product-detail__qty-btn"
                onClick={() => setQuantity(q => Math.min(10, q + 1))}
                aria-label="Increase quantity"
              >
                <HiPlus size={16} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="product-detail__actions">
            <button className="btn btn-primary product-detail__add-btn" onClick={handleAddToCart}>
              <HiOutlineShoppingBag size={18} />
              Add to Cart
            </button>
            <Link to="/checkout" className="btn btn-outline product-detail__buy-btn" onClick={handleBuyNow}>
              Buy Now
            </Link>
          </div>

          {/* Trust badges */}
          <div className="product-detail__trust">
            <div className="product-detail__trust-item">
              <HiShieldCheck size={16} />
              <span>Secure checkout via Paystack</span>
            </div>
            <div className="product-detail__trust-item">
              <HiTruck size={16} />
              <span>Same-day dispatch in Lagos</span>
            </div>
            <div className="product-detail__trust-item">
              <HiRefresh size={16} />
              <span>7-day returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="product-detail__tabs">
            <div className="product-detail__tab-list" role="tablist">
              {['description', 'features', 'care'].map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`product-detail__tab${activeTab === tab ? ' product-detail__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="product-detail__tab-content" role="tabpanel">
              {activeTab === 'description' && (
                <p className="product-detail__tab-text">{product.description}</p>
              )}
              {activeTab === 'features' && (
                <ul className="product-detail__feature-list">
                  {product.features.map((f, i) => (
                    <li key={i}>
                      <span className="product-detail__feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'care' && (
                <ul className="product-detail__feature-list">
                  <li><span className="product-detail__feature-dot" />Wash with sulphate-free shampoo</li>
                  <li><span className="product-detail__feature-dot" />Deep condition weekly</li>
                  <li><span className="product-detail__feature-dot" />Use heat protectant before styling</li>
                  <li><span className="product-detail__feature-dot" />Store on a wig stand when not in use</li>
                  <li><span className="product-detail__feature-dot" />Avoid sleeping in your wig</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
