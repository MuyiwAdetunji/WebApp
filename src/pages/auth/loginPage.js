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
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useLoginPageStyles } from '../../styles/styles'
import logo from '../../img/logo.png'
import apple from '../../img/apple.png'
import playstore from '../../img/playstore.png'
import phoneImage from '../../img/signUp.svg'
import { signIn } from '../../apis'
import { toast } from 'react-toastify'
import SEO from '../../components/shared/Seo'
import { LoadingIcon } from '../../icons'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const history = useHistory()

  useEffect(() => {
    let intended = history.location.state

    if (intended) {
      return
    } else {
      // if (user && user.token) history.replace('/')
      if (user && user.token) {
        if (user.role === 'admin') {
          history.replace('/admin')
        } else if (user.role === 'vendor') {
          if (user?.interests?.length < 1) {
            history.replace('/interests')
          } else {
            history.replace('/dashboard')
          }
        } else if (user.role === 'agent') {
          history.replace('/dashboard')
        } else {
          history.replace('/feed')
        }
      }
    }
  }, [user, history])

  let dispatch = useDispatch()

  const roleBasedRedirect = (res) => {
    let intended = history.location.state
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.role === 'vendor') {
        if (res?.interests?.length < 1) {
          history.push('/interests')
        } else {
          history.push('/dashboard')
        }
      } else if (res.role === 'admin') {
        history.push('/admin')
      } else if (res.role === 'agent') {
        history.push('/dashboard')
      } else {
        history.push('/feed')
      }
    }
  }

  // useEffect(() => {
  //   if (user && user.token) {
  //     history.replace('/')
  //   }
  // }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn(email, password)

    if (res) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tink_user', JSON.stringify(res))
      }

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          token: res.token,
          role: res.role,
          storeName: res.storeName,
          profilePicUrl: res.profilePicUrl,
          userId: res.userId,
          _id: res._id,
        },
      })

      roleBasedRedirect(res)
      setLoading(false)
    }
    setLoading(false)
  }

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   setLoading(true)

  //   signIn(email, password)
  //     .then((res) => {
  //       if (typeof window !== 'undefined') {
  //         localStorage.setItem('tink_user', JSON.stringify(res))
  //       }

  //       dispatch({
  //         type: 'LOGGED_IN_USER',
  //         payload: {
  //           firstName: res.firstName,
  //           lastName: res.lastName,
  //           email: res.email,
  //           token: res.token,
  //           role: res.role,
  //           storeName: res.storeName,
  //           profilePicUrl: res.profilePicUrl,
  //           _id: res._id,
  //         },
  //       })

  //       roleBasedRedirect(res)
  //     })
  //     .catch((err) => {
  //       toast.error(err.message)
  //       setLoading(false)
  //     })
  // }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const classes = useLoginPageStyles()
  return (
    <section className={classes.mainContainer}>
      <SEO title='Login' />
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
              <form onSubmit={handleLogin}>
                <FormControl
                  sx={{ mb: 2, width: '100%' }}
                  variant='outlined'
                  required
                >
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <OutlinedInput
                    required
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                  />
                </FormControl>
                <FormControl
                  sx={{ my: 2, width: '100%' }}
                  variant='outlined'
                  required
                >
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    required
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <Button
                  variant='primary'
                  type='submit'
                  className={classes.socialButton}
                >
                  {loading ? <LoadingIcon /> : 'LOGIN'}
                </Button>
              </form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: '100%',
                      my: 3,
                      background: '#000',
                      borderRadius: '10px',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={apple} width='25px' alt='' />
                    <Box sx={{ color: '#fff' }}>
                      <Typography sx={{ fontSize: 10, textAlign: 'center' }}>
                        Download on the
                      </Typography>
                      <Typography
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        App Store
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: '100%',
                      my: 3,
                      background: '#000',
                      borderRadius: '10px',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={playstore} width='25px' alt='' />
                    <Box sx={{ color: '#fff' }}>
                      <Typography sx={{ fontSize: 10, textAlign: 'center' }}>
                        Get it on
                      </Typography>
                      <Typography
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        Google Play
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Button variant='black' className={classes.socialButton}>
                    PLAYSTORE
                  </Button> */}
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '1.2rem' }}>
                <Typography
                  variant='body2'
                  onClick={() => history.push('/forgot-password')}
                  sx={{ cursor: 'pointer' }}
                >
                  Forgot Password?
                </Typography>
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

export default Login
