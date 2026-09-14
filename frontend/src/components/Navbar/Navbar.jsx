import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineSearch, HiMenu, HiX } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Best Sellers', href: '/shop?filter=bestseller' },
  { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems, setIsOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--open' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-just">Just</span>
            <span className="navbar__logo-hairs">Hairs</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`navbar__link${location.pathname === link.href ? ' navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(s => !s)}
            >
              <HiOutlineSearch size={20} />
            </button>

            {/* WhatsApp quick contact */}
            <a
              href="https://wa.me/2347039696648"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__icon-btn navbar__whatsapp-btn"
              aria-label="Chat on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>

            <Link to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
              <HiOutlineHeart size={20} />
            </Link>

            <button
              className="navbar__icon-btn navbar__cart-btn"
              aria-label={`Cart (${totalItems} items)`}
              onClick={() => setIsOpen(true)}
            >
              <HiOutlineShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="navbar__cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>
              )}
            </button>

            <button
              className="navbar__mobile-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(s => !s)}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="navbar__search">
            <div className="container">
              <div className="navbar__search-inner">
                <HiOutlineSearch size={18} className="navbar__search-icon" />
                <input
                  type="text"
                  placeholder="Search wigs, textures, lengths…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="navbar__search-input"
                  autoFocus
                />
                <button className="navbar__search-close" onClick={() => setSearchOpen(false)}>
                  <HiX size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          <nav>
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href} className="navbar__mobile-link">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="navbar__mobile-footer">
            <Link to="/cart" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              View Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  )
}

export default Navbar
