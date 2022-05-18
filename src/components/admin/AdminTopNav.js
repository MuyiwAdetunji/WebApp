import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  Divider,
  Box,
  Button,
  Stack,
} from '@mui/material'
import React from 'react'
import { useAdminTopNavStyles } from '../../styles/adminStyle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Link, useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const AdminTopNav = ({ title }) => {
  const classes = useAdminTopNavStyles()

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    localStorage.setItem('tink_user', null)
    history.push('/login')
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant='h4' component='h2'>
            {title}
          </Typography>
        </div>
        <div className={classes.avatarNotify}>
          <NotificationsIcon />
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ width: 24, height: 24 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user.profilePicUrl} sx={{ width: 24, height: 24 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box
              sx={{
                p: 2,
                width: 220,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{ textAlign: 'center', pb: 1 }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Box
                sx={{
                  height: 70,
                  width: 70,
                  background: '#ccc',
                  borderRadius: '50%',
                  alignSelf: 'center',
                  overflow: 'hidden',
                  mb: 1,
                }}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={user.profilePicUrl}
                  alt='user'
                />
              </Box>

              <Typography
                variant='subtitle2'
                sx={{ textAlign: 'center', py: 1 }}
              >
                BUY000192
              </Typography>
              <Divider />
              <Box sx={{ py: 1 }}>
                <Stack spacing={1}>
                  <Link className='link' to='/'>
                    <Typography
                      sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}
                    >
                      Home
                    </Typography>
                  </Link>
                  <Link className='link' to='/settings'>
                    <Typography
                      sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}
                    >
                      Settings
                    </Typography>
                  </Link>
                </Stack>
              </Box>
              <Divider />

              <Box>
                <Button variant='primary' fullWidth onClick={logout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Menu>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default AdminTopNav
