import React from 'react'
import { Box } from "@mui/material";
import { Cart, useStore } from '../../../context/Shopping/Shopping.provider';
import { Product } from '../../ShopCard';

interface ICartQuantityProps {
  cart: Cart
}

const CartQuantity: React.FC<ICartQuantityProps> = ({ cart: cardCart }) => {
  const [cart, setStore] = useStore((store) => store.cart);
  const decreaseIQty = (product: Product) => {
    const index = cart.findIndex(i => i.product.id === product.id);
    const itemsInstance = [...cart];
    const nextValue = itemsInstance[index].quantity - 1
    if (nextValue < 1) return itemsInstance;
    itemsInstance[index].quantity -= 1;
    setStore({
      cart: itemsInstance
    })
  };

  const increaseIQty = (product: Product) => {

    const index = cart.findIndex(i => i.product.id === product.id);
    const itemsInstance = [...cart];
    itemsInstance[index].quantity += 1;

    setStore({
      cart: itemsInstance
    })
  }
  const decreaseQuantity = () => {
    decreaseIQty(cardCart.product)
  }
  const increaseQuantity = () => {
    increaseIQty(cardCart.product);
  }

  return <Box alignItems="center">
    <button style={{ minWidth: "unset", minHeight: "unset", background: "white", color: "black", borderRight: "none", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", cursor: "pointer" }} onClick={() => decreaseQuantity()}>
      &minus;
    </button>
    <input type="text" value={cardCart.quantity} style={{ width: "auto", maxWidth: "4ch", background: "white", color: "black", textAlign: "center", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", }} />
    <button style={{ minWidth: "unset", minHeight: "unset", background: "white", color: "black", borderLeft: "none", borderColor: "#aaa", border: "1px solid #aaa", fontSize: "0.85rem", cursor: "pointer" }}
      onClick={() => increaseQuantity()}>
      &#43;
    </button>
  </Box>
}


export default CartQuantity;