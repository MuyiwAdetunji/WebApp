import { Button, Divider, Grid, Paper, Typography } from '@mui/material'

import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSettingsNavStyles } from '../../../styles/styles'
import { useSelector, useDispatch } from 'react-redux'

const SettingsNav = () => {
  const history = useHistory()

  const classes = useSettingsNavStyles()

  const dispatch = useDispatch()

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    localStorage.setItem('tink_user', null)
    history.push('/login')
  }

  return (
    <Grid item xs={3}>
      <Paper elevation={6} className={classes.paper}>
        <Typography variant='h6' component='div' sx={{ py: 1 }}>
          Settings
        </Typography>
        <Divider />

        <Typography
          variant='subtitle2'
          component='body'
          sx={{ py: 2, cursor: 'pointer' }}
          onClick={() => history.push('/settings/personal-information')}
        >
          Personal Information
        </Typography>
        <Divider />
        <Typography
          variant='subtitle2'
          component='body'
          sx={{ py: 2, cursor: 'pointer' }}
          onClick={() => history.push('/settings/business-information')}
        >
          Business Information
        </Typography>
        <Divider />

        {/* <Typography variant='subtitle2' component='body' sx={{ py: 2, cursor: 'pointer' }}>
          Manage Notification
        </Typography> */}

        <Typography
          variant='subtitle2'
          component='body'
          sx={{ py: 2, cursor: 'pointer' }}
          onClick={() => history.push('/settings/change-password')}
        >
          Change Password
        </Typography>
        <Divider />
        <Typography
          variant='subtitle2'
          component='body'
          sx={{ py: 2, cursor: 'pointer' }}
        >
          Delete Account
        </Typography>
        <Divider />
        <Button variant='primary' className={classes.button} onClick={logout}>
          Logout
        </Button>
      </Paper>
    </Grid>
  )
}

export default SettingsNav
