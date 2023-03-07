import React from 'react'
import { useShoppingContext } from '../../../context/Shopping/Shopping.provider';
import CartModalItem from '../CartModalItem';


const CartModal = (): JSX.Element => {
  const { cart } = useShoppingContext();
  return <React.Fragment>
    {cart?.map((cartItem) => <CartModalItem cart={cartItem} />)}
  </React.Fragment>
}

export default CartModal