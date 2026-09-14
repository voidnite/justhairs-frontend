import React from 'react'
import {
  HiSparkles,
  HiShieldCheck,
  HiTruck,
  HiRefresh,
  HiStar,
  HiPhone,
} from 'react-icons/hi'
import './WhyUs.css'

const PERKS = [
  {
    icon: <HiSparkles size={28} />,
    title: '100% Human Hair',
    desc: 'Every wig is crafted from 100% virgin, unprocessed human hair. No synthetic blends — ever.',
  },
  {
    icon: <HiShieldCheck size={28} />,
    title: 'Premium Quality Lace',
    desc: 'HD Swiss lace that melts seamlessly into all skin tones for an undetectable finish.',
  },
  {
    icon: <HiTruck size={28} />,
    title: 'Fast Nationwide Delivery',
    desc: 'Same-day dispatch in Lagos, 2–5 days everywhere else in Nigeria. Tracked shipping included.',
  },
  {
    icon: <HiShieldCheck size={28} />,
    title: 'Secure Checkout',
    desc: 'Powered by Paystack — your payment is fully encrypted and 100% secure.',
  },
  {
    icon: <HiRefresh size={28} />,
    title: '7-Day Returns',
    desc: 'Not satisfied? Return within 7 days for a full refund or exchange. No hassle.',
  },
  {
    icon: <HiPhone size={28} />,
    title: 'Dedicated Support',
    desc: 'Our hair experts are available on WhatsApp and live chat 7 days a week.',
  },
]

const STATS = [
  { number: '5,000+', label: 'Happy Customers' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '200+', label: 'Products' },
  { number: '4.9★', label: 'Average Rating' },
]

const WhyUs = () => {
  return (
    <section className="why-us section" aria-labelledby="why-us-heading">
      <div className="container">
        <div className="why-us__header">
          <p className="section-label">The JustHairs Difference</p>
          <h2 className="section-title" id="why-us-heading">
            Why Choose Us
          </h2>
          <p className="section-subtitle">
            We don't just sell wigs — we help you find your perfect crown.
          </p>
        </div>

        {/* Stats banner */}
        <div className="why-us__stats">
          {STATS.map((s, i) => (
            <div key={i} className="why-us__stat">
              <span className="why-us__stat-number">{s.number}</span>
              <span className="why-us__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Perks grid */}
        <div className="why-us__grid">
          {PERKS.map((perk, i) => (
            <div key={i} className="why-us__card">
              <div className="why-us__card-icon">{perk.icon}</div>
              <h3 className="why-us__card-title">{perk.title}</h3>
              <p className="why-us__card-desc">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
