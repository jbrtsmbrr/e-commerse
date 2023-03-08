import React from 'react'
import { Box } from "@mui/material";
import { Cart } from '../../../context/Shopping/Shopping.provider';
import useShoppingStore from '../../../stores/useShoppingStore.store';

interface ICartQuantityProps {
  cart: Cart
}

const CartQuantity: React.FC<ICartQuantityProps> = ({ cart }) => {
  const [decreaseIQty, increaseIQty] = useShoppingStore(state => [state.decreaseIQty, state.increaseIQty]);
  const decreaseQuantity = () => {
    decreaseIQty(cart.product)
  }
  const increaseQuantity = () => {
    increaseIQty(cart.product);
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