import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Rating,
  Stack,
  TextField,
  Box,
  Typography,
  Tooltip,
  Hidden,
} from '@mui/material'
import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import ReviewsCard from '../cards/ReviewsCard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import StarIcon from '@mui/icons-material/Star'
import { useProductDetailPageStyles } from '../../styles/styles'
import { numberWithCommas } from '../../utils/numberComma'
import { Link, useHistory } from 'react-router-dom'
import { createReview } from '../../apis'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const ProductDetail = ({ product, loading, auth }) => {
  const classes = useProductDetailPageStyles()

  const naira = '\u20A6'

  const history = useHistory()

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

  const [value, setValue] = useState(0)
  const [hover, setHover] = useState(-1)
  const [comment, setComment] = useState('')
  const [tooltip, setTooltip] = useState('Click to Add')

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    const res = await createReview(
      comment,
      value,
      product._id,
      auth._id,
      auth.token
    )

    if (res) {
      toast.success('Review Successful')
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Hidden smDown>
            <Grid item xs={4}>
              <Carousel>
                {product?.images?.map((img) => (
                  <div>
                    <img src={img.url} alt='product' />
                  </div>
                ))}
              </Carousel>
            </Grid>
          </Hidden>
          <Grid item sm={8} xs={12}>
            <Typography variant='h6' component='body'>
              {`${product.productName}`}
            </Typography>
            <Typography variant='body2' component='body' sx={{ pb: 1 }}>
              {`${product.description}`}
            </Typography>

            <Grid container spacing={3} sx={{ pb: 1 }}>
              <Grid item xs={6}>
                <Typography variant='h6'>{`${naira}${product?.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='subtitle2'>{`Weight: ${product?.weight} ${product?.metrics}`}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ pb: 1 }}>
              <Grid item xs={6}>
                <Link
                  className='link'
                  to={`/category/${product?.category?.name}`}
                >
                  <Typography variant='subtitle2'>
                    {`Category: ${product?.category?.name}`}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={6}>
                {/* TODO: CREATE CATEGORY PAGE FOR SLUG */}
                {/* <Typography variant='subtitle2'>{`SubCategory: ${product?.subCategory[0]?.name}`}</Typography> */}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={9}>
                <div className={classes.ratings}>
                  <Typography variant='body2'>
                    {product?.ratingsAverage > 0
                      ? `(${product?.ratingsAverage} star ratings)`
                      : 'No Rating. Be the first'}
                  </Typography>{' '}
                  {product?.ratingsAverage > 0 ? (
                    <Rating
                      name='read-only'
                      value={product?.ratingsAverage}
                      precision={0.5}
                      readOnly
                    />
                  ) : (
                    <Rating
                      name='read-only'
                      value={0}
                      precision={0.5}
                      readOnly
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* TODO ADD */}
              </Grid>
            </Grid>
            <Hidden smUp>
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={12}>
                  <Carousel>
                    {product?.images?.map((img) => (
                      <div>
                        <img src={img.url} alt='product' />
                      </div>
                    ))}
                  </Carousel>
                </Grid>
              </Grid>
            </Hidden>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                {/* <Tooltip title={tooltip} placement='top'>
                  <Button
                    variant='primary'
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Tooltip> */}
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='primary'
                  startIcon={<ChatBubbleOutlineIcon />}
                  fullWidth
                >
                  T Messenger
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* <Hidden smUp>
            <Grid item xs={8}>
              <Carousel>
                {product?.images?.map((img) => (
                  <div>
                    <img src={img.url} alt='product' />
                  </div>
                ))}
              </Carousel>
            </Grid>
          </Hidden> */}
        </Grid>
      </div>
      <div className={classes.addReviewContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component='body' variant='h6'>
              PRODUCT REVIEW
            </Typography>

            {auth && auth.token ? (
              <>
                <Typography variant='body2'>
                  We value your feedback and hope you could leave a review on
                  how we can better our product.
                </Typography>
                <form onSubmit={handleReviewSubmit}>
                  <Box
                    sx={{
                      width: 200,
                      display: 'flex',
                      alignItems: 'center',
                      my: 2,
                    }}
                  >
                    <Rating
                      name='hover-feedback'
                      value={value}
                      precision={0.5}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setValue(newValue)
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover)
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize='inherit'
                        />
                      }
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>

                  <TextField
                    id='outlined-multiline-flexible'
                    label='Add Comment...'
                    multiline
                    fullWidth
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant='primary'
                    type='submit'
                    disabled={!comment || value === 0}
                  >
                    Submit Review
                  </Button>
                </form>
              </>
            ) : (
              <Typography>
                You need to Login and Successfully complete purchase of product
                before you can review product.
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
      <div className={classes.addReviewContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography component='body' variant='h6'>
              Verified Customer Feedback
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    component='body'
                    variant={product?.ratingsAverage > 0 ? 'h1' : 'h2'}
                  >
                    {product?.ratingsAverage > 0
                      ? product?.ratingsAverage?.toFixed(1)
                      : 'N/A'}
                    {/* {product?.ratingsAverage?.toFixed(1)} */}
                  </Typography>
                  {product?.ratingsAverage > 0 ? (
                    <Rating
                      name='read-only'
                      value={product?.ratingsAverage}
                      precision={0.5}
                      readOnly
                    />
                  ) : (
                    <Rating
                      name='read-only'
                      value={0}
                      precision={0.5}
                      readOnly
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>5</Typography>
                  <StarIcon sx={{ color: '#F5AF00' }} />
                  <Typography>(1)</Typography>
                  <LinearProgress
                    variant='determinate'
                    value='10'
                    sx={{ width: '5rem' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>4</Typography>
                  <StarIcon sx={{ color: '#F5AF00' }} />
                  <Typography>(1)</Typography>
                  <LinearProgress
                    variant='determinate'
                    value='10'
                    sx={{ width: '5rem' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>3</Typography>
                  <StarIcon sx={{ color: '#F5AF00' }} />
                  <Typography>(1)</Typography>
                  <LinearProgress
                    variant='determinate'
                    value='10'
                    sx={{ width: '5rem' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>2</Typography>
                  <StarIcon sx={{ color: '#F5AF00' }} />
                  <Typography>(1)</Typography>
                  <LinearProgress
                    variant='determinate'
                    value='10'
                    sx={{ width: '5rem' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>1</Typography>
                  <StarIcon sx={{ color: '#F5AF00' }} />
                  <Typography>(1)</Typography>
                  <LinearProgress
                    variant='determinate'
                    value='10'
                    sx={{ width: '5rem' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' component='body' sx={{ my: 2 }}>
              Reviews
            </Typography>
            {product.reviews && product?.reviews?.length > 0 ? (
              product.reviews.map((review) => <ReviewsCard review={review} />)
            ) : (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant='h6' component='body'>
                  No review for this product.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default ProductDetail
