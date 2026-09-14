const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  getProductBySlug,
} = require('../controllers/productController')

// GET /api/products
router.get('/', getProducts)

// GET /api/products/slug/:slug  — must be before /:id
router.get('/slug/:slug', getProductBySlug)

// GET /api/products/:id
router.get('/:id', getProductById)

module.exports = router
