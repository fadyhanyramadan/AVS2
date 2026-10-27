import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items?.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] }
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items?.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items?.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementQuantity: (id) =>
        set((state) => {
          const item = state.items?.find((item) => item.id === id);
          if (item.quantity <= 1) {
            // Remove the item if quantity would go below 1
            return {
              items: state.items?.filter((item) => item.id !== id),
            };
          }
          return {
            items: state.items?.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // الاسم اللي بيتخزن في localStorage
    }
  )
)
