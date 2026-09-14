import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPlay, HiPause, HiArrowRight } from 'react-icons/hi'
import { HERO_VIDEO } from '../../utils/products'
import './Hero.css'

const Hero = () => {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(p => !p)
  }

  return (
    <section className="hero" aria-label="Hero">
      {/* Background — video or fallback gradient */}
      <div className="hero__bg">
        {/* 🎥 VIDEO SLOT: Replace `src` with your hero video URL/file path
            Recommended: 10–30 sec loop of a model wearing a wig, close-ups of hair texture
            Format: MP4 (H.264), ideally 1920×1080, < 15 MB for fast load */}
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster=""
          aria-hidden="true"
        >
          {/* ── ADD YOUR VIDEO ──────────────────────────────────────
              Set HERO_VIDEO in src/utils/products.js to activate.
              e.g.  export const HERO_VIDEO = '/videos/hero.mp4'
                 or export const HERO_VIDEO = 'https://res.cloudinary.com/...'
          ─────────────────────────────────────────────────────── */}
          {HERO_VIDEO && <source src={HERO_VIDEO} type="video/mp4" />}
        </video>

        {/* Gradient overlay — always shown (fallback when no video) */}
        <div className="hero__overlay" />
        <div className="hero__gradient-bg" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__text">
          <p className="hero__eyebrow">Premium Human Hair</p>

          <h1 className="hero__headline">
            Find Your<br />
            <span className="hero__headline-accent">Perfect Crown</span>
          </h1>

          <p className="hero__subtext">
            Premium human-hair wigs, bundles & closures
            <br />crafted for your style.
          </p>

          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary hero__cta-primary">
              Shop All Wigs
              <HiArrowRight size={18} />
            </Link>
            <Link to="/collections" className="btn btn-outline">
              View Collections
            </Link>
          </div>

          {/* Trust bar */}
          <div className="hero__trust">
            <span>✓ 100% Human Hair</span>
            <span>✓ Secure Checkout</span>
            <span>✓ Fast Delivery</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </div>

      {/* Video play/pause control */}
      <button
        className="hero__play-btn"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        {playing ? <HiPause size={16} /> : <HiPlay size={16} />}
      </button>

      {/* Floating stat cards */}
      <div className="hero__stats" aria-hidden="true">
        <div className="hero__stat-card">
          <span className="hero__stat-number">5K+</span>
          <span className="hero__stat-label">Happy Customers</span>
        </div>
        <div className="hero__stat-card">
          <span className="hero__stat-number">100%</span>
          <span className="hero__stat-label">Virgin Hair</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
