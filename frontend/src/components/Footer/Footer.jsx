import React from 'react'
import { Link } from 'react-router-dom'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa'
import './Footer.css'

const WHATSAPP = 'https://wa.me/2347039696648'
const INSTAGRAM = 'https://www.instagram.com/clothcraze1234'
const FACEBOOK = 'https://www.facebook.com/profile.php?id=100074470637399'
const EMAIL = 'preciouschiokwuka@gmail.com'
const PHONE = '+234 703 969 6648'

const SHOP_LINKS = [
  { label: 'All Wigs', href: '/shop' },
  { label: 'Human Hair', href: '/shop?collection=human-hair' },
  { label: 'HD Lace Wigs', href: '/shop?collection=hd-lace' },
  { label: 'Glueless Wigs', href: '/shop?collection=glueless' },
  { label: 'Bob Wigs', href: '/shop?collection=bob' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
]

const INFO_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track My Order', href: `${WHATSAPP}?text=${encodeURIComponent('Hi! I want to track my order. My reference number is: ')}`, external: true },
]

const SOCIALS = [
  { icon: <FaInstagram size={18} />, href: INSTAGRAM, label: 'Instagram' },
  { icon: <FaFacebook size={18} />, href: FACEBOOK, label: 'Facebook' },
  { icon: <FaWhatsapp size={18} />, href: WHATSAPP, label: 'WhatsApp' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      {/* CTA banner */}
      <div className="footer__cta">
        <div className="container footer__cta-inner">
          <div className="footer__cta-text">
            <h3 className="footer__cta-title">Find Your Perfect Crown</h3>
            <p className="footer__cta-sub">
              Questions about your order? Chat us on WhatsApp — we respond fast.
            </p>
          </div>
          <div className="footer__cta-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop All Wigs
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FaWhatsapp size={16} /> Chat with Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__grid">

          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>Just</span><span className="text-gold">Hairs</span>
            </Link>
            <p className="footer__tagline">
              Premium human-hair wigs, bundles & closures crafted for your style.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Shop</h4>
            <ul className="footer__links">
              {SHOP_LINKS.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Information</h4>
            <ul className="footer__links">
              {INFO_LINKS.map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="footer__link">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.href} className="footer__link">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Contact</h4>
            <ul className="footer__contact-list">
              <li>
                <FaWhatsapp size={15} color="#25d366" />
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="footer__contact-link">
                  {PHONE}
                </a>
              </li>
              <li>
                <HiMail size={15} />
                <a href={`mailto:${EMAIL}`} className="footer__contact-link">{EMAIL}</a>
              </li>
              <li>
                <FaInstagram size={15} color="#e1306c" />
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="footer__contact-link">
                  @clothcraze1234
                </a>
              </li>
              <li>
                <HiLocationMarker size={15} />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <p className="footer__newsletter-label">Get 10% off your first order</p>
              <form
                className="footer__newsletter-form"
                onSubmit={e => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="footer__newsletter-input"
                  aria-label="Email address"
                  required
                />
                <button type="submit" className="footer__newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} JustHairs. All rights reserved.
          </p>
          <div className="footer__payment-icons">
            <span className="footer__payment-badge">Paystack</span>
            <span className="footer__payment-badge">Visa</span>
            <span className="footer__payment-badge">Mastercard</span>
            <span className="footer__payment-badge">Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
