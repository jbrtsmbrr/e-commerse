import React from 'react'
import { useStore } from '../../../context/Shopping/Shopping.provider';
import CartModalItem from '../CartModalItem';


const CartModal = (): JSX.Element => {
  const [cart] = useStore((store) => store.cart);
  return <React.Fragment>
    {cart?.map((cartItem) => <CartModalItem cart={cartItem} />)}
  </React.Fragment>
}

export default CartModal