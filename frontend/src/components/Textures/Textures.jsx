import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TEXTURES } from '../../utils/products'
import './Textures.css'

const Textures = () => {
  const [active, setActive] = useState(TEXTURES[0].id)
  const activeTexture = TEXTURES.find(t => t.id === active)

  return (
    <section className="textures section" aria-labelledby="textures-heading">
      <div className="container">
        <div className="textures__header">
          <p className="section-label">Find Your Style</p>
          <h2 className="section-title" id="textures-heading">
            Shop by Texture
          </h2>
          <p className="section-subtitle">
            Every texture tells a story. Which one is yours?
          </p>
        </div>

        <div className="textures__layout">
          {/* Tab list */}
          <div className="textures__tabs" role="tablist" aria-label="Hair textures">
            {TEXTURES.map(texture => (
              <button
                key={texture.id}
                role="tab"
                aria-selected={active === texture.id}
                aria-controls={`texture-panel-${texture.id}`}
                className={`textures__tab${active === texture.id ? ' textures__tab--active' : ''}`}
                onClick={() => setActive(texture.id)}
              >
                <span className="textures__tab-label">{texture.label}</span>
                <span className="textures__tab-desc">{texture.description}</span>
              </button>
            ))}
          </div>

          {/* Preview panel */}
          <div
            id={`texture-panel-${active}`}
            role="tabpanel"
            className="textures__panel"
            key={active}
          >
            <div className="textures__panel-img img-placeholder">
              {/* 📸 ADD: activeTexture.coverImage — texture close-up or model photo */}
              {activeTexture?.coverImage ? (
                <img
                  src={activeTexture.coverImage}
                  alt={`${activeTexture.label} texture`}
                />
              ) : (
                <div className="textures__panel-placeholder">
                  <span className="textures__panel-emoji">📸</span>
                  <span className="textures__panel-hint">
                    Add {activeTexture?.label} texture photo
                  </span>
                </div>
              )}
            </div>

            {/* Panel info */}
            <div className="textures__panel-info">
              <h3 className="textures__panel-title">{activeTexture?.label}</h3>
              <p className="textures__panel-desc">{activeTexture?.description}</p>
              <Link
                to={`/shop?texture=${active}`}
                className="btn btn-primary textures__shop-btn"
              >
                Shop {activeTexture?.label} Wigs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Textures
