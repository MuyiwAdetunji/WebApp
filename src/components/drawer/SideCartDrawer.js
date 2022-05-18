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

export default function SideCartDrawer() {
  const dispatch = useDispatch()
  const { drawer, cart } = useSelector((state) => ({ ...state }))

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
        open={drawer}
        onClose={() =>
          dispatch({
            type: 'SET_VISIBLE',
            payload: false,
          })
        }
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 350, overflowY: 'scroll' }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {cart.map((p) => (
            <Paper key={p._id} elevation={2} sx={{ p: 2, m: 1 }}>
              {p.images[0] ? (
                <>
                  <img src={p.images[0].url} style={imageStyle} />
                  <Typography variant='subtitle2'>
                    {p.productName} x {p.count}
                  </Typography>
                </>
              ) : (
                <>
                  <img src={p.images[0].url} style={imageStyle} />
                  <p className='text-center bg-secondary text-light'>
                    {p.title} x {p.count}
                  </p>
                </>
              )}
            </Paper>
          ))}

          <Button
            variant='black'
            fullWidth
            sx={{ m: 2 }}
            onClick={() => {
              history.push('/cart')
            }}
          >
            Go to Cart
          </Button>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}
