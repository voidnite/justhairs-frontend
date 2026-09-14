import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPlay, HiPause, HiStar, HiArrowRight } from 'react-icons/hi'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/format'
import { SPOTLIGHT_PRODUCT } from '../../utils/products'
import toast from 'react-hot-toast'
import './Spotlight.css'

const Spotlight = () => {
  const product = SPOTLIGHT_PRODUCT
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const { addItem } = useCart()

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(p => !p)
  }

  const handleAddToCart = () => {
    const variant = {
      length: product.variants?.lengths?.[2] || '',
      color: product.variants?.colors?.[0] || '',
      texture: product.texture || '',
    }
    addItem(product, variant, 1)
    toast.success(`${product.name} added to cart`)
  }

  if (!product) return null

  return (
    <section className="spotlight section" aria-labelledby="spotlight-heading">
      <div className="container">
        <div className="spotlight__inner">
          {/* Left: video / image */}
          <div className="spotlight__media">
            <div className="spotlight__media-wrap">
              {/* 🎥 VIDEO SLOT: Replace src with your spotlight product video
                  Recommended: 15–30 sec showing hair movement, texture, lace close-up */}
              <video
                ref={videoRef}
                className="spotlight__video"
                loop
                muted
                playsInline
                poster={product.images?.[0] || ''}
                aria-label={`${product.name} video`}
              >
                {/* ── ADD YOUR SPOTLIGHT VIDEO ───────────────────────
                    Set video: '/videos/p7-spotlight.mp4' on product p7
                    in src/utils/products.js to activate this video.
                ─────────────────────────────────────────────────── */}
                {product.video && <source src={product.video} type="video/mp4" />}
              </video>

              {/* Fallback image if no video */}
              <div className="spotlight__img-fallback img-placeholder">
                {/* 📸 ADD: product.images[0] — main product photo */}
                <span>📸 Spotlight Product Photo</span>
              </div>

              {/* Play button overlay */}
              <button
                className="spotlight__play-btn"
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
              >
                <div className="spotlight__play-ring" />
                {playing ? <HiPause size={22} /> : <HiPlay size={22} />}
              </button>

              {/* Floating badge */}
              {product.badge && (
                <div className="spotlight__float-badge">{product.badge}</div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="spotlight__thumbs">
              {product.images.slice(0, 4).map((img, i) => (
                <div key={i} className="spotlight__thumb img-placeholder">
                  {/* 📸 ADD: product.images[i] */}
                  {img && <img src={img} alt={`${product.name} view ${i + 1}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="spotlight__info">
            <p className="section-label">Wig Spotlight</p>
            <h2 className="spotlight__title" id="spotlight-heading">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="spotlight__rating">
              <div className="spotlight__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    size={16}
                    color={i < Math.round(product.rating) ? '#c9a96e' : '#333'}
                  />
                ))}
              </div>
              <span className="spotlight__rating-text">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="spotlight__pricing">
              <span className="spotlight__price">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="spotlight__compare">{formatPrice(product.comparePrice)}</span>
              )}
            </div>

            <p className="spotlight__desc">{product.description}</p>

            {/* Features */}
            <ul className="spotlight__features">
              {product.features.map((f, i) => (
                <li key={i} className="spotlight__feature">
                  <span className="spotlight__feature-dot" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Length selector */}
            {product.variants?.lengths && (
              <div className="spotlight__variants">
                <p className="spotlight__variant-label">Available Lengths</p>
                <div className="spotlight__lengths">
                  {product.variants.lengths.map(len => (
                    <span key={len} className="spotlight__length-chip">{len}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="spotlight__actions">
              <button className="btn btn-primary spotlight__add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to={`/product/${product.slug}`} className="btn btn-outline">
                View Details <HiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Spotlight
