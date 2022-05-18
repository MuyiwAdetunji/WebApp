import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { getUserCart, emptyUserCart, saveUserAddress } from '../apis'
import UserLayout from '../Layouts/UserLayout'
import AuthContext from '../contexts/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const Checkout = () => {
  // const auth = useContext(AuthContext)

  const { user } = useSelector((state) => ({ ...state }))
  const [products, setProducts] = useState([])
  const history = useHistory()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  const [total, setTotal] = useState(0)

  const naira = '\u20A6'

  const dispatch = useDispatch()

  useEffect(() => {
    loadCartItems(user.token)
  }, [])

  const loadCartItems = async (token) => {
    const res = await getUserCart(token)

    if (res) {
      setProducts(res.products)
      setTotal(res.cartTotal)
    }
  }

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tink_cart')
    }
    // remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      toast.success('Cart is empty. Contniue shopping.')
      history.push('/products')
    })
  }
  const saveAddressToDb = async () => {
    const res = await saveUserAddress(address, city, state, user.token)

    if (res) {
      if (res.ok) {
        setAddressSaved(true)
        toast.success('Address Saved')
      }
    }
  }

  return (
    <UserLayout>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant='h6' body='div' sx={{ my: 2 }}>
              Delivery Address
            </Typography>
            <Box
              sx={{
                px: 10,
                py: 3,
              }}
            >
              <Stack spacing={2}>
                <TextField
                  id='outlined-multiline-flexible'
                  label='Address'
                  // sx={{ width: 300 }}
                  multiline
                  maxRows={4}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>City</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={city}
                    label='City'
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <MenuItem value={'Lagos'}>Lagos</MenuItem>
                    <MenuItem value={'Abuja'}>Abuja</MenuItem>
                    <MenuItem value={'Port Harcourt'}>Port Harcourt</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>State</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={state}
                    label='State'
                    onChange={(e) => setState(e.target.value)}
                  >
                    <MenuItem value={'Lagos'}>Lagos</MenuItem>
                    <MenuItem value={'Abuja'}>Abuja</MenuItem>
                    <MenuItem value={'Port Harcourt'}>Port Harcourt</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Button variant='primary' onClick={saveAddressToDb} fullWidth>
                Save
              </Button>
            </Box>
            <Divider />
            <Typography variant='h6' body='div'>
              Got Coupon?
            </Typography>
            coupon input and apply button
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6' body='div' sx={{ my: 2 }}>
              Order Summary
            </Typography>
            <Divider />
            <Typography variant='h6' body='div'>
              {`${products.length} Products`}
            </Typography>
            <Divider />

            {products.map((p, i) => (
              <div key={i} style={{ padding: 3 }}>
                <Typography variant='body2' sx={{ py: 1 }}>
                  {p.product.productName} x {p.count} = {naira}
                  {(p.product.price * p.count)
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Typography>
                <Divider />
              </div>
            ))}

            <Typography variant='h6' body='div'>
              {`Cart Total = ${naira}${total
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant={!addressSaved ? 'vendor' : 'black'}
                  disabled={!addressSaved || !products.length}
                >
                  {!addressSaved
                    ? 'Save Address to Place Order'
                    : 'Place Order'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={!products.length}
                  fullWidth
                  variant='primary'
                  onClick={emptyCart}
                >
                  Empty Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default Checkout
