import React, { useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiChat, HiCheckCircle } from 'react-icons/hi'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import './Contact.css'

// ── Real contact details ──────────────────────────────────────
const CONTACT = {
  whatsapp: '2347039696648',          // international format, no +
  whatsappDisplay: '+234 703 969 6648',
  instagram: 'https://www.instagram.com/clothcraze1234',
  instagramHandle: '@clothcraze1234',
  facebook: 'https://www.facebook.com/profile.php?id=100074470637399',
  facebookHandle: 'JustHairs on Facebook',
  email: 'preciouschiokwuka@gmail.com',
  location: 'Lagos, Nigeria',
}

const FAQS = [
  {
    q: 'How do I track my order?',
    a: 'Send your order reference number on WhatsApp and we will update you within 1 hour during business hours (9am – 7pm).',
  },
  {
    q: 'How long does delivery take?',
    a: 'Lagos: same day or next day. Other states: 2–5 business days. Express delivery is also available at checkout.',
  },
  {
    q: 'Can I return or exchange my wig?',
    a: 'Yes — we accept returns within 7 days of delivery. The wig must be unworn and in its original packaging. Contact us on WhatsApp to start a return.',
  },
  {
    q: 'Are your wigs 100% human hair?',
    a: 'Yes. Every wig we sell is made from 100% virgin human hair. No synthetic blends.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. All payments are processed by Paystack, one of Africa\'s most trusted payment processors. We never store your card details.',
  },
]

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Opens WhatsApp with the message pre-filled
    const text = `Hi JustHairs! My name is ${form.name}.\n\nSubject: ${form.subject}\n\n${form.message}\n\nEmail: ${form.email}`
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="contact">
      {/* Hero */}
      <div className="contact__hero">
        <div className="container contact__hero-inner">
          <p className="section-label">We're here for you</p>
          <h1 className="contact__hero-title">Contact Us</h1>
          <p className="contact__hero-sub">
            Questions about your order? Want to know if your wig is on the way?
            <br />Reach us directly — we respond fast.
          </p>
        </div>
      </div>

      <div className="container contact__body">

        {/* ── Top: quick contact cards ── */}
        <div className="contact__cards">

          {/* WhatsApp — most prominent */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card contact__card--whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <div className="contact__card-icon">
              <FaWhatsapp size={32} />
            </div>
            <div className="contact__card-info">
              <h3 className="contact__card-title">WhatsApp</h3>
              <p className="contact__card-value">{CONTACT.whatsappDisplay}</p>
              <p className="contact__card-action">Tap to chat instantly →</p>
            </div>
            <div className="contact__card-badge">Fastest response</div>
          </a>

          {/* Instagram */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card contact__card--instagram"
            aria-label="Follow on Instagram"
          >
            <div className="contact__card-icon">
              <FaInstagram size={32} />
            </div>
            <div className="contact__card-info">
              <h3 className="contact__card-title">Instagram</h3>
              <p className="contact__card-value">{CONTACT.instagramHandle}</p>
              <p className="contact__card-action">DM us on Instagram →</p>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card contact__card--facebook"
            aria-label="Find us on Facebook"
          >
            <div className="contact__card-icon">
              <FaFacebook size={32} />
            </div>
            <div className="contact__card-info">
              <h3 className="contact__card-title">Facebook</h3>
              <p className="contact__card-value">{CONTACT.facebookHandle}</p>
              <p className="contact__card-action">Message us on Facebook →</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="contact__card contact__card--email"
            aria-label="Send an email"
          >
            <div className="contact__card-icon">
              <HiMail size={32} />
            </div>
            <div className="contact__card-info">
              <h3 className="contact__card-title">Email</h3>
              <p className="contact__card-value">{CONTACT.email}</p>
              <p className="contact__card-action">Send us an email →</p>
            </div>
          </a>

        </div>

        {/* ── Order tracking banner ── */}
        <div className="contact__track">
          <div className="contact__track-left">
            <HiChat size={28} />
            <div>
              <h2 className="contact__track-title">Track Your Order</h2>
              <p className="contact__track-desc">
                Send your <strong>order reference number</strong> on WhatsApp and we'll
                tell you exactly where your wig is — usually within 1 hour.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hi! I want to track my order. My reference number is: ')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary contact__track-btn"
          >
            <FaWhatsapp size={18} />
            Track My Order on WhatsApp
          </a>
        </div>

        {/* ── Middle: form + info ── */}
        <div className="contact__main">

          {/* Contact form */}
          <div className="contact__form-wrap">
            <h2 className="contact__section-title">Send Us a Message</h2>
            <p className="contact__section-sub">
              Fill the form below and it will open WhatsApp with your message pre-filled — so we can reply fast.
            </p>

            {sent && (
              <div className="contact__success">
                <HiCheckCircle size={20} />
                <span>WhatsApp opened! We'll reply shortly.</span>
              </div>
            )}

            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__field-row">
                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">Your Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="e.g. Adaeze Johnson"
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email" className="contact__label">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="subject" className="contact__label">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="contact__input contact__select"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Order tracking">Order tracking</option>
                  <option value="Payment issue">Payment issue</option>
                  <option value="Returns & exchanges">Returns & exchanges</option>
                  <option value="Product question">Product question</option>
                  <option value="Wholesale enquiry">Wholesale enquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="message" className="contact__label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="contact__input contact__textarea"
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                <FaWhatsapp size={18} />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="contact__sidebar">
            <div className="contact__info-card">
              <h3 className="contact__info-title">Business Hours</h3>
              <ul className="contact__hours">
                <li><span>Monday – Friday</span><span>9:00am – 7:00pm</span></li>
                <li><span>Saturday</span><span>10:00am – 6:00pm</span></li>
                <li><span>Sunday</span><span>12:00pm – 5:00pm</span></li>
              </ul>
              <p className="contact__hours-note">
                WhatsApp messages outside business hours are answered the next morning.
              </p>
            </div>

            <div className="contact__info-card">
              <h3 className="contact__info-title">Location</h3>
              <div className="contact__location">
                <HiLocationMarker size={18} />
                <span>{CONTACT.location}</span>
              </div>
              <p className="contact__hours-note">
                We ship nationwide across Nigeria. Same-day dispatch for Lagos orders placed before 2pm.
              </p>
            </div>

            <div className="contact__info-card contact__info-card--social">
              <h3 className="contact__info-title">Follow Us</h3>
              <p className="contact__hours-note" style={{ marginBottom: '1rem' }}>
                See our latest styles, tutorials and customer looks.
              </p>
              <div className="contact__social-links">
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="contact__social-btn contact__social-btn--ig">
                  <FaInstagram size={20} />
                  <span>Instagram</span>
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="contact__social-btn contact__social-btn--fb">
                  <FaFacebook size={20} />
                  <span>Facebook</span>
                </a>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact__social-btn contact__social-btn--wa">
                  <FaWhatsapp size={20} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQs ── */}
        <div className="contact__faq">
          <h2 className="contact__section-title">Frequently Asked Questions</h2>
          <div className="contact__faq-list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`contact__faq-item${openFaq === i ? ' contact__faq-item--open' : ''}`}
              >
                <button
                  className="contact__faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="contact__faq-chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="contact__faq-a">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="contact__faq-cta">
            <p>Still have a question not answered here?</p>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaWhatsapp size={18} />
              Chat With Us on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
