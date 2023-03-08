import { create } from "zustand";
import { Product } from "../components/ShopCard";

type Cart = {
  product: Product
  quantity: number
}

type ShoppingStore = {
  cart: Cart[],
  keyword: string
}

type ShoppingStoreActions = {
  onKeywordChanged: (nextValue: string) => void
  addToCart: (product: Product) => void
  decreaseIQty: (product: Product) => void
  increaseIQty: (product: Product) => void
}

const useShoppingStore = create<ShoppingStore & ShoppingStoreActions>((set) => ({
  keyword: "",
  cart: [],
  addToCart: (product: Product) => {
    set((state) => {
      const tempState = { ...state };
      const index = tempState.cart.findIndex(item => item.product.id === product.id);
      if (index > -1) {
        tempState.cart[index].quantity += 1;

        return { cart: [...tempState.cart] };
      }

      return { cart: [...tempState.cart, { product, quantity: 1 }] }
    })
  },
  increaseIQty: (product: Product) => {
    set(state => {
      const tempState = { ...state };
      const index = tempState.cart.findIndex(item => item.product.id === product.id);
      tempState.cart[index].quantity += 1;

      return { cart: [...tempState.cart] }
    })
  },
  decreaseIQty: (product: Product) => {
    set(state => {
      const tempState = { ...state }
      const index = tempState.cart.findIndex(item => item.product.id === product.id);
      if (tempState.cart[index].quantity < 2) return tempState;

      tempState.cart[index].quantity -= 1;

      return { cart: [...tempState.cart] }
    })
  },
  onKeywordChanged: (nextValue: string) => {
    set({ keyword: nextValue })
  }
}));

export default useShoppingStore;