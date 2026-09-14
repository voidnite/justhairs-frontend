import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiStar } from 'react-icons/hi'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/format'
import toast from 'react-hot-toast'
import './ProductCard.css'

const ProductCard = ({ product, size = 'normal' }) => {
  const { addItem } = useCart()
  const [wished, setWished] = useState(false)
  const [imgError, setImgError] = useState(false)

  const primaryImage = product.images?.[0]
  const hoverImage = product.images?.[1]
  const hasVideo = product.video && !primaryImage

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick-add with default variant (first length, first color)
    const variant = {
      length: product.variants?.lengths?.[2] || product.variants?.lengths?.[0] || '',
      color: product.variants?.colors?.[0] || '',
      texture: product.texture || '',
    }
    addItem(product, variant, 1)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWished(w => !w)
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`product-card${size === 'large' ? ' product-card--large' : ''}`}
      aria-label={`View ${product.name}`}
    >
      {/* Image area */}
      <div className="product-card__img-wrap">
        {primaryImage && !imgError ? (
          <>
            <img
              src={primaryImage}
              alt={product.name}
              className="product-card__img product-card__img--primary"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={`${product.name} alternate view`}
                className="product-card__img product-card__img--hover"
                loading="lazy"
              />
            )}
          </>
        ) : hasVideo ? (
          <video
            className="product-card__video"
            src={product.video}
            autoPlay
            muted
            loop
            playsInline
            aria-label={product.name}
          />
        ) : (
          <div className="product-card__placeholder img-placeholder">
            <span>📸 Add Product Photo</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.badge}
          </span>
        )}

        {/* Actions overlay */}
        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            onClick={handleWishlist}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wished ? <HiHeart size={18} color="#c9a96e" /> : <HiOutlineHeart size={18} />}
          </button>
          <button
            className="product-card__action-btn product-card__add-btn"
            onClick={handleQuickAdd}
            aria-label={`Quick add ${product.name} to cart`}
          >
            <HiOutlineShoppingBag size={18} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__texture">{product.texture?.replace(/-/g, ' ')}</span>
          {product.rating && (
            <span className="product-card__rating">
              <HiStar size={12} />
              {product.rating}
              <span className="product-card__review-count">({product.reviewCount})</span>
            </span>
          )}
        </div>

        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__pricing">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="product-card__compare">{formatPrice(product.comparePrice)}</span>
          )}
          {product.comparePrice && (
            <span className="product-card__discount">
              -{Math.round((1 - product.price / product.comparePrice) * 100)}%
            </span>
          )}
        </div>

        {/* Length quick select */}
        {product.variants?.lengths && (
          <div className="product-card__lengths">
            {product.variants.lengths.slice(0, 4).map(len => (
              <span key={len} className="product-card__length-tag">{len}</span>
            ))}
            {product.variants.lengths.length > 4 && (
              <span className="product-card__length-tag product-card__length-more">
                +{product.variants.lengths.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
