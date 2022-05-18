import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/Seo'
import UserLayout from '../../Layouts/UserLayout'
import { lgaList } from '../../citiesData/nigerianStatesData'
import { worldCities } from '../../citiesData/worldCountries'
import { countries } from '../../citiesData/countries'

const AgentApply = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [identification, setIdentification] = useState('')
  const [country, setCountry] = useState('')
  const [fetchLga, setFetchLga] = useState([])
  const [loading, setLoading] = useState(false)
  const [lga, setLga] = useState('')
  const [address, setAddress] = useState('')
  const [countryState, setCountryState] = useState('')
  const [other, setOther] = useState('')

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

  return (
    <UserLayout>
      <SEO title='Apply to Become an Agent' />
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
            Apply
          </Typography>
          <Typography color='#fff' variant='h1' sx={{ fontWeight: 'bold' }}>
            Become an Agent
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box sx={{ width: 500, m: '1rem auto' }}>
          <Stack spacing={2}>
            <FormControl sx={{ width: '100%' }} variant='outlined'>
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
            <FormControl sx={{ width: '100%' }} variant='outlined'>
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

            <FormControl sx={{ width: '100%' }} variant='outlined'>
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
            <FormControl sx={{ width: '100%' }} variant='outlined'>
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
            <FormControl sx={{ width: '100%' }}>
              <InputLabel htmlFor='means-of-identification' required>
                Means of Identification
              </InputLabel>
              <Select
                id='means-of-identification'
                required
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                label='Means of Identification'
              >
                <MenuItem value='NIN'>NIN</MenuItem>
                <MenuItem value='International Passport'>
                  International Passport
                </MenuItem>
                <MenuItem value="Driver's License">Driver's License</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
            </FormControl>
            {identification === 'other' && (
              <FormControl sx={{ width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='other'>
                  Provide means of identification
                </InputLabel>
                <OutlinedInput
                  id='other'
                  type='other'
                  value={other}
                  onChange={(e) => {
                    setOther(e.target.value)
                  }}
                  label='Provide means of identification'
                />
              </FormControl>
            )}
            <FormControl
              sx={{ my: 2, width: '100%' }}
              variant='outlined'
              color='vendor'
            >
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
              color='vendor'
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
              <FormControl
                sx={{ my: 2, width: '100%' }}
                variant='outlined'
                color='vendor'
              >
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
            <Button variant='primary'>Become an Agent</Button>
          </Stack>
        </Box>
      </Container>
    </UserLayout>
  )
}

export default AgentApply
