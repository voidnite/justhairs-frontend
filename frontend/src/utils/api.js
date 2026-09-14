import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

api.interceptors.response.use(
  res => res,
  err => {
    const message = err.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

// Products
export const fetchProducts = (params = {}) => api.get('/products', { params })
export const fetchProduct = (id) => api.get(`/products/${id}`)
export const fetchProductBySlug = (slug) => api.get(`/products/slug/${slug}`)

// Orders
export const createOrder = (data) => api.post('/orders', data)
export const fetchOrder = (id) => api.get(`/orders/${id}`)

// Payments
export const initializePayment = (data) => api.post('/payments/initialize', data)
export const verifyPayment = (reference) => api.get(`/payments/verify/${reference}`)

export default api
