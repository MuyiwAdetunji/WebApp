import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Card, Paper, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LoyaltyIcon from '@mui/icons-material/Loyalty'

export default function SideMenuDrawer() {
  const dispatch = useDispatch()
  const { user, menuDrawer } = useSelector((state) => ({ ...state }))

  const history = useHistory()

  const [right, setRight] = React.useState(true)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setRight(open)
  }

  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  }

  return (
    <div>
      <SwipeableDrawer
        anchor='right'
        open={menuDrawer}
        onClose={() =>
          dispatch({
            type: 'SET_MENU_VISIBLE',
            payload: false,
          })
        }
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 350, px: 3, py: 10 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
            <LocalFireDepartmentIcon />
            <Typography sx={{ pl: 2 }}>Hot Jobs</Typography>
          </Box>
          {user && user.role === 'vendor' && (
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
              <LocalShippingIcon />
              <Typography sx={{ pl: 2 }}>Tinkoko Logistics</Typography>
            </Box>
          )}

          <Link to='/submit-quote' className='link'>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
              <RequestQuoteIcon />
              <Typography sx={{ pl: 2 }}>Submit a Quote</Typography>
            </Box>
          </Link>

          {user && user.token && (
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
              <AccountBalanceWalletIcon />
              <Typography sx={{ pl: 2 }}>Wallet</Typography>
            </Box>
          )}

          <Link to='/products' className='link'>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
              <ShoppingBagIcon />
              <Typography sx={{ pl: 2 }}>Buy Now</Typography>
            </Box>
          </Link>

          {user && user.role === 'vendor' && (
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
              <LoyaltyIcon />
              <Typography sx={{ pl: 2 }}>Membership Subscription</Typography>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  )
}
