import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  HiCheckCircle, HiXCircle, HiClock, HiArrowRight, HiShoppingBag,
} from 'react-icons/hi'
import { verifyPayment } from '../utils/api'
import { formatPrice } from '../utils/format'
import './OrderConfirmation.css'

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference') || searchParams.get('trxref')

  const [status, setStatus] = useState('loading') // loading | success | failed
  const [order, setOrder] = useState(null)
  const [paymentData, setPaymentData] = useState(null)

  useEffect(() => {
    if (!reference) {
      setStatus('failed')
      return
    }

    const verify = async () => {
      try {
        const { data } = await verifyPayment(reference)
        if (data.status === 'success') {
          setStatus('success')
          setOrder(data.order)
          setPaymentData(data.payment)
        } else {
          setStatus('failed')
        }
      } catch {
        setStatus('failed')
      }
    }

    verify()
  }, [reference])

  if (status === 'loading') {
    return (
      <div className="order-confirm order-confirm--loading">
        <div className="order-confirm__spinner-wrap">
          <div className="order-confirm__spinner" />
          <p>Verifying your payment…</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="order-confirm">
        <div className="container order-confirm__inner">
          <div className="order-confirm__icon order-confirm__icon--fail">
            <HiXCircle size={64} />
          </div>
          <h1 className="order-confirm__title">Payment Not Verified</h1>
          <p className="order-confirm__subtitle">
            We couldn't verify your payment. If money was deducted from your account,
            please contact us immediately with your reference: <strong>{reference || 'N/A'}</strong>
          </p>
          <div className="order-confirm__actions">
            <Link to="/checkout" className="btn btn-primary">Try Again</Link>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="order-confirm">
      <div className="container order-confirm__inner">
        {/* Success icon */}
        <div className="order-confirm__icon order-confirm__icon--success">
          <HiCheckCircle size={72} />
        </div>

        <h1 className="order-confirm__title">Order Confirmed!</h1>
        <p className="order-confirm__subtitle">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Order summary card */}
        <div className="order-confirm__card">
          <div className="order-confirm__card-header">
            <div>
              <p className="order-confirm__card-label">Order Reference</p>
              <p className="order-confirm__card-value">{reference}</p>
            </div>
            <div className="order-confirm__status-badge">
              <HiClock size={14} />
              Processing
            </div>
          </div>

          {/* Items */}
          {order?.items && order.items.length > 0 && (
            <div className="order-confirm__items">
              {order.items.map((item, i) => (
                <div key={i} className="order-confirm__item">
                  <div className="order-confirm__item-info">
                    <p className="order-confirm__item-name">{item.name}</p>
                    {item.variant && (
                      <p className="order-confirm__item-variant">
                        {[item.variant.length, item.variant.color].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <p className="order-confirm__item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="order-confirm__item-price">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          {order && (
            <div className="order-confirm__totals">
              <div className="order-confirm__total-row">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="order-confirm__total-row">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="order-confirm__total-divider" />
              <div className="order-confirm__total-row order-confirm__total-row--total">
                <span>Total Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          {/* Shipping info */}
          {order?.shippingAddress && (
            <div className="order-confirm__shipping">
              <p className="order-confirm__shipping-label">Delivering to</p>
              <p className="order-confirm__shipping-addr">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
            </div>
          )}
        </div>

        {/* What's next */}
        <div className="order-confirm__next">
          <h2 className="order-confirm__next-title">What happens next?</h2>
          <div className="order-confirm__steps">
            <div className="order-confirm__step">
              <div className="order-confirm__step-num">1</div>
              <div>
                <p className="order-confirm__step-title">Order Confirmed</p>
                <p className="order-confirm__step-desc">You'll receive a confirmation email shortly.</p>
              </div>
            </div>
            <div className="order-confirm__step">
              <div className="order-confirm__step-num">2</div>
              <div>
                <p className="order-confirm__step-title">Processing & Packaging</p>
                <p className="order-confirm__step-desc">We'll carefully package your order within 24 hours.</p>
              </div>
            </div>
            <div className="order-confirm__step">
              <div className="order-confirm__step-num">3</div>
              <div>
                <p className="order-confirm__step-title">Shipped</p>
                <p className="order-confirm__step-desc">You'll get a tracking number once your order ships.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-confirm__actions">
          <Link to="/shop" className="btn btn-primary">
            <HiShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Home <HiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
