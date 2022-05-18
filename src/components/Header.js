import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import MoreIcon from '@mui/icons-material/MoreVert'
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp'
import LoginIcon from '@mui/icons-material/Login'

import {
  Container,
  Tabs,
  Tab,
  ListItemIcon,
  Divider,
  Button,
  Stack,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Logo from '../img/logo22.png'
import Logout from '@mui/icons-material/Logout'
import NotificationCard from './cards/NotificationCard'
import SearchForm from './shared/SearchForm'
import { useSelector, useDispatch } from 'react-redux'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: '#F4F5F8',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#282828',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorNotifyEl, setAnchorNotifyEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isNotifyOpen = Boolean(anchorNotifyEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const history = useHistory()

  const dispatch = useDispatch()
  const { user, cart } = useSelector((state) => ({ ...state }))

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    localStorage.setItem('tink_user', null)
    history.push('/login')
  }

  let routed

  if (user) {
    if (user.role === 'admin') {
      routed = '/admin'
    } else if (user.role === 'vendor' || user.role === 'agent') {
      routed = '/dashboard'
    } else {
      routed = '/'
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleNotifyMenuOpen = (event) => {
    setAnchorNotifyEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const handleNotifyMenuClose = () => {
    setAnchorNotifyEl(null)
    // handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const notifyId = 'notify-user'
  const renderNotify = (
    <Menu
      sx={{ width: 400 }}
      anchorEl={anchorNotifyEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={notifyId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isNotifyOpen}
      onClose={handleNotifyMenuClose}
    >
      {user && <NotificationCard auth={user} />}
    </Menu>
  )

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={routed} className='link'>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      </Link>
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
    // <Menu
    //   anchorEl={anchorEl}
    //   id='account-menu'
    //   open={open}
    //   onClose={handleClose}
    //   onClick={handleClose}
    //   PaperProps={{
    //     elevation: 0,
    //     sx: {
    //       overflow: 'visible',
    //       filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    //       mt: 1.5,
    //       '& .MuiAvatar-root': {
    //         width: 32,
    //         height: 32,
    //         ml: -0.5,
    //         mr: 1,
    //       },
    //       '&:before': {
    //         content: '""',
    //         display: 'block',
    //         position: 'absolute',
    //         top: 0,
    //         right: 14,
    //         width: 10,
    //         height: 10,
    //         bgcolor: 'background.paper',
    //         transform: 'translateY(-50%) rotate(45deg)',
    //         zIndex: 0,
    //       },
    //     },
    //   }}
    //   transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    //   anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    // >
    //   <Box
    //     sx={{
    //       p: 2,
    //       width: 220,
    //       display: 'flex',
    //       flexDirection: 'column',
    //     }}
    //   >
    //     <Typography variant='subtitle2' sx={{ textAlign: 'center', pb: 1 }}>
    //       {`${user.firstName} ${user.lastName}`}
    //     </Typography>
    //     <Box
    //       sx={{
    //         height: 70,
    //         width: 70,
    //         background: '#ccc',
    //         borderRadius: '50%',
    //         alignSelf: 'center',
    //         overflow: 'hidden',
    //         mb: 1,
    //       }}
    //     >
    //       <img
    //         style={{
    //           width: '100%',
    //           height: '100%',
    //           objectFit: 'cover',
    //         }}
    //         src={user.profilePicUrl}
    //         alt='user'
    //       />
    //     </Box>

    //     <Typography variant='subtitle2' sx={{ textAlign: 'center', py: 1 }}>
    //       BUY000192
    //     </Typography>
    //     <Divider />
    //     <Box sx={{ py: 1 }}>
    //       <Stack spacing={1}>
    //         <Link className='link' to={routed}>
    //           <Typography sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}>
    //             Dashboard
    //           </Typography>
    //         </Link>
    //         <Link className='link' to='/wallet'>
    //           <Typography sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}>
    //             Wallet
    //           </Typography>
    //         </Link>
    //         <Link className='link' to='/settings'>
    //           <Typography sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}>
    //             Settings
    //           </Typography>
    //         </Link>
    //         <Link className='link' to='/help'>
    //           <Typography sx={{ fontSize: 12, ':hover': { color: '#93C078' } }}>
    //             Help
    //           </Typography>
    //         </Link>
    //       </Stack>
    //     </Box>
    //     <Divider />

    //     <Box>
    //       <Button variant='primary' fullWidth onClick={logout}>
    //         Logout
    //       </Button>
    //     </Box>
    //   </Box>
    // </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size='large' color='inherit'>
          <HomeSharpIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem> */}
      {user ? (
        <Box sx={{ px: 1 }}>
          <SearchForm />
          <MenuItem onClick={() => history.push('/dashboard')}>
            <IconButton size='large' color='inherit'>
              <HomeSharpIcon />
            </IconButton>
            <p>Home</p>
          </MenuItem>
          {/* <MenuItem onClick={() => history.push('/products')}>
            <IconButton size='large' color='inherit'>
              <ShoppingBagSharpIcon />
            </IconButton>
            <p>Products</p>
          </MenuItem>
          <MenuItem onClick={() => history.push('/feed')}>
            <IconButton size='large' color='inherit'>
              <FeedOutlinedIcon />
            </IconButton>
            <p>NewsFeed</p>
          </MenuItem> */}
          <MenuItem onClick={() => history.push('/jobs')}>
            <IconButton size='large' color='inherit'>
              <WorkOutlinedIcon />
            </IconButton>
            <p>Jobs</p>
          </MenuItem>
          {/* <MenuItem>
            <IconButton
              size='large'
              aria-label='show 0 cart items'
              color='inherit'
              onClick={() =>
                dispatch({
                  type: 'SET_VISIBLE',
                  payload: true,
                })
              }
            >
              <Badge badgeContent={cart.length} color='error'>
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </MenuItem> */}
          <MenuItem>
            <IconButton size='large' color='inherit'>
              <ChatIcon />
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton size='large' color='inherit'>
              <NotificationsIcon />
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={logout}>
            <IconButton size='large' color='inherit'>
              <Logout />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <Link className='link' to='/login'>
            <MenuItem>
              <IconButton size='large' color='inherit'>
                <LoginIcon />
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </Link>
          <Link className='link' to='/signup'>
            <MenuItem>
              <IconButton size='large' color='inherit'>
                <PersonAddIcon />
              </IconButton>
              <p>Register</p>
            </MenuItem>
          </Link>
        </Box>
      )}
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='standard'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Link to='/'>
              <img
                src={Logo}
                width={100}
                alt='logo'
                // style={{ marginRight: '4rem' }}
              />
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <SearchForm />
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search...'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Box sx={{ display: 'flex' }}>
              <Link
                to='/products'
                style={{ color: '#979797', textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 1,
                    mx: 1,
                  }}
                >
                  <ShoppingBagSharpIcon sx={{ fontSize: 40 }} />
                  <Typography variant='subtitle1'>Products</Typography>
                </Box>
              </Link>
              {user && (
                <Link
                  to='/feed'
                  style={{ color: '#979797', textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      px: 1,
                      mx: 1,
                    }}
                  >
                    <FeedOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant='subtitle1'>NewsFeed</Typography>
                  </Box>
                </Link>
              )}

              <Link
                to='/jobs'
                style={{ color: '#979797', textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 1,
                    mx: 1,
                  }}
                >
                  <WorkOutlinedIcon sx={{ fontSize: 40 }} />
                  <Typography variant='subtitle1'>Jobs</Typography>
                </Box>
              </Link>
            
            </Box> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {user ? (
                <Box sx={{ display: 'flex' }}>
                  <IconButton
                    size='large'
                    color='inherit'
                    onClick={() => history.push('/dashboard')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <HomeSharpIcon />
                    <Typography variant='subtitle2'>Home</Typography>
                  </IconButton>

                  {/* <IconButton
                    size='large'
                    color='inherit'
                    onClick={() => history.push('/products')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <ShoppingBagSharpIcon />
                    <Typography variant='subtitle2'>Products</Typography>
                  </IconButton>
                  <IconButton
                    size='large'
                    color='inherit'
                    onClick={() => history.push('/feed')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <FeedOutlinedIcon />
                    <Typography variant='subtitle2'>NewsFeed</Typography>
                  </IconButton> */}
                  <IconButton
                    size='large'
                    color='inherit'
                    onClick={() => history.push('/jobs')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <WorkOutlinedIcon />
                    <Typography variant='subtitle2'>Jobs</Typography>
                  </IconButton>

                  {/* <IconButton
                    size='large'
                    color='inherit'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <AccountBalanceWalletIcon />
                    <Typography variant='subtitle2'>Wallet</Typography>
                  </IconButton> */}
                  <IconButton
                    size='large'
                    color='inherit'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {/* <Badge badgeContent={0} color='error'> */}
                    <ChatIcon />
                    <Typography variant='subtitle2'>Messages</Typography>
                    {/* </Badge> */}
                  </IconButton>

                  <IconButton
                    size='large'
                    aria-label='show 17 new notifications'
                    color='inherit'
                    onClick={handleNotifyMenuOpen}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {/* <Badge badgeContent={0} color='error'> */}
                    <NotificationsIcon />
                    <Typography variant='subtitle2'>Notifications</Typography>
                    {/* </Badge> */}
                  </IconButton>
                  {/* <IconButton
                    size='large'
                    color='inherit'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                    onClick={() =>
                      dispatch({
                        type: 'SET_VISIBLE',
                        payload: true,
                      })
                    }
                  >
                    
                    <ShoppingCartSharpIcon />
                    <Typography variant='subtitle2'>Cart</Typography>
                  </IconButton> */}
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    onClick={handleProfileMenuOpen}
                    color='inherit'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <AccountCircle />
                    <Typography variant='subtitle2'>Account</Typography>
                  </IconButton>
                  <IconButton
                    size='large'
                    edge='end'
                    // aria-label='account of current user'
                    // aria-controls={menuId}
                    aria-haspopup='true'
                    sx={{ cursor: 'pointer', marginLeft: 5 }}
                    onClick={() =>
                      dispatch({
                        type: 'SET_MENU_VISIBLE',
                        payload: true,
                      })
                    }
                    // onClick={handleProfileMenuOpen}
                    color='inherit'
                  >
                    <MenuIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
              ) : (
                <div className='auth'>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <p>LOGIN</p>
                  </Link>
                  <Link to='/signup' style={{ textDecoration: 'none' }}>
                    <p>SIGN UP</p>
                  </Link>
                </div>
              )}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotify}
    </Box>
  )
}
