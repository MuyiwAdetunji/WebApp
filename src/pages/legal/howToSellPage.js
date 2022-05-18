import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const HowToSell = () => {
  return (
    <UserLayout>
      <SEO title='How to Sell' />
      <Box
        sx={{
          height: '50vh',
          background: '#7FB560',
          // p: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container>
          <Typography color='#fff' variant='h1' sx={{ fontWeight: 'bold' }}>
            How to Sell
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p'>
            As an online Market place tinkoko.com gives you the leverage to sell
            variety of products in all sizes and quantity. You can sell in Bulk
            for solid products like yam tubers, livestock, vegetables and fruits
            and also liquid products like palm oil and other processed foods. As
            product owners you can make more sales on Tinkoko by signing up to
            the platform as a vendor.
          </Typography>
          <Typography component='p'>Steps to Become a Vendor:</Typography>
          <Typography component='p'>
            1. Create a Vendor Account: by logging into www.tinkoko.com and
            accepting all vendors terms and conditions and general terms of use
            on the site. Click on Sign up and enter all the required details.
          </Typography>
          <Typography component='p'>
            2. Log into the app and post your products and price specifications
            of each product. You may choose the quantity of products available
            and shipping details.
          </Typography>
          <Typography component='p'>
            3. Wait to be contacted by Buyers on the website or app.
          </Typography>
          <Typography component='p'>
            4. Enjoy your Experience? Make sure to give us a positive feedback
            and share to your friends and family.
          </Typography>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default HowToSell
