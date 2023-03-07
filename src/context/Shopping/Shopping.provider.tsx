import React, { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Product } from '../../components/ShopCard'

interface IShoppingProviderProps {
  children: React.ReactNode
}

export type Cart = {
  product: Product,
  quantity: number
}
type Store = {
  cart: Cart[],
  wishList: Product[],
  keyword: string,
}

type ShoppingContextType = Store & {
  onKeywordChanged: (nextValue: string) => void
  addToCart: (product: Product) => void,
  getCartCount: () => number,
  decreaseIQty: (product: Product) => void,
  increaseIQty: (product: Product) => void
}

const ShoppingContext = createContext({} as ReturnType<typeof useStoreData>);

const useStoreData = () => {
  const store = useRef<Store>({
    cart: [],
    wishList: [],
    keyword: '',
  });

  const subscribers = useRef(new Set<() => void>());
  const get = useCallback(() => store.current, []);
  const set = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback())
  }, []);
  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => {
      subscribers.current.delete(callback);
    }
  }, [])

  return {
    get,
    set,
    subscribe,
  }
}

export const useStore = <SelectorOutput,>(selector: (store: Store) => SelectorOutput): [
  SelectorOutput,
  (value: Partial<Store>) => void
] => {
  const context = useContext(ShoppingContext);

  if (!context) throw new Error(`Cannot use this hook outside Shopping Context`);

  // const [state, setState] = useState(context.get());

  // useEffect(() => {
  //   return context.subscribe(() => setState(context.get()));
  // }, []);

  const state = React.useSyncExternalStore(context.subscribe, () => {
    return selector(context.get());
  });

  return [state, context.set]
}

const ShoppingProvider: React.FC<IShoppingProviderProps> = ({ children }) => {

  return (
    <ShoppingContext.Provider value={useStoreData()}>
      {children}
    </ShoppingContext.Provider>
  )
}

export default ShoppingProvider