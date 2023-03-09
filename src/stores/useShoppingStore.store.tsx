import { create } from "zustand";
import { Product } from "../components/ShopCard";

type Cart = {
  product: Product
  quantity: number
}

type ShoppingStore = {
  cart: Cart[],
  keyword: string
  dispatch: (args: Action) => void
}

type ShoppingStoreActions = {
  // onKeywordChanged: (nextValue: string) => void
  // addToCart: (product: Product) => void
  // decreaseIQty: (product: Product) => void
  // increaseIQty: (product: Product) => void
}

type Action = {
  type: "ON_KEYWORD_CHANGED" | "ADD_TO_CART" | "DECREASE_I_QTY" | "INCREASE_I_QTY",
  payload: any
}

const shoppingStoreReducer = (state: ShoppingStore, action: Action) => {
  switch (action.type) {
    case "ON_KEYWORD_CHANGED":
      return {
        ...state,
        keyword: action.payload.nextValue
      };
    case "ADD_TO_CART":
      const productIndex = state.cart.findIndex(c => c.product.id === action.payload.product.id);
      if (productIndex > -1) {
        const modifiedCart = [...state.cart];
        modifiedCart[productIndex].quantity += 1;
        return {
          ...state,
          cart: modifiedCart,
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: 1 }]
      };
    case "DECREASE_I_QTY":
      return {
        ...state,
        cart: state.cart.map(cart => {
          if (cart.product.id === action.payload.product.id) {
            const nextValue = cart.quantity - 1;
            return {
              ...cart,
              quantity: nextValue === 0 ? cart.quantity : cart.quantity - 1
            };
          }
          return cart
        })
      };
    case "INCREASE_I_QTY": {
      return {
        ...state,
        cart: state.cart.map((cart) => {
          if (cart.product.id === action.payload.product.id) {
            return {
              ...cart,
              quantity: cart.quantity + 1
            }
          }

          return cart;
        })
      }
    }
  }
}

const useShoppingStore = create<ShoppingStore>((set) => ({
  keyword: "",
  cart: [],
  dispatch: (args) => { set((state) => shoppingStoreReducer(state, args)) }
  // addToCart: (product: Product) => {
  //   set((state) => {
  //     const tempState = { ...state };
  //     const index = tempState.cart.findIndex(item => item.product.id === product.id);
  //     if (index > -1) {
  //       tempState.cart[index].quantity += 1;

  //       return { cart: [...tempState.cart] };
  //     }

  //     return { cart: [...tempState.cart, { product, quantity: 1 }] }
  //   })
  // },
  // increaseIQty: (product: Product) => {
  //   set(state => {
  //     const tempState = { ...state };
  //     const index = tempState.cart.findIndex(item => item.product.id === product.id);
  //     tempState.cart[index].quantity += 1;

  //     return { cart: [...tempState.cart] }
  //   })
  // },
  // decreaseIQty: (product: Product) => {
  //   set(state => {
  //     const tempState = { ...state }
  //     const index = tempState.cart.findIndex(item => item.product.id === product.id);
  //     if (tempState.cart[index].quantity < 2) return tempState;

  //     tempState.cart[index].quantity -= 1;

  //     return { cart: [...tempState.cart] }
  //   })
  // },
  // onKeywordChanged: (nextValue: string) => {
  //   set({ keyword: nextValue })
  // }
}));

export default useShoppingStore;