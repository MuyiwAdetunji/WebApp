import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Badge, Container } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDispatch, useSelector } from 'react-redux'

export default function AgentHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    localStorage.setItem('tink_user', null)
    history.push('/login')
  }

  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant='h5'
          component='div'
          sx={{ mr: 2, fontWeight: 'bold' }}
        >
          <span style={{ color: '#002855' }}>TINKOKO</span> AGENT CENTER
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <IconButton
            size='large'
            aria-label='show 17 new notifications'
            color='inherit'
            sx={{ minWidth: 80, display: { xs: 'none', md: 'block' } }}
          >
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box
            sx={{
              border: '1px dashed #000',
              borderRadius: '5px',
              padding: '2px',
              marginRight: '3px',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Typography
              sx={{ minWidth: 100, display: { xs: 'none', md: 'block' } }}
            >
              N100,000 +
            </Typography>
          </Box>
          <Typography
            sx={{ minWidth: 100, display: { xs: 'none', md: 'block' } }}
          >
            David's Store
          </Typography>
          <Tooltip title='Account settings'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
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
        <Link className='link' to='/settings'>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
