const Product = require('../models/Product')

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      collection,
      texture,
      filter,
      search,
      sort = 'default',
      page = 1,
      limit = 20,
    } = req.query

    const query = {}

    if (collection) query.category = collection
    if (texture) query.texture = texture
    if (filter === 'new') query.isNew = true
    if (filter === 'bestseller') query.isBestSeller = true
    if (filter === 'instock') query.inStock = true

    // Full-text search
    if (search) {
      query.$text = { $search: search }
    }

    // Sort
    let sortObj = {}
    switch (sort) {
      case 'price-asc': sortObj = { price: 1 }; break
      case 'price-desc': sortObj = { price: -1 }; break
      case 'rating': sortObj = { rating: -1 }; break
      case 'newest': sortObj = { createdAt: -1 }; break
      default: sortObj = { isBestSeller: -1, createdAt: -1 }
    }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Product.countDocuments(query)
    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .lean()

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/products/slug/:slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean()
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getProducts, getProductById, getProductBySlug }
