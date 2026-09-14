import React from 'react'
import { Link } from 'react-router-dom'
import {
  HiX, HiOutlineShoppingBag, HiPlus, HiMinus, HiTrash,
} from 'react-icons/hi'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/format'
import './CartDrawer.css'

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="cart-backdrop"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="cart-drawer" aria-label="Shopping cart" role="complementary">
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-wrap">
            <HiOutlineShoppingBag size={20} />
            <h2 className="cart-drawer__title">Your Cart</h2>
            {totalItems > 0 && (
              <span className="cart-drawer__count">{totalItems}</span>
            )}
          </div>
          <button
            className="cart-drawer__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <HiX size={22} />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && (
          <div className="cart-drawer__shipping-bar">
            {subtotal >= 100000 ? (
              <p className="cart-drawer__shipping-text cart-drawer__shipping-text--done">
                🎉 You qualify for free shipping!
              </p>
            ) : (
              <>
                <p className="cart-drawer__shipping-text">
                  Add <strong>{formatPrice(100000 - subtotal)}</strong> more for free shipping
                </p>
                <div className="cart-drawer__shipping-track">
                  <div
                    className="cart-drawer__shipping-fill"
                    style={{ width: `${Math.min((subtotal / 100000) * 100, 100)}%` }}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Items */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <HiOutlineShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <CartItem
                key={item.key}
                item={item}
                onRemove={() => removeItem(item.key)}
                onUpdateQty={qty => updateQuantity(item.key, qty)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span className="cart-drawer__subtotal-amount">{formatPrice(subtotal)}</span>
            </div>
            <p className="cart-drawer__tax-note">Shipping & taxes calculated at checkout</p>

            <Link
              to="/checkout"
              className="btn btn-primary cart-drawer__checkout-btn"
              onClick={() => setIsOpen(false)}
            >
              Proceed to Checkout
            </Link>

            <button
              className="cart-drawer__continue"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

const CartItem = ({ item, onRemove, onUpdateQty }) => {
  const { product, variant, quantity, price } = item

  return (
    <div className="cart-item">
      {/* Image */}
      <div className="cart-item__img img-placeholder">
        {/* 📸 product.images[0] */}
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <span>📸</span>
        )}
      </div>

      {/* Info */}
      <div className="cart-item__info">
        <p className="cart-item__name">{product.name}</p>
        {variant && (
          <p className="cart-item__variant">
            {[variant.length, variant.color].filter(Boolean).join(' · ')}
          </p>
        )}
        <p className="cart-item__price">{formatPrice(price * quantity)}</p>

        {/* Quantity controls */}
        <div className="cart-item__controls">
          <div className="cart-item__qty">
            <button
              className="cart-item__qty-btn"
              onClick={() => onUpdateQty(quantity - 1)}
              aria-label="Decrease"
            >
              <HiMinus size={12} />
            </button>
            <span>{quantity}</span>
            <button
              className="cart-item__qty-btn"
              onClick={() => onUpdateQty(quantity + 1)}
              aria-label="Increase"
            >
              <HiPlus size={12} />
            </button>
          </div>
          <button
            className="cart-item__remove"
            onClick={onRemove}
            aria-label={`Remove ${product.name}`}
          >
            <HiTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
