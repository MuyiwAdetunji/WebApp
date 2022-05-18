import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'

const AgentProvider = () => {
  return (
    <UserLayout>
      <SEO title='Become an Agent' />
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
            Become an Agent Service Provider
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <Typography component='p'>
            Tinkoko.com also gives you a platform to become an agent and act as
            a middle man between Tinkoko and other users. As an agent you get
            the benefit of representing farm owners who may not have the
            knowledge to navigate the Tinkoko website and are unaware of how to
            gain from the platform.
          </Typography>
          <Typography component='p'>
            Becoming an Agent is subject to certain physical checks / terms and
            conditions which every agent must accept before they can be
            verified.
          </Typography>
          <Typography component='p'>
            To become an agent, please{' '}
            <Link
              to='/services/become-an-agent-apply'
              style={{ color: '#7FB560' }}
              className='link'
            >
              Apply Here
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default AgentProvider
