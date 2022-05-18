import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Grid, Box, Container } from '@mui/material'

import { getProduct } from '../apis'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

import UserLayout from '../Layouts/UserLayout'
import ReviewsCard from '../components/cards/ReviewsCard'
import ProductDetail from '../components/products/ProductDetail'
import ProductVendorDetail from '../components/products/ProductVendorDetail'
import Search from '../components/shared/Search'
import { useDispatch, useSelector } from 'react-redux'

import AuthContext from '../contexts/AuthContext'

const ProductPage = () => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  // const auth = useContext(AuthContext)

  const params = useParams()

  useEffect(() => {
    loadProduct(params.slug)
  }, [])

  const loadProduct = async (slug) => {
    setLoading(true)
    const res = await getProduct(slug)
    if (res) {
      setProduct(res)
      setLoading(false)
    }
  }

  return (
    <UserLayout>
      <Box sx={{ py: 4, background: '#f8f8f8' }}>
        <Grid container spacing={3}>
          <Grid item md={9} sx={12}>
            <Container>
              <ProductDetail product={product} loading={loading} auth={user} />
            </Container>
          </Grid>
          <Grid item xs={12} md={3}>
            <ProductVendorDetail
              user={product?.user}
              deliveryType={product?.deliveryType}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </UserLayout>
  )
}

export default ProductPage
