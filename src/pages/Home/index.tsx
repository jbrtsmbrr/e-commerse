import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShopCard, { Product } from '../../components/ShopCard'

const useFetch = (url: string) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return { data, loading };
}

const Home = () => {
  const { data: recentlyData, loading: recenylyLoading } = useFetch('https://fakestoreapi.com/products?limit=5&sort=desc');
  const { data, loading } = useFetch('https://fakestoreapi.com/products?limit=10');
  return (
    <div style={{ width: "85%", margin: "auto auto" }}>
      <div style={{ marginTop: 40, paddingInline: 15 }}>
        <Typography variant="h6" color="black" marginLeft={1} marginBottom={2} fontWeight={600}>Recently viewed</Typography>
        <Grid container gap={3} justifyContent="center" alignItems="center">
          {recentlyData?.map((product) =>
            <ShopCard product={product} />
          )}
        </Grid>
      </div>
      <div style={{ marginTop: 40, paddingInline: 15 }}>
        <Typography variant="h6" color="black" marginLeft={1} marginBottom={2} fontWeight={600}>New Products</Typography>
        <Grid container gap={3} justifyContent="center" alignItems="center">
          {data?.map((product) =>
            <ShopCard product={product} />
          )}
        </Grid>
      </div>
    </div>

  )
}

export default Home