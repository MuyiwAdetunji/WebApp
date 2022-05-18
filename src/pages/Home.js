import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import TopCarousel from '../components/TopCarousel'
import UserLayout from '../Layouts/UserLayout'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ProductCard from '../components/cards/ProductCard'
import BuyNow from '../img/buy-now.jpg'
import JobCard from '../components/jobs/JobCard'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SearchNav from '../components/shared/SearchNav'
import FooterBanner from '../img/footerBanner.jpg'
import { getPopularProducts, getPopularJobs } from '../apis'

const Home = () => {
  const [products, setProducts] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    loadAllJobs()
  }, [])

  const loadAllJobs = async () => {
    const res = await getPopularJobs()

    if (res) {
      setJobs(res.doc)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    const res = await getPopularProducts()

    if (res) {
      setLoading(false)
      setProducts(res)
    }
  }

  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: '#e5e5e5',
        }}
      >
        <Grid container spacing={1}>
          <Hidden mdDown>
            <Grid item xs={2} sm={2} md={3} lg={3}>
              <SearchNav />
            </Grid>
          </Hidden>

          <Grid item xs={12} md={9} lg={9}>
            <TopCarousel />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: '3rem 0',
          backgroundColor: 'secondary.dark',
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '1.3rem',
            }}
          >
            <Typography component='h2' variant='h6'>
              Popular Products
            </Typography>

            <Link
              to='/products'
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <Typography component='p' variant='h6'>
                See all
              </Typography>{' '}
              <ArrowForwardIcon />
            </Link>
          </Box>
          <Box sx={{ marginBottom: '2rem' }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={6} md={3} sm={4} lg={2} key={product._id}>
                  <ProductCard
                    product={product}
                    onClick={() => history.push(`/product/${product.slug}`)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        <Box
          sx={{
            background: `url(${BuyNow}) no-repeat center center/cover`,
            height: '30vh',
            position: 'relative',
            marginBottom: '2rem',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '45%',
              right: '5%',
              width: '25%',
            }}
          >
            <Button>Buy Now</Button>
          </Box>
        </Box>
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '1.3rem',
            }}
          >
            <Typography component='h2' variant='h6'>
              Jobs
            </Typography>
            <Link
              to='/'
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <Typography component='p' variant='h6'>
                See all
              </Typography>{' '}
              <ArrowForwardIcon />
            </Link>
          </Box>
          <Box sx={{ marginBottom: '2rem' }}>
            <Grid container spacing={4}>
              {jobs.length > 0 &&
                jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onClick={() => {
                      history.push(`/jobs/${job._id}`)
                    }}
                  />
                ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          background: `url(${FooterBanner})`,
          // backgroundPosition: '20%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          objectFit: 'cover',
          height: '40vh',
        }}
      >
        {/* <img
          src={FooterBanner}
          alt='footer'
          style={{ height: '30vh', objectFit: 'cover' }}
        /> */}
      </Box>
      <Hidden mdUp>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          >
            <BottomNavigationAction
              label='Home'
              icon={<HomeSharpIcon color='primary' />}
            />
            <BottomNavigationAction
              label='Submit Quote'
              icon={<RequestQuoteIcon color='primary' />}
            />
            <BottomNavigationAction
              label='Buy Now'
              icon={<LocalMallIcon color='primary' />}
            />
            <BottomNavigationAction
              label='Find A Truck'
              icon={<LocalShippingIcon color='primary' />}
            />
          </BottomNavigation>
        </Paper>
      </Hidden>
    </UserLayout>
  )
}

export default Home
