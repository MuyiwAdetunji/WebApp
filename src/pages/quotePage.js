import React, { useState, useEffect } from 'react'
import {
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Box,
  IconButton,
  Divider,
  Paper,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import DeleteIcon from '@mui/icons-material/Delete'
import UserLayout from '../Layouts/UserLayout'
import { v4 as uuidv4 } from 'uuid'
import { submitAQuote } from '../apis'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const Quote = () => {
  const [quote, setQuote] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [item, setItem] = useState('')
  const [value, setValue] = useState(new Date())
  const [qty, setQty] = useState(10)
  const [description, setDescription] = useState('')
  const [metrics, setMetrics] = useState('')

  const dispatch = useDispatch()

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch({
      type: 'SET_MENU_VISIBLE',
      payload: false,
    })
  }, [])

  const history = useHistory()

  const submitQuote = async (e) => {
    e.preventDefault()
    const res = await submitAQuote(
      quote,
      name,
      phone,
      email,
      city,
      address,
      description
    )

    if (res) {
      history.push('/')
      toast.success("Quote Submitted, We'll get back to you shortly")
      console.log(res)
    }
  }

  // ADD ITEM TO ARRAY
  function addItem(e) {
    e.preventDefault()
    setQuote([...quote, { id: uuidv4(), qty, item, metrics }])
    setQty('10')
    setItem('')
    setMetrics('')
  }

  return (
    <UserLayout>
      <Container>
        <Grid container sx={{ py: 3 }}>
          <Grid item xs={8}>
            <Container>
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                Submit a Quote
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl
                    sx={{ width: '100%', mt: 2, my: 1 }}
                    variant='outlined'
                  >
                    <InputLabel htmlFor='name' required>
                      Company Name / Fullname
                    </InputLabel>
                    <OutlinedInput
                      required
                      id='name'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      label='Company Name / Fullname'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    sx={{ width: '100%', mt: 2, my: 1 }}
                    variant='outlined'
                  >
                    <InputLabel htmlFor='phone' required>
                      Phone
                    </InputLabel>
                    <OutlinedInput
                      id='phone'
                      type='number'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      label='Phone'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%', my: 1 }} variant='outlined'>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <OutlinedInput
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label='Email'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%', my: 1 }} variant='outlined'>
                    <InputLabel htmlFor='city' required>
                      State
                    </InputLabel>
                    <Select
                      id='city'
                      type='text'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      label='State'
                    >
                      <MenuItem value='Abia' selected>
                        Abia
                      </MenuItem>
                      <MenuItem value='Adamawa'>Adamawa</MenuItem>
                      <MenuItem value='Akwa Ibom'>Akwa Ibom</MenuItem>
                      <MenuItem value='Anambra'>Anambra</MenuItem>
                      <MenuItem value='Bauchi'>Bauchi</MenuItem>
                      <MenuItem value='Bayelsa'>Bayelsa</MenuItem>
                      <MenuItem value='Benue'>Benue</MenuItem>
                      <MenuItem value='Borno'>Borno</MenuItem>
                      <MenuItem value='Cross River'>Cross River</MenuItem>
                      <MenuItem value='Delta'>Delta</MenuItem>
                      <MenuItem value='Ebonyi'>Ebonyi</MenuItem>
                      <MenuItem value='Edo'>Edo</MenuItem>
                      <MenuItem value='Ekiti'>Ekiti</MenuItem>
                      <MenuItem value='Enugu'>Enugu</MenuItem>
                      <MenuItem value='Federal Capital Territory'>
                        Federal Capital Territory
                      </MenuItem>
                      <MenuItem value='Gombe'>Gombe</MenuItem>
                      <MenuItem value='Imo'>Imo</MenuItem>
                      <MenuItem value='Jigawa'>Jigawa</MenuItem>
                      <MenuItem value='Kaduna'>Kaduna</MenuItem>
                      <MenuItem value='Kano'>Kano</MenuItem>
                      <MenuItem value='Katsina'>Katsina</MenuItem>
                      <MenuItem value='Kebbi'>Kebbi</MenuItem>
                      <MenuItem value='Kogi'>Kogi</MenuItem>
                      <MenuItem value='Kwara'>Kwara</MenuItem>
                      <MenuItem value='Lagos'>Lagos</MenuItem>
                      <MenuItem value='Nasarawa'>Nasarawa</MenuItem>
                      <MenuItem value='Niger'>Niger</MenuItem>
                      <MenuItem value='Ogun'>Ogun</MenuItem>
                      <MenuItem value='Ondo'>Ondo</MenuItem>
                      <MenuItem value='Osun'>Osun</MenuItem>
                      <MenuItem value='Oyo'>Oyo</MenuItem>
                      <MenuItem value='Plateau'>Plateau</MenuItem>
                      <MenuItem value='Rivers'>Rivers</MenuItem>
                      <MenuItem value='Sokoto'>Sokoto</MenuItem>
                      <MenuItem value='Taraba'>Taraba</MenuItem>
                      <MenuItem value='Yobe'>Yobe</MenuItem>
                      <MenuItem value='Zamfara'>Zamfara</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%', my: 1 }} variant='outlined'>
                    <InputLabel htmlFor='address'>Address</InputLabel>
                    <OutlinedInput
                      id='email'
                      type='text'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label='Address'
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={4}>
                  <Autocomplete
                    sx={{ my: 1, width: '100%' }}
                    id='free-solo-demo'
                    freeSolo
                    options={products.map((option) => `${option.title}`)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='What do you want? e.g rice'
                      />
                    )}
                    // value={item}
                    // onChange={(e) => setItem(e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={4}>
                  <FormControl sx={{ my: 1, width: '100%' }}>
                    <InputLabel htmlFor='name' required>
                      What you need quotation for? e.g rice
                    </InputLabel>
                    <OutlinedInput
                      required
                      id='name'
                      type='text'
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      label='What you need quotation for? e.g rice'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{ my: 1, width: '100%' }}>
                    <InputLabel htmlFor='name' required>
                      Quantity
                    </InputLabel>
                    <OutlinedInput
                      required
                      id='name'
                      type='number'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      label='Quantity'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{ my: 1, width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='metrics' required>
                      Metric
                    </InputLabel>
                    <Select
                      id='metrics'
                      required
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      label='Metrics'
                    >
                      <MenuItem value='Litres' selected>
                        Litres
                      </MenuItem>
                      <MenuItem value='Kg'>Kg</MenuItem>
                      <MenuItem value='Tonnes'>Tonnes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button variant='primary' onClick={addItem} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Typography sx={{ my: 2 }} variant='subtitle2'>
                Delivery Time
              </Typography>

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label='Expected Delivery Date'
                  inputFormat='DD/MM/yyyy'
                  variant='primary'
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label='Tell us more...'
                    fullWidth
                    sx={{ my: 3 }}
                    multiline
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container>
              <Paper sx={{ p: 2 }}>
                <Typography variant='h6'>My List</Typography>
                {quote.length > 0 ? (
                  quote.map((q) => (
                    <Box
                      key={q.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        my: 2,
                      }}
                    >
                      <Box>
                        <Typography variant='body2'>{`${q.qty} ${q.metrics} of ${q.item}`}</Typography>
                        <Typography variant='body2'>
                          Quantity: {q.qty}
                        </Typography>
                      </Box>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      my: 2,
                      border: '1px solid #ccc',
                      p: 1,
                      borderRadius: '5px',
                    }}
                  >
                    <Typography variant='subtitle2'>
                      Add Items to your list
                    </Typography>
                  </Box>
                )}
                {quote.length > 0 && (
                  <Button variant='primary' fullWidth onClick={submitQuote}>
                    Submit Quote
                  </Button>
                )}
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

const products = [
  { title: 'Rice' },
  { title: 'Rice' },
  { title: 'Rice' },
  { title: 'Beans' },
  { title: 'Beans' },
  { title: 'Beans' },
  { title: 'Beans' },
  { title: 'Beans' },
  { title: 'Cassava' },
  { title: 'Cassava' },
  { title: 'Cassava' },
  { title: 'Palm Oil' },
]

export default Quote
