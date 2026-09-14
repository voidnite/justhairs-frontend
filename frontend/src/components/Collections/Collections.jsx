import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { COLLECTIONS, PRODUCTS } from '../../utils/products'
import './Collections.css'

const Collections = () => {
  const humanHairProducts = PRODUCTS.filter(p => p.category === 'human-hair').slice(0, 6)
  const hdLaceProducts    = PRODUCTS.filter(p => p.category === 'hd-lace')
  const gluelessProducts  = PRODUCTS.filter(p => p.category === 'glueless')
  const bobProducts       = PRODUCTS.filter(p => p.category === 'bob-wigs')
  const longProducts      = PRODUCTS.filter(p => p.category === 'long-wigs')
  const curlyProducts     = PRODUCTS.filter(p => p.category === 'curly')
  const bodyWaveProducts  = PRODUCTS.filter(p => p.category === 'body-wave')

  // Collections that are truly coming soon (no products yet)
  const comingSoon = COLLECTIONS.filter(c =>
    !['human-hair','hd-lace','glueless','bob-wigs','long-wigs','curly','body-wave'].includes(c.id)
  )

  return (
    <section className="collections section" aria-labelledby="collections-heading">
      <div className="container">
        <div className="collections__header">
          <div>
            <p className="section-label">Explore</p>
            <h2 className="section-title" id="collections-heading">
              Shop by Collection
            </h2>
            <p className="section-subtitle">
              100% human hair wigs crafted for your style.
            </p>
          </div>
          <Link to="/shop" className="btn btn-ghost collections__view-all">
            View All <HiArrowRight size={14} />
          </Link>
        </div>

        {/* ── Human Hair featured collection ── */}
        <div className="collections__featured">
          <Link to="/shop?collection=human-hair" className="collections__label-card">
            <div className="collections__label-img img-placeholder">
              {COLLECTIONS[0].coverImage ? (
                <img src={COLLECTIONS[0].coverImage} alt="Human Hair Collection" />
              ) : (
                <span>Human Hair</span>
              )}
            </div>
            <div className="collections__label-info">
              <p className="collections__label-tag">Collection</p>
              <h3 className="collections__label-title">Human Hair</h3>
              <p className="collections__label-sub">Naturally sourced, silky & durable</p>
              <p className="collections__label-count">{PRODUCTS.filter(p => p.category === 'human-hair').length} styles available</p>
              <span className="collections__label-btn">Shop Now <HiArrowRight size={14} /></span>
            </div>
          </Link>

          <div className="collections__product-grid">
            {humanHairProducts.map(product => (
              <Link key={product._id} to={`/product/${product.slug}`} className="collections__product-card">
                <div className="collections__product-img img-placeholder">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} loading="lazy" />
                  ) : product.video ? (
                    <video src={product.video} autoPlay muted loop playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <span>📸</span>
                  )}
                  {product.badge && (
                    <span className={`collections__product-badge badge--${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="collections__product-info">
                  <p className="collections__product-name">{product.name}</p>
                  <p className="collections__product-price">₦{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── HD Lace collection ── */}
        {hdLaceProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Premium</p>
                <h3 className="collections__hd-title">HD Lace Collection</h3>
                <p className="collections__hd-sub">Invisible hairline, flawless finish. 100% human hair factory made.</p>
              </div>
              <Link to="/shop?collection=hd-lace" className="btn btn-ghost">
                Shop HD Lace <HiArrowRight size={14} />
              </Link>
            </div>

            <div className="collections__hd-grid">
              {hdLaceProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.video ? (
                      <video
                        src={product.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="collections__hd-video"
                        aria-label={product.name}
                      />
                    ) : product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">▶ Watch</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">
                      {product.variants?.lengths?.join('  ·  ')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Glueless collection ── */}
        {gluelessProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Glueless</p>
                <h3 className="collections__hd-title">Glueless Collection</h3>
                <p className="collections__hd-sub">Install in minutes, no glue needed. Finest premium Futura quality.</p>
              </div>
              <Link to="/shop?collection=glueless" className="btn btn-ghost">
                Shop Glueless <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="collections__hd-grid">
              {gluelessProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.video ? (
                      <video
                        src={product.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="collections__hd-video"
                        aria-label={product.name}
                      />
                    ) : product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">▶ Watch</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">
                      {product.variants?.lengths?.join('  ·  ')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Bob Wigs collection ── */}
        {bobProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Bob Wigs</p>
                <h3 className="collections__hd-title">Bob Wigs Collection</h3>
                <p className="collections__hd-sub">Short, chic & effortlessly sleek. 100% human hair factory made.</p>
              </div>
              <Link to="/shop?collection=bob-wigs" className="btn btn-ghost">
                Shop Bob Wigs <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="collections__bob-grid">
              {bobProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : product.video ? (
                      <video src={product.video} autoPlay muted loop playsInline className="collections__hd-video" aria-label={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">{product.video && !product.images?.[0] ? '▶ Watch' : '🛍 View'}</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">{product.variants?.lengths?.join('  ·  ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Long Wigs collection ── */}
        {longProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Long Wigs</p>
                <h3 className="collections__hd-title">Long Wigs Collection</h3>
                <p className="collections__hd-sub">Floor-length glamour & volume. Premium quality hair.</p>
              </div>
              <Link to="/shop?collection=long-wigs" className="btn btn-ghost">
                Shop Long Wigs <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="collections__bob-grid">
              {longProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : product.video ? (
                      <video src={product.video} autoPlay muted loop playsInline className="collections__hd-video" aria-label={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">{product.video && !product.images?.[0] ? '▶ Watch' : '🛍 View'}</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">{product.variants?.lengths?.join('  ·  ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Curly Wigs collection ── */}
        {curlyProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Curly Wigs</p>
                <h3 className="collections__hd-title">Curly Wigs Collection</h3>
                <p className="collections__hd-sub">Defined curls with natural bounce. 100% human hair factory made.</p>
              </div>
              <Link to="/shop?collection=curly" className="btn btn-ghost">
                Shop Curly Wigs <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="collections__bob-grid">
              {curlyProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : product.video ? (
                      <video src={product.video} autoPlay muted loop playsInline className="collections__hd-video" aria-label={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">{product.video && !product.images?.[0] ? '▶ Watch' : '🛍 View'}</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">{product.variants?.lengths?.join('  ·  ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Body Wave collection ── */}
        {bodyWaveProducts.length > 0 && (
          <div className="collections__hd-lace">
            <div className="collections__hd-header">
              <div>
                <p className="section-label">Body Wave</p>
                <h3 className="collections__hd-title">Body Wave Collection</h3>
                <p className="collections__hd-sub">Soft S-shaped waves with natural movement. 100% human hair factory made.</p>
              </div>
              <Link to="/shop?collection=body-wave" className="btn btn-ghost">
                Shop Body Wave <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="collections__bob-grid">
              {bodyWaveProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="collections__hd-card">
                  <div className="collections__hd-media">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : product.video ? (
                      <video src={product.video} autoPlay muted loop playsInline className="collections__hd-video" aria-label={product.name} />
                    ) : (
                      <div className="img-placeholder" style={{ width:'100%', height:'100%' }} />
                    )}
                    {product.badge && (
                      <span className="collections__hd-badge">{product.badge}</span>
                    )}
                    <div className="collections__hd-overlay">
                      <span className="collections__hd-play">▶ Watch</span>
                    </div>
                  </div>
                  <div className="collections__hd-info">
                    <p className="collections__hd-name">{product.name}</p>
                    <p className="collections__hd-price">₦{product.price.toLocaleString()}</p>
                    <p className="collections__hd-lengths">{product.variants?.lengths?.join('  ·  ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Coming soon ── */}
        {comingSoon.length > 0 && (
          <div className="collections__coming-soon-wrap">
            <p className="collections__coming-soon-label">More collections coming soon</p>
            <div className="collections__coming-soon-grid">
              {comingSoon.map(col => (
                <div key={col.id} className="collections__coming-soon-card">
                  <div className="collections__coming-soon-img img-placeholder">
                    {col.coverImage ? (
                      <img src={col.coverImage} alt={col.title} />
                    ) : (
                      <span className="collections__coming-soon-icon">✨</span>
                    )}
                    <div className="collections__coming-soon-overlay">
                      <span>Coming Soon</span>
                    </div>
                  </div>
                  <p className="collections__coming-soon-title">{col.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Collections
