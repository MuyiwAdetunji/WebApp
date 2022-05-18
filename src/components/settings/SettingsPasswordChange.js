import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Box,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSettingsStyles } from '../../styles/styles'
import { updatePassword } from '../../apis'
import { useLocation } from 'react-router-dom'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import HeaderMenu from '../shared/vendor/HeaderMenu'
import SettingsNav from '../shared/vendor/SettingsNav'

const SettingsPasswordChange = () => {
  const classes = useSettingsStyles()
  // const auth = useContext(AuthContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (newPassword !== reNewPassword) {
        toast.error('New passwords do not match')
      } else {
        const res = await updatePassword(oldPassword, newPassword, user.token)

        if (res) {
          if (res.status === 'success') {
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

              setLoading(false)
              toast.success('Password Updated Successfully')
              setOldPassword('')
              setNewPassword('')
              setReNewPassword('')
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
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
                Change Password
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Stack spacing={5}>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='password'>Old Password</InputLabel>
                    <OutlinedInput
                      required
                      id='password'
                      type='password'
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      label='Old Password'
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='password'>New Password</InputLabel>
                    <OutlinedInput
                      required
                      id='password'
                      type='password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      label='New Password'
                    />
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='password'>Retype Password</InputLabel>
                    <OutlinedInput
                      required
                      id='password'
                      type='password'
                      value={reNewPassword}
                      onChange={(e) => setReNewPassword(e.target.value)}
                      label='Retype Password'
                    />
                  </FormControl>
                </Stack>
                <Button variant='primary' fullWidth type='submit'>
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

export default SettingsPasswordChange
