import { Product } from "@/sanity.types";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ✅ Agora cada item pode ter um tamanho opcional
export interface BasketItem {
  product: Product;
  quantity: number;
  size?: string; 
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string, size?: string) => number;
  getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Adiciona item ao carrinho (considerando tamanho)
      addItem: (product, size) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id && item.size === size
          );

          if (existingItem) {
            // Se já existir mesmo produto + tamanho → soma quantidade
            return {
              items: state.items.map((item) =>
                item.product._id === product._id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Se for tamanho novo → adiciona novo item
            return {
              items: [...state.items, { product, size, quantity: 1 }],
            };
          }
        }),

      // ✅ Remove item (considerando tamanho)
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId && item.size === size) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) =>
            total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      // ✅ Conta quantos de um mesmo produto+tamanho existem
      getItemCount: (productId, size) => {
        const item = get().items.find(
          (item) => item.product._id === productId && item.size === size
        );
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    }
  )
);
