import React from 'react'
import CartModalItem from '../CartModalItem';
import useShoppingStore from '../../../stores/useShoppingStore.store';


const CartModal = (): JSX.Element => {
  const cart = useShoppingStore(state => state.cart);
  return <React.Fragment>
    {cart?.map((cartItem) => <CartModalItem cart={cartItem} />)}
  </React.Fragment>
}

export default CartModal