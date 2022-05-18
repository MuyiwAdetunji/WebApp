import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Hidden,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Box,
} from '@mui/material'
import { useSignUpPageStyles1 } from '../../styles/styles'
import phoneImage from '../../img/signIn.svg'
import AuthContext from '../../contexts/AuthContext'
import newImg from '../../img/vendorRegImg.png'
import { lgaList } from '../../citiesData/nigerianStatesData'
import { worldCities } from '../../citiesData/worldCountries'
import { registerVendor } from '../../apis'
import { toast } from 'react-toastify'
import { countries } from '../../citiesData/countries'

const VendorRegister = () => {
  const history = useHistory()
  // const auth = useContext(AuthContext)

  const firstName = localStorage.getItem('tink_firstName')
  const lastName = localStorage.getItem('tink_lastName')
  const email = localStorage.getItem('tink_email')
  const password = localStorage.getItem('tink_password')
  const phone = localStorage.getItem('tink_phone')
  const role = 'vendor'
  const isVendor = true

  const [storeName, setStoreName] = useState('')
  const [country, setCountry] = useState('')
  const [fetchLga, setFetchLga] = useState([])
  // const [worldCity, setWorldCity] = useState([])
  const [lga, setLga] = useState('')
  const [address, setAddress] = useState('')
  const [countryState, setCountryState] = useState('')
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')

  console.log('COUNTRY', country)
  console.log('STATE', countryState)
  console.log('LGA', lga)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await registerVendor(
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      isVendor,
      storeName,
      country,
      lga,
      address,
      countryState,
      description
    )

    localStorage.setItem('tink_firstName', '')
    localStorage.setItem('tink_lastName', '')
    localStorage.setItem('tink_phone', '')
    localStorage.setItem('tink_email', '')
    localStorage.setItem('tink_password', '')

    if (res) {
      history.push('/login')
      toast.success('Vaildation Email has been sent')
    } else {
      history.push('/signup')
      toast.error('Something went wrong, try again')
    }
  }

  const classes = useSignUpPageStyles1()
  return (
    <section className={classes.mainContainer}>
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
            {/* <img src={logo} alt='logo' className={classes.logo} /> */}
            <Typography
              variant='h6'
              component='div'
              sx={{ my: 3, textAlign: 'center' }}
            >
              {`Hi ${localStorage.getItem(
                'tink_firstName'
              )}, You're almost there....`}
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='storeName' required>
                  Store Name
                </InputLabel>
                <OutlinedInput
                  id='storeName'
                  type='text'
                  value={storeName}
                  required
                  onChange={(e) => {
                    setStoreName(e.target.value)
                  }}
                  label='Store Name'
                />
              </FormControl>

              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='address' required>
                  Address
                </InputLabel>
                <OutlinedInput
                  id='address'
                  required
                  type='text'
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                  label='Address'
                />
              </FormControl>

              <Autocomplete
                id='country-select-demo'
                fullWidth
                sx={{ my: 2 }}
                options={countries}
                onChange={handleCountryChange}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component='li'
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading='lazy'
                      width='20'
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=''
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Choose Country'
                    required
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />

              {country === 'Nigeria' && (
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='state' required>
                    State
                  </InputLabel>
                  <Select label='State' required onChange={handleStateChange}>
                    {Object.keys(lgaList).map((s, i) => (
                      <MenuItem key={i} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {loading && <>Loading</>}
              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='state' required>
                  {country === 'Nigeria' ? 'LGA' : 'City'}
                </InputLabel>
                <Select
                  label='LGA'
                  required
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
                {/* <OutlinedInput
                    id='state'
                    required
                    type='text'
                    value={countryState}
                    onChange={(e) => {
                      setCountryState(e.target.value)
                    }}
                    label='State'
                  /> */}
              </FormControl>

              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <TextField
                  label='Shop Description'
                  placeholder='What do you want to sell?'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  sx={{ width: '100%', my: 2 }}
                />
              </FormControl>
              <Button
                variant='primary'
                type='submit'
                className={classes.button}
              >
                SET UP MY SHOP
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </section>
  )
}

export default VendorRegister
