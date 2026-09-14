const Order = require('../models/Order')

// POST /api/orders  — create a new pending order
const createOrder = async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      items,
      subtotal,
      deliveryFee,
      total,
      deliveryOption,
    } = req.body

    // Basic validation
    if (!customer?.email) return res.status(400).json({ message: 'Customer email is required' })
    if (!items?.length) return res.status(400).json({ message: 'Order must have at least one item' })
    if (!shippingAddress?.state) return res.status(400).json({ message: 'Shipping address is required' })

    // Sanitise: ensure totals are numbers
    const order = await Order.create({
      customer,
      shippingAddress,
      items,
      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee) || 0,
      total: Number(total),
      deliveryOption: deliveryOption || 'standard',
      paymentStatus: 'pending',
      orderStatus: 'pending',
    })

    res.status(201).json({ order })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/orders/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean()
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createOrder, getOrder }
