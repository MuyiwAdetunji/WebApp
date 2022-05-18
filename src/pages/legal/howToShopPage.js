import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const HowToShop = () => {
  return (
    <UserLayout>
      <SEO title='How to Shop' />
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
            How to Shop
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p'>
            AT TINKOKO, WE WELCOME ALL CONSUMERS TO SHOP. WE CREATED A HASSLE
            FREE SHOPPING EXPERIENCE FOR ALL BUYERS. IN A FEW EASY STEPS BELOW
            YOU CAN CONVENIENGTLY SHOP ALL YOUR AGRICULTURAL PRODUCTS:
          </Typography>
          <Typography component='p'>
            Tinkoko does not sell any products of our own. When a product is
            purchased, the purchase is made on the website through the vendors
            store. You’ll have to contact that retailer directly.
          </Typography>
          <Typography component='p'>
            1. CREATE AN ACCOUNT: Click on the sign up Page and Register as a
            buyer by Accepting our Privacy Policy Terms of Use and Vendors terms
            you agree to comply with our stipulated mode of operation.
          </Typography>
          <Typography component='p'>
            2. Submit Your Details: Tinkoko will ask for personal details like
            your name, address and your e-mail address which will be used to
            verify your account.
          </Typography>
          <Typography component='p'>
            3. Browse through all categories to see the range of goods and
            products we sell.
          </Typography>
          <Typography component='p'>
            4. You can also go through our Newsfeed which we use to keep you
            updated on recent news on agricultural SPACE, At tinkoko.com we do
            not only aim to provide a safe space to buy quality products but
            also a platform to keep you informed and updated through well
            researched blog posts and articles.
          </Typography>
          <Typography component='p'>
            5. You can Submit a Quote; using the ‘submit a quote’ feature all
            users can make particular orders of specific products and quantity
            needed.
          </Typography>
          <Typography component='p'>
            6. Our Jobs Feature also gives users the opportunity to advertise
            and get jobs online.
          </Typography>
          <Typography component='p' variant='h6'>
            STEPS TO PLACE AN ORDER FROM A VENDOR
          </Typography>
          <Typography component='p'>
            1. A buyer who has found a product and is interested in making a
            purchase may add to cart using the ‘Add to cart button’.
          </Typography>
          <Typography component='p'>
            2. CONTACT THE VENDOR On the Website or app.
          </Typography>
          <Typography component='p'>
            3. Confirm the Purchase Price by contacting the vendor of each
            product and resolving all shipping and delivery details with the
            vendor.
          </Typography>
          <Typography component='p'>
            4. CHECKOUT your order which you have added to your cart
          </Typography>
          <Typography component='p'>
            5. Make Payment either through the app using TINKOKO SECURED or
            through direct transfer to the vendor.
          </Typography>
          <Typography component='p'>
            6. Once the vendor acknowledges payment delivery will be made.
          </Typography>
          <Typography component='p'>
            7. You are to confirm delivery when you have received your product
            by Notifying Tinkoko upon receipt of the purchased products.
          </Typography>
          <Typography component='p'>
            8. GIVE US A POSITIVE FEEDBACK AND SHARE TO YOUR FRIENDS AND FAMILY.
          </Typography>
          <Typography component='p' variant='h6'>
            Things to Note: Tinkoko offers various payment and delivery methods
            to ensure ease of Business our payment platform known as Tinkoko
            secured ensures payment is swift and easy, other payments options
            are also made available. We hope you enjoy Exceptional user
            satisfaction while using our platform.
          </Typography>
          <Typography component='p' variant='h6'>
            Happy Shopping!
          </Typography>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default HowToShop
