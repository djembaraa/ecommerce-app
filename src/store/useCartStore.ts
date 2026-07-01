import { create } from 'zustand'

export interface CartItem {
  product_id: string; // Using string to simulate Supabase UUID
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (product_id: string) => void;
  updateQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  addItem: (newItem) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(item => item.product_id === newItem.product_id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return { items: updatedItems, isOpen: true }; // Open cart when item added
      }
      return { items: [...state.items, newItem], isOpen: true };
    });
  },
  removeItem: (product_id) => {
    set((state) => ({
      items: state.items.filter(item => item.product_id !== product_id)
    }));
  },
  updateQuantity: (product_id, quantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item.product_id === product_id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
}));
