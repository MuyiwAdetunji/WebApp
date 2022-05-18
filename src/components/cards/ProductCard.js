import {
  Grid,
  Paper,
  Box,
  Typography,
  Rating,
  IconButton,
  Tooltip,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import React, { useState } from 'react'
import _ from 'lodash'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { useDispatch, useSelector } from 'react-redux'

const ProductCard = ({ product, onClick }) => {
  const naira = '\u20A6'
  const [tooltip, setTooltip] = useState('Click to Add')

  // REDUX
  const { cart } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('tink_cart')) {
        cart = JSON.parse(localStorage.getItem('tink_cart'))
      }
      // PUSH NEW PRODUCT TO CART
      cart.push({
        ...product,
        count: 1,
      })

      // REMOVE DUPLICATES
      let unique = _.uniqWith(cart, _.isEqual)

      // SAVE TO LOCAL STORAGE
      localStorage.setItem('tink_cart', JSON.stringify(unique))

      // show tooltip
      setTooltip('Added')

      // ADD TO REDUX
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

  return (
    <Paper elevation={5} className='product-card-paper'>
      <img src={product.images[0]?.url} alt='Product' onClick={onClick} />
      <Box sx={{ px: 1, pb: 1 }}>
        {product?.ratingsAverage > 0 ? (
          <Rating
            name='read-only'
            value={product?.ratingsAverage}
            precision={0.5}
            readOnly
          />
        ) : (
          <Rating name='read-only' value={0} precision={0.5} readOnly />
        )}
        <Typography variant='body2' sx={{ height: 45 }} onClick={onClick}>
          <HTMLEllipsis
            unsafeHTML={`${product.productName} - ${product.weight} ${
              product.metrics !== undefined ? product.metrics : 'KG'
            }`}
            maxLine='2'
            ellipsis='...'
            basedOn='letters'
          />
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle2'>{`${naira}${product.price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Typography>
          </Box>
          <Tooltip title='Start Chatting' placement='top'>
            {/* <Tooltip title={tooltip} placement='top'> */}
            <Box
              sx={{
                border: '2px solid #7AB259',
                borderRadius: '5px',
                backgroundColor: '#7AB259',
              }}
            >
              {/* <IconButton size='small' color='standard'>
                <ShoppingCartIcon onClick={handleAddToCart} />
              </IconButton> */}
              <IconButton size='small' color='standard'>
                <ChatBubbleOutlineIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  )
}

export default ProductCard
