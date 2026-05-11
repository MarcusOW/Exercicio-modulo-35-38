import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem('cart')
    if (serialized === null) return undefined
    return { cart: JSON.parse(serialized) }
  } catch (err) {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: loadCartFromStorage()
})

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
