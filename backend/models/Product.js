const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
  {
    lengths: { type: [String], default: [] },
    colors: { type: [String], default: [] },
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    texture: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, default: null },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    badge: { type: String, default: null },
    description: { type: String, default: '' },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },    // array of URLs
    video: { type: String, default: null },      // URL
    variants: { type: variantSchema, default: () => ({}) },
    inStock: { type: Boolean, default: true },
    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Text search index
productSchema.index({ name: 'text', description: 'text', texture: 'text', category: 'text' })

module.exports = mongoose.model('Product', productSchema)
