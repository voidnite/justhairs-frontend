const express = require('express')
const router = express.Router()
const { createOrder, getOrder } = require('../controllers/orderController')

// POST /api/orders
router.post('/', createOrder)

// GET /api/orders/:id
router.get('/:id', getOrder)

module.exports = router
