import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity = 1 } = action.payload
      const key = `${product._id}-${variant?.length || ''}-${variant?.texture || ''}-${variant?.color || ''}`
      const existing = state.items.find(i => i.key === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            product,
            variant,
            quantity,
            price: product.price,
          },
        ],
      }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.key !== action.payload) }

    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload
      if (quantity < 1) return { ...state, items: state.items.filter(i => i.key !== key) }
      return {
        ...state,
        items: state.items.map(i => (i.key === key ? { ...i, quantity } : i)),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}

const loadCart = () => {
  try {
    const saved = localStorage.getItem('jh_cart')
    return saved ? JSON.parse(saved) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('jh_cart', JSON.stringify(state))
  }, [state])

  const addItem = (product, variant, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } })
    setIsOpen(true)
  }

  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', payload: key })

  const updateQuantity = (key, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
