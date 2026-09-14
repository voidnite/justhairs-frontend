/**
 * Seed script — run once to populate products in MongoDB
 * Usage: npm run seed
 */
require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/Product')

const PRODUCTS = [
  {
    name: 'HD Lace Body Wave Wig',
    slug: 'hd-lace-body-wave',
    category: 'hd-lace',
    texture: 'body-wave',
    price: 85000,
    comparePrice: 110000,
    rating: 4.9,
    reviewCount: 132,
    badge: 'Best Seller',
    description:
      'Our signature HD Lace Body Wave delivers the most natural-looking hairline on the market. The ultra-thin HD lace melts seamlessly into all skin tones, while the body wave texture gives you effortless volume and movement.',
    features: ['100% Virgin Human Hair', 'HD Swiss Lace', '180% Density', 'Pre-plucked hairline', 'Bleached knots'],
    images: [],   // 📸 Add real image URLs here after uploading
    video: null,
    variants: {
      lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'],
      colors: ['Natural Black', 'Dark Brown', '#613 Blonde'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    name: 'Glueless Straight Lace Front',
    slug: 'glueless-straight-lace-front',
    category: 'glueless',
    texture: 'straight',
    price: 72000,
    comparePrice: 90000,
    rating: 4.8,
    reviewCount: 98,
    badge: 'New',
    description:
      'Install in under 10 minutes with our revolutionary glueless system. Ultra-sleek straight hair that stays silky wash after wash.',
    features: ['Glueless Install', '100% Human Hair', 'Adjustable Bands', '150% Density', 'Natural Hairline'],
    images: [],
    video: null,
    variants: {
      lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
      colors: ['Natural Black', 'Jet Black'],
    },
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    name: 'Deep Wave Closure Wig',
    slug: 'deep-wave-closure',
    category: 'human-hair',
    texture: 'deep-wave',
    price: 65000,
    comparePrice: null,
    rating: 4.7,
    reviewCount: 74,
    badge: null,
    description:
      'Lush, deep wavy texture with a 5×5 lace closure for a natural parting. Maintains its wave pattern even after washing.',
    features: ['5×5 Lace Closure', '100% Human Hair', '150% Density', 'Tangle-Free'],
    images: [],
    video: null,
    variants: {
      lengths: ['12"', '14"', '16"', '18"', '20"'],
      colors: ['Natural Black'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    name: 'Kinky Curly Bob Wig',
    slug: 'kinky-curly-bob',
    category: 'bob-wigs',
    texture: 'kinky-coily',
    price: 58000,
    comparePrice: 70000,
    rating: 4.9,
    reviewCount: 211,
    badge: 'Best Seller',
    description:
      'A bold, defined kinky curly bob that celebrates natural texture. Light, breathable cap with maximum volume.',
    features: ['Kinky Curl Pattern', 'Full Lace', '200% Density', 'Pre-styled'],
    images: [],
    video: null,
    variants: {
      lengths: ['10"', '12"', '14"'],
      colors: ['Natural Black', '#1B Dark Brown'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    name: 'Water Wave Long Wig 24"',
    slug: 'water-wave-long-24',
    category: 'long-wigs',
    texture: 'water-wave',
    price: 98000,
    comparePrice: 120000,
    rating: 4.8,
    reviewCount: 55,
    badge: 'New',
    description:
      'Dramatic 24-inch water wave for a goddess look. Buttery-soft texture with visible luster that catches every light.',
    features: ['24 Inch Length', 'HD Lace Front', '180% Density', 'Water Wave Pattern'],
    images: [],
    video: null,
    variants: {
      lengths: ['22"', '24"', '26"', '28"'],
      colors: ['Natural Black', 'Ombre Brown'],
    },
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    name: 'Loose Wave Glueless Wig',
    slug: 'loose-wave-glueless',
    category: 'glueless',
    texture: 'loose-wave',
    price: 79000,
    comparePrice: null,
    rating: 4.6,
    reviewCount: 43,
    badge: null,
    description:
      'Effortlessly beautiful loose waves in a beginner-friendly glueless construction. Comfortable for all-day wear.',
    features: ['Glueless', '13×4 Lace Front', '150% Density', 'Beginner Friendly'],
    images: [],
    video: null,
    variants: {
      lengths: ['16"', '18"', '20"', '22"'],
      colors: ['Natural Black', 'Medium Brown'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    name: 'Straight HD Full Lace Wig',
    slug: 'straight-hd-full-lace',
    category: 'hd-lace',
    texture: 'straight',
    price: 115000,
    comparePrice: 140000,
    rating: 5.0,
    reviewCount: 28,
    badge: 'Premium',
    description:
      'Our most luxurious piece. Full lace construction allows styling in any direction. Silky bone-straight virgin hair.',
    features: ['Full Lace', 'HD Swiss Lace', '180% Density', 'Virgin Hair', 'Customisable Parting'],
    images: [],
    video: null,
    variants: {
      lengths: ['16"', '18"', '20"', '22"', '24"', '26"'],
      colors: ['Natural Black', 'Jet Black', '#613 Blonde', 'Platinum Blonde'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    name: 'Body Wave Bundle Deal (3 pcs)',
    slug: 'body-wave-bundle-3pcs',
    category: 'human-hair',
    texture: 'body-wave',
    price: 55000,
    comparePrice: 75000,
    rating: 4.7,
    reviewCount: 167,
    badge: 'Bundle',
    description:
      'Three full bundles of 100% virgin body wave hair. Perfect for a sew-in or custom wig build. Tangle-free and shed-free.',
    features: ['3 Bundle Set', '100% Virgin Hair', 'Double Weft', 'Tangle-free', 'Shed-free'],
    images: [],
    video: null,
    variants: {
      lengths: ['14"/16"/18"', '16"/18"/20"', '18"/20"/22"', '20"/22"/24"'],
      colors: ['Natural Black'],
    },
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
    console.log('✅  Connected to MongoDB')

    // Remove existing products
    await Product.deleteMany({})
    console.log('🗑   Cleared existing products')

    // Insert fresh
    const created = await Product.insertMany(PRODUCTS)
    console.log(`🌱  Seeded ${created.length} products`)

    created.forEach(p => console.log(`   ✓ ${p.name}  (${p.slug})`))
  } catch (err) {
    console.error('❌  Seed error:', err.message)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n✅  Done — connection closed')
    process.exit(0)
  }
}

seed()
