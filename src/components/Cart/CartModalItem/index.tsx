import React from 'react'
import { Checkbox, Box, Typography } from "@mui/material";
import { Cart } from '../../../context/Shopping/Shopping.provider';
import CartQuantity from '../CartQuantity';

interface ICartModalItemProps {
  cart: Cart
}

const CartModalItem: React.FC<ICartModalItemProps> = ({ cart }) => {
  const { image, price, title } = cart.product;
  return (<Box style={{ display: "flex", alignItems: "center", gap: "1rem" }} marginBottom="2rem">
    <Checkbox size='small' style={{ padding: 0 }} />
    <img alt='nike-shoes' src={image} height={65} width={65} style={{ minHeight: 65, minWidth: 65 }} />
    <div style={{ flex: 1 }}>
      <Typography fontSize="0.85rem" variant="body1" fontWeight={600} maxWidth="20ch">{title}</Typography>
      <CartQuantity cart={cart} />
    </div>
    <Typography variant='body1' fontWeight={600} color="primary">$ {price}</Typography>
  </Box>)
}

export default CartModalItem