import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar/Navbar'
import CartDrawer from './components/Cart/CartDrawer'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Contact from './pages/Contact'

// Pages that should NOT show the standard Navbar (full-screen checkout flow)
const MINIMAL_NAV_ROUTES = ['/checkout']

const App = () => {
  const { pathname } = useLocation()
  const isMinimal = MINIMAL_NAV_ROUTES.includes(pathname)

  return (
    <CartProvider>
      {!isMinimal && <Navbar />}
      <CartDrawer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isMinimal && <Footer />}
    </CartProvider>
  )
}

const NotFound = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'var(--color-black)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      paddingTop: '6rem',
    }}
  >
    <h1
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '6rem',
        color: 'var(--color-gold)',
        lineHeight: 1,
      }}
    >
      404
    </h1>
    <p style={{ color: 'var(--color-gray-light)', fontSize: '1rem' }}>
      This page doesn't exist
    </p>
    <a href="/" className="btn btn-primary">Back to Home</a>
  </div>
)

export default App
