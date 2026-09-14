import React, { useState } from 'react'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { REVIEWS } from '../../utils/products'
import './SocialProof.css'

const StarRating = ({ rating }) => (
  <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <HiStar key={i} size={14} color={i < rating ? '#c9a96e' : '#333'} />
    ))}
  </div>
)

const SocialProof = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () =>
    setActiveIndex(i => (i - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () =>
    setActiveIndex(i => (i + 1) % REVIEWS.length)

  return (
    <section className="social-proof section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="social-proof__header">
          <p className="section-label">Real Reviews</p>
          <h2 className="section-title" id="reviews-heading">
            Customer Looks
          </h2>
          <p className="section-subtitle">
            Don't take our word for it — here's what our queens are saying.
          </p>
        </div>

        {/* Instagram-style photo grid */}
        <div className="social-proof__gallery">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={`social-proof__photo${activeIndex === i ? ' social-proof__photo--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveIndex(i)}
              aria-label={`View review from ${review.name}`}
            >
              <div className="social-proof__photo-img img-placeholder">
                {/* 📸 ADD: review.image — customer or model photo showing the wig */}
                {review.image ? (
                  <img src={review.image} alt={`${review.name} wearing ${review.product}`} />
                ) : (
                  <span className="social-proof__photo-hint">📸 Customer Photo</span>
                )}
              </div>
              <div className="social-proof__photo-overlay">
                <StarRating rating={review.rating} />
                <p className="social-proof__photo-name">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured testimonial slider */}
        <div className="social-proof__testimonial">
          <div className="social-proof__quote-mark">"</div>

          <div className="social-proof__review-content" key={activeIndex}>
            <StarRating rating={REVIEWS[activeIndex].rating} />
            <blockquote className="social-proof__quote">
              {REVIEWS[activeIndex].text}
            </blockquote>
            <div className="social-proof__reviewer">
              <div className="social-proof__reviewer-avatar img-placeholder">
                {/* 📸 ADD: REVIEWS[activeIndex].image */}
                {REVIEWS[activeIndex].image ? (
                  <img
                    src={REVIEWS[activeIndex].image}
                    alt={REVIEWS[activeIndex].name}
                  />
                ) : (
                  <span>{REVIEWS[activeIndex].name.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="social-proof__reviewer-name">{REVIEWS[activeIndex].name}</p>
                <p className="social-proof__reviewer-location">
                  {REVIEWS[activeIndex].location} · {REVIEWS[activeIndex].product}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="social-proof__nav">
            <button
              className="social-proof__nav-btn"
              onClick={prev}
              aria-label="Previous review"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="social-proof__dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`social-proof__dot${activeIndex === i ? ' social-proof__dot--active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="social-proof__nav-btn"
              onClick={next}
              aria-label="Next review"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
