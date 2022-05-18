import React, { useState, useContext, useEffect } from 'react'
import {
  AppBar,
  Button,
  Container,
  Grid,
  Menu,
  Modal,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Pagination,
  Select,
  Dialog,
  DialogContent,
  Badge,
} from '@mui/material'
import { BsShop } from 'react-icons/bs'
import { BiRss } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { Box } from '@mui/system'
import AuthContext from '../../contexts/AuthContext'
import { useFarmersPageStyles } from '../../styles/agentStyle'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import AgentFarmerCard from '../../components/cards/AgentFarmerCard'
import { createFarmer, getMyFarmers } from '../../apis'
import AgentHeader from '../../components/shared/agent/Header'
import AgentNavbar from '../../components/shared/agent/NavBar'
import FarmerImageUpload from '../../components/shared/agent/FarmerImageUpload'
import { LoadingIcon } from '../../icons'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Farmers = () => {
  const classes = useFarmersPageStyles()
  const [open, setOpen] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)
  const handleOpenUser = () => setOpenUser(true)
  const handleCloseUser = () => setOpenUser(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [nextOfKin, setNextOfKin] = useState('')
  const [nextOfKinPhone, setNextOfKinPhone] = useState('')
  const [photo, setPhoto] = useState({})
  const [farmers, setFarmers] = useState([])
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  const [page, setPage] = useState(1)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    loadMyFarmers(user._id, page)
  }

  // const auth = useContext(AuthContext)
  const history = useHistory()

  // const { search } = useLocation()

  // const page = new URLSearchParams(search).get('page')

  useEffect(() => {
    loadMyFarmers(user._id, page)
  }, [])

  const loadMyFarmers = async (id, page) => {
    const res = await getMyFarmers(id, page)
    if (res) {
      // console.log(res)
      setFarmers(res.doc)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await createFarmer(
      fullName,
      phone,
      address,
      state,
      country,
      nextOfKin,
      nextOfKinPhone,
      photo,
      user._id,
      user.token
    )
    if (res) {
      history.push('/agent')
      setFullName('')
      setPhone('')
      setAddress('')
      setState('')
      setCountry('')
      setNextOfKin('')
      setNextOfKinPhone('')
      setPhoto({})
      setOpen(false)
    }
  }
  return (
    <>
      <Container>
        <AgentHeader />
        <AgentNavbar />

        <div className={classes.lead}>
          {farmers.length === 0 ? (
            <Typography variant='p' component='h4' sx={{ my: 4 }}>
              You don't have a registered farmer
            </Typography>
          ) : (
            <Typography>
              You are currently handling {farmers.length} farmers
            </Typography>
          )}

          <div className={classes.buttonContainer}>
            {/* <Button variant='agent-plain' startIcon={<SettingsIcon />}>
              Delete
            </Button> */}

            <Button
              variant='agent'
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              New Farmer
            </Button>
          </div>
        </div>

        <Grid container spacing={3}>
          {farmers &&
            farmers.length > 0 &&
            farmers.map((farmer) => (
              <AgentFarmerCard
                key={farmer._id}
                photo={farmer.photo.url}
                name={farmer.fullName.toUpperCase()}
                phone={farmer.phone}
                address={farmer.address}
                state={farmer.state}
                country={farmer.country}
                nextOfKin={farmer.nextOfKin}
                nextOfKinPhone={farmer.nextOfKinPhone}
              />
            ))}
        </Grid>

        <Box sx={{ py: 7 }}>
          <Pagination
            count={2}
            page={page}
            onChange={handlePageChange}
            color='agent'
            variant='outlined'
          />
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {loadingPhoto ? (
                  <LoadingIcon />
                ) : (
                  <FarmerImageUpload
                    images={photo}
                    setImages={setPhoto}
                    setLoading={setLoadingPhoto}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ mb: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='name' required>
                    Full Name
                  </InputLabel>
                  <OutlinedInput
                    id='name'
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label='Full Name'
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ mb: 2, width: '100%' }} variant='outlined'>
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
              <Grid item md={6} xs={12}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='state' required>
                    State
                  </InputLabel>
                  <Select
                    id='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    label='State'
                  >
                    <MenuItem value={10}>Abia</MenuItem>
                    <MenuItem value={20}>Adamawa</MenuItem>
                    <MenuItem value={30}>Akwa Ibom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='country' required>
                    Country
                  </InputLabel>
                  <Select
                    id='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label='Country'
                  >
                    <MenuItem value='Nigeria'>Nigeria</MenuItem>
                    <MenuItem value='China'>China</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='address' required>
                    Address
                  </InputLabel>
                  <OutlinedInput
                    id='address'
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    label='Address'
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='next-kin-name' required>
                    Name of Next of Kin
                  </InputLabel>
                  <OutlinedInput
                    id='next-kin-name'
                    type='text'
                    value={nextOfKin}
                    onChange={(e) => setNextOfKin(e.target.value)}
                    label='Name of Next of Kin'
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='next-kin-phone' required>
                    Phone Number of Next of Kin
                  </InputLabel>
                  <OutlinedInput
                    id='next-kin-phone'
                    type='number'
                    value={nextOfKinPhone}
                    onChange={(e) => setNextOfKinPhone(e.target.value)}
                    label='Phone Number of Next of Kin'
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button variant='agent' className={classes.button} type='submit'>
                Submit
              </Button>
            </Box>
          </form>
          {/* </Box> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Farmers
