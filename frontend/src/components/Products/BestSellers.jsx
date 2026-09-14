import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import ProductCard from '../common/ProductCard'
import { BEST_SELLERS, PRODUCTS } from '../../utils/products'
import './BestSellers.css'

const BestSellers = () => {
  // Show best sellers first, fill remaining with other products up to 4
  const display = [
    ...BEST_SELLERS,
    ...PRODUCTS.filter(p => !p.isBestSeller),
  ].slice(0, 4)

  return (
    <section className="best-sellers section" aria-labelledby="bestsellers-heading">
      <div className="container">
        <div className="best-sellers__header">
          <div>
            <p className="section-label">Customer Favourites</p>
            <h2 className="section-title" id="bestsellers-heading">
              Best Sellers
            </h2>
            <p className="section-subtitle">
              Our most-loved wigs — chosen by thousands of happy customers.
            </p>
          </div>
          <Link to="/shop?filter=bestseller" className="btn btn-ghost best-sellers__view-all">
            Shop All <HiArrowRight size={14} />
          </Link>
        </div>

        <div className="best-sellers__grid">
          {display.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
