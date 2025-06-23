import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  restaurantId: string
  restaurantName: string
}

interface CartStore {
  items: CartItem[]
  restaurantId: string | null
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      
      addItem: (item) => {
        const state = get()
        
        // If adding from different restaurant, clear cart
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          set({
            items: [{ ...item, quantity: 1 }],
            restaurantId: item.restaurantId
          })
          return
        }
        
        const existingItem = state.items.find(i => i.id === item.id)
        
        if (existingItem) {
          set({
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          })
        } else {
          set({
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId: item.restaurantId
          })
        }
      },
      
      removeItem: (id) => {
        const state = get()
        const newItems = state.items.filter(i => i.id !== id)
        set({
          items: newItems,
          restaurantId: newItems.length > 0 ? state.restaurantId : null
        })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          )
        })
      },
      
      clearCart: () => set({ items: [], restaurantId: null }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)