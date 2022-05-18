import { Grid, Box, Container, Typography, Stack } from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box sx={{ background: 'black', color: 'white', padding: ' 3rem 1.5rem' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12} sm={6}>
            <Stack spacing={1}>
              <Typography component='subtitle1' variant='button'>
                GET TO KNOW US
              </Typography>
              <Link
                to='/services/about-us'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  About Us
                </Typography>
              </Link>
              <Link
                to='/services/terms-and-conditions'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Terms and Conditions
                </Typography>
              </Link>
              <Link
                to='/legal/privacy-policy'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Privacy Policy
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item md={3} xs={12} sm={6}>
            <Stack spacing={1}>
              <Typography component='subtitle1' variant='button'>
                LET US HELP YOU
              </Typography>
              <Typography component='p' variant='body2'>
                Help Center
              </Typography>
              <Link
                to='/services/how-to-shop'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  How to Shop
                </Typography>
              </Link>
              <Link
                to='/services/delivery-and-shipping'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Shipping and Delivery
                </Typography>
              </Link>
              <Typography component='p' variant='body2'>
                Our Mobile App
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3} xs={12} sm={6}>
            <Stack spacing={1}>
              <Typography component='subtitle1' variant='button'>
                MAKE MONEY WITH US
              </Typography>
              <Link
                to='/services/how-to-sell'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Sell with Us
                </Typography>
              </Link>
              <Link
                to='/services/become-a-vendor'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Become a Vendor Service Provider
                </Typography>
              </Link>
              <Link
                to='/services/become-an-agent'
                style={{ color: '#fff' }}
                className='link'
              >
                <Typography component='p' variant='body2'>
                  Become an Agent with us
                </Typography>
              </Link>
              <Typography component='p' variant='body2'>
                Become a Logistics Service Partner
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3} xs={6}>
            <Typography component='subtitle1' variant='button'>
              JOIN US
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
