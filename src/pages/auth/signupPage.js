import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Hidden,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  Box,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useSignUpPageStyles1 } from '../../styles/styles'
import logo from '../../img/logo.png'
import newImg from '../../img/signup20.png'
import SEO from '../../components/shared/Seo'
import { useSelector } from 'react-redux'
import { register } from '../../apis'
import { toast } from 'react-toastify'

const SignUp = () => {
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) {
      history.replace('/')
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (role === '') {
      window.alert('One Field is missing: Register as')
    } else if (role === 'vendor') {
      localStorage.setItem('tink_firstName', firstName)
      localStorage.setItem('tink_lastName', lastName)
      localStorage.setItem('tink_phone', phone)
      localStorage.setItem('tink_email', email)
      localStorage.setItem('tink_password', password)

      history.push('/signup/vendor')
    } else if (role === 'agent') {
      localStorage.setItem('tink_firstName', firstName)
      localStorage.setItem('tink_lastName', lastName)
      localStorage.setItem('tink_phone', phone)
      localStorage.setItem('tink_email', email)
      localStorage.setItem('tink_password', password)
      history.push('/signup/agent')
    } else {
      const res = await register(
        firstName,
        lastName,
        phone,
        email,
        password,
        role
      )

      if (res) {
        history.push('/')
        toast.success('Vaildation Email has been sent')
      }
    }
  }

  const classes = useSignUpPageStyles1()
  return (
    <section className={classes.mainContainer}>
      <SEO title='Register' />
      <Grid container>
        <Hidden mdDown>
          <Grid
            item
            xs={6}
            sx={{
              backgroundImage: `url(${newImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
            }}
          ></Grid>
        </Hidden>
        <Grid item xs={12} md={6} className={classes.grid}>
          <Paper className={classes.paper} elevation={0}>
            <img
              src={logo}
              alt='logo'
              className={classes.logo}
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='firstName' required>
                  First Name
                </InputLabel>
                <OutlinedInput
                  id='firstName'
                  type='text'
                  value={firstName}
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  label='First Name'
                />
              </FormControl>

              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='lastName' required>
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id='lastName'
                  required
                  type='text'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  label='Last Name'
                />
              </FormControl>

              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='phone' required>
                  Phone
                </InputLabel>
                <OutlinedInput
                  id='phone'
                  type='number'
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                  label='Phone'
                />
              </FormControl>
              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='email' required>
                  Email
                </InputLabel>
                <OutlinedInput
                  id='email'
                  required
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  label='Email'
                />
              </FormControl>
              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='password' required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='password'
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>

              <Typography variant='subtitle2'>Register as</Typography>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    // variant='plain'
                    variant={role === 'user' ? 'primary-register' : 'plain'}
                    className={classes.socialButton}
                    onClick={() => setRole('user')}
                  >
                    Buyer
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant={role === 'vendor' ? 'primary-register' : 'plain'}
                    className={classes.socialButton}
                    onClick={() => setRole('vendor')}
                  >
                    Seller
                  </Button>
                </Grid>
                {/* <Grid item xs={4}>
                    <Button
                      variant={role === 'agent' ? 'agent-register' : 'plain'}
                      className={classes.socialButton}
                      onClick={() => setRole('agent')}
                    >
                      Agent
                    </Button>
                  </Grid> */}
              </Grid>
              <Typography variant='body2'>
                <Checkbox required />
                By clicking, you agree to{' '}
                <Link
                  to='/legal/membership-agreement'
                  style={{ textDecoration: 'none', color: '#7AB259' }}
                >
                  membership agreement
                </Link>
              </Typography>
              <Button
                variant={
                  role === 'vendor'
                    ? 'primary'
                    : role === 'agent'
                    ? 'primary'
                    : role === 'user'
                    ? 'primary'
                    : 'black'
                }
                // variant='black'
                type='submit'
                className={classes.button}
              >
                {role === 'vendor'
                  ? 'CONTINUE AS MERCHANT'
                  : role === 'agent'
                  ? 'CONTINUE AS AGENT'
                  : 'SIGN UP'}
              </Button>
            </form>
          </Paper>
          <Box sx={{ marginTop: '2rem' }}>
            <Paper elevation={0} className={classes.paper}>
              <Link to='/login' className='link'>
                <Typography variant='body2'>
                  Already have an account? Login
                </Typography>
              </Link>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </section>
  )
}

export default SignUp
