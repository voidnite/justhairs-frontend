import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import ProductCard from '../common/ProductCard'
import { NEW_ARRIVALS, PRODUCTS } from '../../utils/products'
import './NewArrivals.css'

const NewArrivals = () => {
  const display = [
    ...NEW_ARRIVALS,
    ...PRODUCTS.filter(p => !p.isNew),
  ].slice(0, 3)

  return (
    <section className="new-arrivals section" aria-labelledby="new-arrivals-heading">
      <div className="container">
        <div className="new-arrivals__header">
          <div>
            <p className="section-label">Just Dropped</p>
            <h2 className="section-title" id="new-arrivals-heading">
              New Arrivals
            </h2>
            <p className="section-subtitle">
              Fresh styles, first to your door.
            </p>
          </div>
          <Link to="/shop?filter=new" className="btn btn-ghost new-arrivals__view-all">
            See All New <HiArrowRight size={14} />
          </Link>
        </div>

        <div className="new-arrivals__grid">
          {/* Large featured card */}
          <div className="new-arrivals__featured">
            <ProductCard product={display[0]} size="large" />
          </div>

          {/* Two smaller cards stacked */}
          <div className="new-arrivals__stack">
            {display.slice(1, 3).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
