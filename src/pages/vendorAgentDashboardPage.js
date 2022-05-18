import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import VendorHeader from '../components/shared/vendor/Header'
import VendorNavbar from '../components/shared/vendor/Navbar'
import HeaderMenu from '../components/shared/vendor/HeaderMenu'
import PostButtons from '../components/shared/vendor/PostButtons'
import { useHistory } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import HomeFeedCard from '../components/cards/HomeFeedCard'
import { getMyProducts } from '../apis'
import AgentHeader from '../components/shared/agent/Header'
import AgentNavbar from '../components/shared/agent/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import SEO from '../components/shared/Seo'

export default function Dashboard() {
  // const auth = useContext(AuthContext)
  const history = useHistory()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  // useEffect(() => {
  //   if (user.interests.length < 1) {
  //     history.replace('/interests')
  //   }
  // }, [])

  useEffect(() => {
    // getVendor(auth.user._id)
    loadMyProducts(user._id)
  }, [])

  const loadMyProducts = async (id) => {
    setLoading(true)
    const res = await getMyProducts(id)

    if (res) {
      setLoading(false)
      setProducts(res.doc)
    }
  }

  return (
    <Box sx={{ my: 8 }}>
      <SEO title='My Shop' />
      <Container>
        {user.role === 'vendor' ? (
          <>
            <HeaderMenu />
            {/* <VendorHeader />
            <VendorNavbar /> */}
          </>
        ) : (
          <>
            <AgentHeader />
            <AgentNavbar />
          </>
        )}
      </Container>
      <Container>
        {/* <PostButtons /> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h5' component='h5'>
            My Shop
          </Typography>
          <Button
            onClick={() => history.push('/add-product')}
            variant='primary'
            // variant={
            //   user.role === 'agent'
            //     ? 'agent'
            //     : user.role === 'vendor'
            //     ? 'vendor'
            //     : 'primary'
            // }
          >
            Add Product
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ padding: '2rem 0' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <HomeFeedCard
                key={product._id}
                name={product.productName}
                published={product.published}
                image={product.images[0]}
                quantity={product.quantity}
                weight={product.weight}
                onClick={() => history.push(`/product/${product.slug}`)}
              />
            ))
          ) : (
            <Container>
              <Paper sx={{ p: 2, m: 2 }} elevation={3}>
                <Typography variant='h6'>
                  You haven't added a product yet...
                </Typography>
              </Paper>
            </Container>
          )}
        </Grid>
      </Container>
    </Box>
  )
}
