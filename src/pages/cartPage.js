import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Button,
} from '@mui/material'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import UserLayout from '../Layouts/UserLayout'
import AuthContext from '../contexts/AuthContext'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { userCart } from '../apis'

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const history = useHistory()
  const naira = '\u20A6'

  // const auth = useContext(AuthContext)

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }
  React.useEffect(() => {
    dispatch({
      type: 'SET_VISIBLE',
      payload: false,
    })
  }, [])

  const showCartItems = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>

        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} p={p} />
        ))}
      </Table>
    </TableContainer>
  )

  const saveOrdertoDb = async () => {
    const res = await userCart(cart, user.token)

    if (res) {
      history.push('/checkout')
    }
  }

  return (
    <Box>
      <UserLayout>
        <Container sx={{ minHeight: '62vh', pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant='h6' component='body'>{`Cart / ${
                cart.length
              } ${cart.length > 1 ? 'Products' : 'Product'}`}</Typography>
              {!cart.length ? (
                <Typography variant='subtitle2'>
                  No Product in Cart.{' '}
                  <Link
                    style={{ textDecoration: 'none', color: '#7FB560' }}
                    to='/products'
                  >
                    Continue Shopping
                  </Link>
                </Typography>
              ) : (
                showCartItems()
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6' component='body'>
                Order Summary
              </Typography>

              <Divider />
              <Typography variant='subtitle2'>Products</Typography>

              {cart.map((c, i) => (
                <div key={i}>
                  <Typography variant='body2' sx={{ py: 1 }}>
                    {`${c.productName} x ${c.count} = ${naira}
                    ${(c.price * c.count)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  </Typography>
                </div>
              ))}
              <Divider />
              <Typography
                variant='subtitle2'
                sx={{ py: 2 }}
              >{`Total: ${naira}${getTotal()
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Typography>
              <Divider />
              {user && user.token ? (
                <Button
                  variant={!cart.length ? 'vendor' : 'black'}
                  onClick={saveOrdertoDb}
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Link
                  className='link'
                  to={{
                    pathname: '/login',
                    state: { from: 'cart' },
                  }}
                >
                  <Button variant='primary'>Login to Checkout</Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Container>
      </UserLayout>
    </Box>
  )
}

export default Cart
