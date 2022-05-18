import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const DeliveryShipping = () => {
  return (
    <UserLayout>
      <SEO title='Delivery and Shipping' />
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
            Delivery and Shipping
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p' variant='h6'>
            When I buy a product, how does it get delivered to me?
          </Typography>
          <Typography component='p'>
            Tinkoko does not sell any products of our own. When a product is
            purchased, the purchase is made on the website through the vendors
            store. You’ll have to contact that retailer directly.
          </Typography>
          <Typography component='p'>
            There are two ways to deliver a product to a buyer
          </Typography>
          <Typography component='p'>
            1. Send the product directly to them. The vendor selling the product
            may have opted to share their shipping information as part of their
            profile, or during negotiation with the buyer. The buyer can choose
            what delivery type he prefers and the vendor will deliver both
            locally and nationwide.
          </Typography>
          <Typography component='p'>
            2. The Buyer may opt to use Tinkoko’s delivery services which will
            soon be made available.
          </Typography>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default DeliveryShipping
