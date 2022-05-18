import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const VendorProvider = () => {
  return (
    <UserLayout>
      <SEO title='Become a Vendor' />
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
            Become a Vendor Service Provider
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p'>
            AT Tinkoko we offer a platform where agri-buisness can sell their
            agricultural products, Tinkoko serves as a safe space where farmers
            and product sellers can sell and make profit using technology.
            Tinkoko as a market place ensures that all buyers have access to
            clean and healthy food products sold buy verifiable vendors at the
            cheapest prices.
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
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default VendorProvider
