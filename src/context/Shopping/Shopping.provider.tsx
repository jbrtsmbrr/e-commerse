import React, { createContext, useContext, useState } from 'react'
import { Product } from '../../components/ShopCard'

interface IShoppingProviderProps {
  children: React.ReactNode
}

export type Cart = {
  product: Product,
  quantity: number
}
type ShoppingContextType = {
  keyword: string
  onKeywordChanged: (nextValue: string) => void
  cart: Cart[] | null
  wishList: Product[] | null
  addToCart: (product: Product) => void,
  getCartCount: () => number,
  decreaseIQty: (product: Product) => void,
  increaseIQty: (product: Product) => void
}

const ShoppingContext = createContext({} as ShoppingContextType);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);

  if (!context) throw new Error(`Cannot use this hook outside Shopping Context`);

  return context;
}

const ShoppingProvider: React.FC<IShoppingProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [wishListItems, setWishlistItems] = useState<Product[] | null>(null);
  const [keyword, setKeyword] = useState("");

  const addToCart = (product: Product) => {
    const productIndex = cartItems.findIndex(cartItem => cartItem.product.id === product.id);
    if (productIndex > -1) {
      setCartItems(prevItems => {
        const tempItems = [...prevItems];

        tempItems[productIndex] = {
          ...tempItems[productIndex],
          quantity: tempItems[productIndex].quantity + 1
        }

        return tempItems;
      })
    } else {
      setCartItems(prevItems => ([...prevItems, { product, quantity: 1 }]))
    }
  }

  const getCartCount = () => cartItems.reduce((accum, current) => accum += current.quantity, 0)

  const decreaseIQty = (product: Product) => {
    setCartItems((items) => {
      const index = items.findIndex(i => i.product.id === product.id);
      const itemsInstance = [...items];
      const nextValue = itemsInstance[index].quantity - 1
      if (nextValue < 1) return itemsInstance;
      itemsInstance[index].quantity -= 1;

      return itemsInstance;
    })
  };

  const increaseIQty = (product: Product) => {
    setCartItems(items => {
      const index = items.findIndex(i => i.product.id === product.id);
      const itemsInstance = [...items];
      itemsInstance[index].quantity += 1;
      return itemsInstance;
    })
  }

  const onKeywordChanged = (nextValue: string) => {
    setKeyword(nextValue);
  }


  const contextValue: ShoppingContextType = { keyword, onKeywordChanged, cart: cartItems, wishList: wishListItems, addToCart, getCartCount, decreaseIQty, increaseIQty }

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  )
}

export default ShoppingProvider