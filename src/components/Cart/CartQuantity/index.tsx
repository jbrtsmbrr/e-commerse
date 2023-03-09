import React from 'react'
import { Box } from "@mui/material";
import { Cart } from '../../../context/Shopping/Shopping.provider';
import useShoppingStore from '../../../stores/useShoppingStore.store';

interface ICartQuantityProps {
  cart: Cart
}

const CartQuantity: React.FC<ICartQuantityProps> = ({ cart }) => {
  const dispatch = useShoppingStore(state => state.dispatch);
  const decreaseQuantity = () => {
    dispatch({ type: 'DECREASE_I_QTY', payload: { product: cart.product } })
  }
  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_I_QTY', payload: { product: cart.product } })
  }

  return <Box alignItems="center">
    <button style={{ minWidth: "unset", minHeight: "unset", background: "white", color: "black", borderRight: "none", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", cursor: "pointer" }} onClick={() => decreaseQuantity()}>
      &minus;
    </button>
    <input type="text" value={cart.quantity} style={{ width: "auto", maxWidth: "4ch", background: "white", color: "black", textAlign: "center", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", }} />
    <button style={{ minWidth: "unset", minHeight: "unset", background: "white", color: "black", borderLeft: "none", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", cursor: "pointer" }}
      onClick={() => increaseQuantity()}>
      &#43;
    </button>
  </Box>
}


export default CartQuantity;