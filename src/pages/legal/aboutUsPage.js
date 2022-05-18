import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const AboutUs = () => {
  return (
    <UserLayout>
      <SEO title='About Us' />
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
            About Us
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p'>
            Tinkoko is an African Agro e- commerce company based in Nigeria. The
            Company is Pioneered to bridge the gap between Farmers and
            customers, assist the buying and Selling of Agricultural Products
            and Services while providing a customer centric platform for perfect
            consumer satisfaction.
          </Typography>
          <Typography component='p'>
            Tinkoko aims at providing an online market place for Farmers,
            Agri-preneurs, Agri-investors, and Consumers to meet and transact on
            a trusted &amp; reliable Platform.
          </Typography>
          <Typography component='p'>
            Tinkoko.com brings you millions of agricultural products and
            services in real time which include but is not limited to:
          </Typography>
          <Typography component='p'>-Machinery</Typography>
          <Typography component='p'>-Farm produce</Typography>
          <Typography component='p'>-Loan</Typography>
          <Typography component='p'>-Financing</Typography>
          <Typography component='p'>-Logistics</Typography>
          <Typography component='p'>-Storage Units</Typography>
          <Typography component='p'>-Farm Workers</Typography>
          <Typography component='p'>-Alticulturist.</Typography>
          <Typography component='p'>
            We also provide a link for persons who will like to work as Agents
            with the company.
          </Typography>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default AboutUs
