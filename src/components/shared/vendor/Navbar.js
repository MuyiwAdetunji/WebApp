import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import { useAgentHomePageStyles } from '../../../styles/agentStyle'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import InventoryIcon from '@mui/icons-material/Inventory'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import HelpIcon from '@mui/icons-material/Help'

export default function VendorNavbar() {
  const classes = useAgentHomePageStyles()

  const activeNav = (isActive) => ({
    // display: 'inline-block',
    // ':after': {
    //   position: 'absolute',
    //   content: '',
    //   borderBottom: isActive ? '2px solid #EE960A' : '',
    //   width: '70%',
    //   transform: 'translateX(-50%)',
    //   bottom: '-15px',
    //   left: '50%',
    // },
    borderBottom: isActive ? '3px solid #EE960A' : '',
  })

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
        <NavLink to='/dashboard' className='link' style={activeNav}>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <div className={classes.navItem}>
              <HomeIcon />
              <Typography ml={1}>My Shop</Typography>
            </div>
          </div>
        </NavLink>
        <NavLink to='/feed' className='link' style={activeNav}>
          <div className={classes.navItem}>
            <RssFeedIcon />
            <Typography ml={1}>News Feed</Typography>
          </div>
        </NavLink>

        <NavLink to='/my-jobs' className='link' style={activeNav}>
          <div className={classes.navItem}>
            <BusinessCenterIcon />
            <Typography ml={1}>Jobs</Typography>
          </div>
        </NavLink>
        <NavLink to='/help' className='link' style={activeNav}>
          <div className={classes.navItem}>
            <HelpIcon />
            <Typography ml={1}>Help</Typography>
          </div>
        </NavLink>
        {/* <div className={classes.navItem}>
          <BsShop />
          <Typography sx={{ minWidth: 80 }} ml={1}>
            Promotions
          </Typography>
        </div> */}
      </Box>
    </>
  )
}
