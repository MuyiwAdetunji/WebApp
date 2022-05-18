import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  Button,
  Hidden,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLoginPageStyles } from '../../styles/styles'
import logo from '../../img/logo.png'
import phoneImage from '../../img/signUp.svg'
import { resetPassword } from '../../apis'
import { toast } from 'react-toastify'
import SEO from '../../components/shared/Seo'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const history = useHistory()

  useEffect(() => {
    if (user && user.token) {
      history.replace('/feed')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await resetPassword(email)

    if (res) {
      console.log(res)
      setLoading(false)
    }
  }

  const classes = useLoginPageStyles()
  return (
    <section className={classes.mainContainer}>
      <SEO title='Reset Password' />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item xs={6} className={classes.imageGrid}>
              <img className={classes.image} src={phoneImage} alt='banner' />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6} className={classes.grid}>
            <Paper className={classes.paper} elevation={0}>
              <img
                src={logo}
                alt='logo'
                className={classes.logo}
                onClick={() => {
                  history.push('/')
                }}
                style={{ cursor: 'pointer' }}
              />
              <form onSubmit={handleSubmit}>
                <Typography variant='body2' sx={{ py: 3 }}>
                  To reset your password, enter your email below and submit. An
                  email will be sent to you with instructions about how to
                  complete the process.
                </Typography>
                <FormControl
                  sx={{ mb: 2, width: '100%' }}
                  variant='outlined'
                  required
                >
                  <InputLabel htmlFor='email'>Enter Valid Email</InputLabel>
                  <OutlinedInput
                    required
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Enter Valid Email'
                  />
                </FormControl>

                <Button
                  variant='black'
                  type='submit'
                  className={classes.socialButton}
                >
                  Submit
                </Button>
              </form>

              <Box sx={{ marginTop: '1.2rem' }}>
                <Link to='/login' className='link'>
                  <Typography variant='body2'>
                    Know your password? Login
                  </Typography>
                </Link>
              </Box>
            </Paper>
            <Box sx={{ marginTop: '2rem' }}>
              <Paper elevation={0} className={classes.paper}>
                <Link to='/signup' className='link'>
                  <Typography variant='body2'>
                    Don't have an account? Sign up
                  </Typography>
                </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default ForgotPassword
