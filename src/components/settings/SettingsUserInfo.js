import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { useSettingsStyles } from '../../styles/styles'
import { getLoggedInUser, updateMyProfile } from '../../apis'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import SettingsNav from '../shared/vendor/SettingsNav'
import HeaderMenu from '../shared/vendor/HeaderMenu'
import FarmerImageUpload from '../shared/agent/FarmerImageUpload'
import { LoadingIcon } from '../../icons'

const SettingsUserInfo = () => {
  const classes = useSettingsStyles()
  // const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = React.useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [photo, setPhoto] = useState({})
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  console.log(photo)

  useEffect(() => {
    getUserDetails(user.token)
  }, [])

  const getUserDetails = async (token) => {
    setLoading(true)
    const res = await getLoggedInUser(token)
    if (res) {
      setLoading(false)
      setFirstName(res.user.firstName)
      setLastName(res.user.lastName)
      setEmail(res.user.email)
      setPhone(res.user.phone)
      setGender(res.user.gender)
      setUserId(res.user.userId)
      if (res?.user?.profilePicUrl) {
        setPhoto(res.user.profilePicUrl)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await updateMyProfile(
      firstName,
      lastName,
      phone,
      gender,
      location,
      photo,
      user._id,
      user.token
    )

    if (res) {
      // localStorage.setItem('tink_user', JSON.stringify(res))
      console.log(res)
      // dispatch({
      //   type: 'LOGGED_IN_USER',
      //   payload: {
      //     firstName: res.firstName,
      //     lastName: res.lastName,
      //     email: res.email,
      //     token: res.token,
      //     role: res.role,
      //     storeName: res.storeName,
      //     profilePicUrl: res.profilePicUrl,
      //     userId: res.userId,
      //     _id: res._id,
      //   },
      // })
      toast.success('Updated Successfully')
      setLoading(false)
    }
  }

  return (
    <Container>
      <HeaderMenu />
      <Box sx={{ pb: 10, pt: 12 }}>
        <Grid container spacing={4}>
          <SettingsNav />
          <Grid item xs={9}>
            <Paper elevation={5} className={classes.paper}>
              <Typography variant='h6' component='div' sx={{ py: 1 }}>
                Personal Information
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Stack spacing={5}>
                  {loadingPhoto ? (
                    <LoadingIcon />
                  ) : (
                    <FarmerImageUpload
                      images={photo}
                      setImages={setPhoto}
                      setLoading={setLoadingPhoto}
                    />
                  )}
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='firstName'>First Name</InputLabel>
                    <OutlinedInput
                      id='firstName'
                      type='text'
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      label='First Name'
                    />
                  </FormControl>

                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                    <OutlinedInput
                      id='lastName'
                      type='text'
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      label='Last Name'
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='userId'>User ID</InputLabel>
                    <OutlinedInput
                      id='userId'
                      type='text'
                      value={userId}
                      disabled
                      label='User ID'
                    />
                  </FormControl>

                  <FormControl
                    sx={{ width: '100%' }}
                    variant='outlined'
                    // color='vendor'
                  >
                    <InputLabel htmlFor='Gender'>Gender</InputLabel>
                    <Select
                      id='gender'
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label='Gender'
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='phone'>Phone</InputLabel>
                    <OutlinedInput
                      id='phone'
                      type='text'
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                      label='Phone'
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <OutlinedInput
                      id='email'
                      type='text'
                      value={email}
                      disabled
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      label='Email'
                    />
                  </FormControl>
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date desktop'
              inputFormat='MM/dd/yyyy'
              value={date}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
                </Stack>
                <Button variant='primary' fullWidth type='submit'>
                  {loading ? <LoadingIcon /> : 'Save Changes'}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SettingsUserInfo
