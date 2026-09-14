const axios = require('axios')
const Order = require('../models/Order')

const PAYSTACK_BASE = 'https://api.paystack.co'

// Helper: Paystack authenticated request
const paystackRequest = (method, path, data = null) => {
  const config = {
    method,
    url: `${PAYSTACK_BASE}${path}`,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  }
  if (data) config.data = data
  return axios(config)
}

/**
 * POST /api/payments/initialize
 *
 * Initialises a Paystack transaction and returns the hosted payment URL.
 * The frontend redirects the customer to authorization_url.
 * Paystack then redirects back to /order-confirmation?reference=xxx
 */
const initializePayment = async (req, res) => {
  try {
    const { email, amount, orderId, metadata } = req.body

    if (!email || !amount || !orderId) {
      return res.status(400).json({ message: 'email, amount and orderId are required' })
    }

    // Paystack expects amount in KOBO (1 NGN = 100 kobo)
    const amountInKobo = Math.round(Number(amount) * 100)

    const callbackUrl = `${process.env.FRONTEND_URL}/order-confirmation`

    const { data: paystackRes } = await paystackRequest('post', '/transaction/initialize', {
      email,
      amount: amountInKobo,
      currency: 'NGN',
      callback_url: callbackUrl,
      metadata: {
        orderId,
        ...metadata,
        cancel_action: `${process.env.FRONTEND_URL}/checkout`,
      },
    })

    if (!paystackRes.status) {
      return res.status(500).json({ message: 'Paystack initialization failed' })
    }

    const { authorization_url, reference } = paystackRes.data

    // Save reference on the order
    await Order.findByIdAndUpdate(orderId, { paystackReference: reference })

    res.json({
      authorization_url,
      reference,
      access_code: paystackRes.data.access_code,
    })
  } catch (err) {
    const msg = err.response?.data?.message || err.message
    res.status(500).json({ message: msg })
  }
}

/**
 * GET /api/payments/verify/:reference
 *
 * Called by the frontend on the /order-confirmation page.
 * Verifies the transaction with Paystack, then updates the order status.
 * Returns the order and payment data.
 */
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params

    if (!reference) {
      return res.status(400).json({ message: 'Payment reference is required' })
    }

    // Ask Paystack to verify
    const { data: paystackRes } = await paystackRequest(
      'get',
      `/transaction/verify/${encodeURIComponent(reference)}`
    )

    if (!paystackRes.status || !paystackRes.data) {
      return res.status(400).json({ message: 'Unable to verify payment', status: 'failed' })
    }

    const txn = paystackRes.data

    // Find order by reference
    const order = await Order.findOne({ paystackReference: reference })
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this reference', status: 'failed' })
    }

    if (txn.status === 'success') {
      // Verify the amount paid matches (prevent price-manipulation attacks)
      const paidKobo = txn.amount
      const expectedKobo = Math.round(order.total * 100)

      if (paidKobo < expectedKobo) {
        // Under-payment — mark as failed
        await Order.findByIdAndUpdate(order._id, {
          paymentStatus: 'failed',
          paystackData: txn,
        })
        return res.status(400).json({ message: 'Amount paid does not match order total', status: 'failed' })
      }

      // All good — update order
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          paymentStatus: 'paid',
          orderStatus: 'processing',
          paystackData: txn,
        },
        { new: true }
      ).lean()

      return res.json({
        status: 'success',
        order: updatedOrder,
        payment: {
          reference: txn.reference,
          amount: txn.amount / 100,
          channel: txn.channel,
          paidAt: txn.paid_at,
        },
      })
    } else {
      // Payment failed or abandoned
      await Order.findByIdAndUpdate(order._id, {
        paymentStatus: 'failed',
        paystackData: txn,
      })

      return res.json({ status: 'failed', message: 'Payment was not successful' })
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message
    res.status(500).json({ message: msg, status: 'failed' })
  }
}

module.exports = { initializePayment, verifyPayment }
