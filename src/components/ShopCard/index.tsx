import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '../Button';
import Typography from '@mui/material/Typography';
import { Grid, Rating, Box, CardHeader, IconButton } from "@mui/material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteBorder';
import useShoppingStore from '../../stores/useShoppingStore.store';

export type Product = {
  category: string
  description: string
  id: number
  image: string
  rating: { rate: number, count: number }
  title: string
  price: number
}

interface IShopCard {
  product: Product
}

const ShopCard: React.FC<IShopCard> = ({ product }) => {
  const { rating, title, image, description, price } = product;
  const dispatch = useShoppingStore(state => state.dispatch);
  const [priceNumber, priceDecimal] = price.toString().split(".");
  return (
    <Grid item minWidth={200} maxWidth={200}>
      <Card sx={{ position: "relative" }} elevation={0}>
        <IconButton size='small' style={{ position: "absolute", right: 10, top: 10, background: "white", boxShadow: "0px 0px 16px #d6d6d6" }}>
          <FavoriteOutlinedIcon fontSize="small" />
        </IconButton>
        <CardMedia
          style={{ objectFit: "contain" }}
          component="img"
          alt="green iguana"
          height="200"
          image={`${image}`}
        />
        <CardContent>
          <Grid display="flex" alignItems="center" justifyContent="space-between" gap={1} >
            <Box flex={1} overflow="hidden" textOverflow="hidden">
              <Typography noWrap fontSize="0.8rem" variant="subtitle2" fontWeight={600}>
                {title}
              </Typography>
            </Box>
            <Typography variant="subtitle1" fontWeight={600}>
              P{priceNumber}
              {priceDecimal && <Typography component="span" fontSize="0.70rem" fontWeight={600} style={{ display: "inline-block", transform: "translateY(-3px)" }}>.{priceDecimal}</Typography>}
            </Typography>
          </Grid>
          <Box maxWidth={250} textOverflow="ellipsis" overflow="hidden">
            <Typography noWrap fontSize="0.67rem" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Rating
            value={rating.rate}
            style={{ fontSize: "0.85rem" }}
            // defaultValue={4}
            precision={0.5}
            readOnly
            getLabelText={(value: number) => `${value}`}
          />
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' disableElevation onClick={() => dispatch({ type: "ADD_TO_CART", payload: { product } })}>Add to Cart</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ShopCard



