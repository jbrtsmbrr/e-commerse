import React, { createContext, useContext, useState } from 'react'
import { Product } from '../../components/ShopCard'

interface IShoppingProviderProps {
  children: React.ReactNode
}

type Cart = {
  product: Product,
  quantity: number
}
type ShoppingContextType = {
  cart: Cart[] | null
  wishList: Product[] | null
  addToCart: (product: Product) => void,
  getCartCount: () => number
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

  return (
    <ShoppingContext.Provider value={{ cart: cartItems, wishList: wishListItems, addToCart, getCartCount }}>
      {children}
    </ShoppingContext.Provider>
  )
}

export default ShoppingProvider