import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft, HiLockClosed, HiShieldCheck } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { initializePayment, createOrder } from '../utils/api'
import toast from 'react-hot-toast'
import './Checkout.css'

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT (Abuja)','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara',
]

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', price: 3500 },
  { id: 'express', label: 'Express Delivery', desc: '1–2 business days', price: 6500 },
  { id: 'pickup', label: 'Store Pickup', desc: 'Lagos Island only', price: 0 },
]

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    deliveryOption: 'standard',
  })

  const [errors, setErrors] = useState({})

  const delivery = DELIVERY_OPTIONS.find(o => o.id === form.deliveryOption)
  const deliveryFee = delivery?.price || 0
  const total = subtotal + deliveryFee

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Required'
    if (!form.lastName.trim()) newErrors.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Valid phone required'
    if (!form.address.trim()) newErrors.address = 'Required'
    if (!form.city.trim()) newErrors.city = 'Required'
    if (!form.state) newErrors.state = 'Required'
    return newErrors
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (items.length === 0) { toast.error('Your cart is empty'); return }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // 1. Create order in DB
      const orderPayload = {
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          address: form.address,
          city: form.city,
          state: form.state,
        },
        items: items.map(i => ({
          productId: i.product._id,
          name: i.product.name,
          variant: i.variant,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal,
        deliveryFee,
        total,
        deliveryOption: form.deliveryOption,
      }

      const { data: orderData } = await createOrder(orderPayload)
      const orderId = orderData.order._id

      // 2. Initialize Paystack
      const { data: payData } = await initializePayment({
        email: form.email,
        amount: total,
        orderId,
        metadata: {
          customerName: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
        },
      })

      // 3. Redirect to Paystack hosted page
      if (payData.authorization_url) {
        clearCart()
        window.location.href = payData.authorization_url
      } else {
        throw new Error('Could not get payment URL')
      }
    } catch (err) {
      toast.error(err.message || 'Payment initialization failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary">Browse Wigs</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="container checkout__inner">
        {/* Header */}
        <div className="checkout__header">
          <Link to="/shop" className="checkout__back">
            <HiArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
          <div className="checkout__logo">
            Just<span className="text-gold">Hairs</span>
          </div>
          <div className="checkout__secure">
            <HiLockClosed size={14} />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="checkout__layout">
          {/* Left: form */}
          <form className="checkout__form" onSubmit={handlePayment} noValidate>
            {/* Contact info */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Contact Information</h2>
              <div className="checkout__fields">
                <div className="checkout__field-group">
                  <FormField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
                  <FormField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} required />
                </div>
                <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+234 800 000 0000" required />
              </div>
            </div>

            {/* Shipping */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Shipping Address</h2>
              <div className="checkout__fields">
                <FormField label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} required />
                <div className="checkout__field-group">
                  <FormField label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} required />
                  <div className="checkout__field">
                    <label className="checkout__label">
                      State <span className="checkout__required">*</span>
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`checkout__input checkout__select${errors.state ? ' checkout__input--error' : ''}`}
                      required
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="checkout__error-msg">{errors.state}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery options */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Delivery Option</h2>
              <div className="checkout__delivery-options">
                {DELIVERY_OPTIONS.map(opt => (
                  <label
                    key={opt.id}
                    className={`checkout__delivery-option${form.deliveryOption === opt.id ? ' checkout__delivery-option--active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="deliveryOption"
                      value={opt.id}
                      checked={form.deliveryOption === opt.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="checkout__delivery-info">
                      <span className="checkout__delivery-label">{opt.label}</span>
                      <span className="checkout__delivery-desc">{opt.desc}</span>
                    </div>
                    <span className="checkout__delivery-price">
                      {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pay button (mobile) */}
            <div className="checkout__pay-mobile">
              <PayButton loading={loading} total={total} />
            </div>
          </form>

          {/* Right: order summary */}
          <div className="checkout__summary">
            <h2 className="checkout__section-title">Order Summary</h2>

            <div className="checkout__items">
              {items.map(item => (
                <div key={item.key} className="checkout__item">
                  <div className="checkout__item-img img-placeholder">
                    {item.product.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product.name} />
                    ) : null}
                    <span className="checkout__item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout__item-info">
                    <p className="checkout__item-name">{item.product.name}</p>
                    {item.variant && (
                      <p className="checkout__item-variant">
                        {[item.variant.length, item.variant.color].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <p className="checkout__item-price">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="checkout__totals">
              <div className="checkout__total-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="checkout__total-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="checkout__total-divider" />
              <div className="checkout__total-row checkout__total-row--total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <PayButton loading={loading} total={total} onClick={handlePayment} />

            {/* Paystack trust badge */}
            <div className="checkout__paystack-badge">
              <HiShieldCheck size={14} />
              <span>Secured by <strong>Paystack</strong> — your payment is 100% encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FormField = ({ label, name, type = 'text', value, onChange, error, placeholder, required }) => (
  <div className="checkout__field">
    <label htmlFor={name} className="checkout__label">
      {label} {required && <span className="checkout__required">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`checkout__input${error ? ' checkout__input--error' : ''}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="checkout__error-msg">{error}</p>}
  </div>
)

const PayButton = ({ loading, total, onClick }) => (
  <button
    type={onClick ? 'button' : 'submit'}
    className="btn btn-primary checkout__pay-btn"
    disabled={loading}
    onClick={onClick}
  >
    {loading ? (
      <span className="checkout__spinner" />
    ) : (
      <>
        <HiLockClosed size={16} />
        Pay {formatPrice(total)} via Paystack
      </>
    )}
  </button>
)

export default Checkout
