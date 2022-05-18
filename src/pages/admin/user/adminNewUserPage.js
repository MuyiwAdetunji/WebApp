import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { useAdminNewEmailStyles } from '../../../styles/adminStyle'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import { sendEmail } from '../../apis'
import { useDispatch, useSelector } from 'react-redux'
import { lgaList } from '../../../citiesData/nigerianStatesData'
import { worldCities } from '../../../citiesData/worldCountries'
import { countries } from '../../../citiesData/countries'
import SEO from '../../../components/shared/Seo'

const NewUser = () => {
  const classes = useAdminNewEmailStyles()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [fetchLga, setFetchLga] = useState([])
  const [loading, setLoading] = useState(false)
  const [lga, setLga] = useState('')
  const [address, setAddress] = useState('')
  const [countryState, setCountryState] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

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

    // const res = await sendEmail(
    //   senderName,
    //   sender,
    //   receiverEmails,
    //   subject,
    //   body,
    //   user.token
    // )
  }

  return (
    <AdminLayout title='New User'>
      <SEO title='Create New User' />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel htmlFor='name' required>
                First Name
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                label='First Name'
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='name' required>
                Last Name
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                label='Last Name'
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='name' required>
                Email
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email'
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='password' required>
                Password
              </InputLabel>
              <OutlinedInput
                id='password'
                required
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='phone' required>
                Phone
              </InputLabel>
              <OutlinedInput
                id='phone'
                required
                type='number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label='Phone'
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='role' required>
                Role
              </InputLabel>
              <Select
                id='role'
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label='Role'
              >
                <MenuItem value='agent'>Agent</MenuItem>
                <MenuItem value='staff'>Staff</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='gender' required>
                Gender
              </InputLabel>
              <Select
                id='gender'
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label='Gender'
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Prefer not to say</MenuItem>
              </Select>
            </FormControl>

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

            <Button variant='primary' type='submit'>
              Register
            </Button>
          </Stack>
        </form>
      </div>
    </AdminLayout>
  )
}

export default NewUser
