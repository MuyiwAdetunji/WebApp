import {
  Autocomplete,
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
import { getLoggedInUser, updateMyBusinessProfile } from '../../apis'
import { useDispatch, useSelector } from 'react-redux'
import SettingsNav from '../shared/vendor/SettingsNav'
import HeaderMenu from '../shared/vendor/HeaderMenu'
import { lgaList } from '../../citiesData/nigerianStatesData'
import { worldCities } from '../../citiesData/worldCountries'
import { toast } from 'react-toastify'

const SettingsBusinessInfo = () => {
  const classes = useSettingsStyles()
  // const auth = useContext(AuthContext)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const [storeName, setStoreName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const [country, setCountry] = useState('')
  const [fetchLga, setFetchLga] = useState([])
  const [lga, setLga] = useState('')
  const [countryState, setCountryState] = useState('')

  useEffect(() => {
    getUserDetails(user.token)
  }, [])

  const handleCountryChange = (e, v) => {
    e.preventDefault()
    setLoading(true)
    setCountry(v.label)
    setFetchLga(worldCities[v.label])
    setLoading(false)
  }

  const handleStateChange = async (e) => {
    e.preventDefault()
    const value = e.target.value
    setCountryState(value)

    setFetchLga(lgaList[value])
  }

  const getUserDetails = async (token) => {
    setLoading(true)
    const res = await getLoggedInUser(token)
    if (res) {
      console.log('CITYYYY', res.user.city)
      setLoading(false)
      setAddress(res.user.address)
      setDescription(res.user.description)
      setStoreName(res.user.storeName)
      setCountry(res.user.country)
      setLga(res.user.city)
      setCountryState(res.user.state)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await updateMyBusinessProfile(
      storeName,
      description,
      address,
      country,
      lga,
      countryState,
      user._id,
      user.token
    )
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
                Business Information
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Stack spacing={5}>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='businessName'>
                      Business Name
                    </InputLabel>
                    <OutlinedInput
                      id='businessName'
                      type='text'
                      value={storeName}
                      onChange={(e) => {
                        setStoreName(e.target.value)
                      }}
                      label='Business Name'
                    />
                  </FormControl>

                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    {/* <InputLabel htmlFor='description'>About Company</InputLabel> */}
                    <TextField
                      label='Shop Description'
                      placeholder='What do you want to sell?'
                      color='vendor'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={5}
                      sx={{ width: '100%' }}
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='description'>Address</InputLabel>
                    <OutlinedInput
                      id='address'
                      type='text'
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                      label='Address'
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='description'>Country</InputLabel>
                    <OutlinedInput
                      id='country'
                      type='text'
                      value={country}
                      label='Country'
                      disabled
                    />
                  </FormControl>
                  {country === 'Nigeria' && (
                    <FormControl
                      sx={{ my: 2, width: '100%' }}
                      variant='outlined'
                      color='vendor'
                    >
                      <InputLabel htmlFor='state' required>
                        State
                      </InputLabel>
                      <Select
                        label='State'
                        required
                        onChange={handleStateChange}
                        value={countryState}
                      >
                        {Object.keys(lgaList).map((s, i) => (
                          <MenuItem key={i} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  <FormControl
                    sx={{ my: 2, width: '100%' }}
                    variant='outlined'
                    color='vendor'
                  >
                    <InputLabel htmlFor='state' required>
                      {country === 'Nigeria' ? 'LGA' : 'City'}
                    </InputLabel>
                    <Select
                      label='LGA'
                      required
                      value={lga}
                      onChange={(e) => {
                        setLga(e.target.value)
                      }}
                    >
                      {fetchLga.length > 0 ? (
                        fetchLga.map((s, i) => (
                          <MenuItem key={i} value={s}>
                            {s}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Select Country First</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Stack>
                <Button type='submit' variant='primary' fullWidth>
                  Save Changes
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SettingsBusinessInfo
