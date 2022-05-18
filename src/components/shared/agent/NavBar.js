import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import { BsShop } from 'react-icons/bs'
import { BiRss } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { useAgentHomePageStyles } from '../../../styles/agentStyle'

import WorkIcon from '@mui/icons-material/Work'
import { NavLink, Link } from 'react-router-dom'

export default function AgentNavbar() {
  const classes = useAgentHomePageStyles()
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
        <NavLink to='/dashboard' className='link'>
          <div className={classes.navItem}>
            <BsShop />
            <Typography sx={{ minWidth: 80 }} ml={1}>
              My Shop
            </Typography>
          </div>
        </NavLink>
        <NavLink to='/feed' className='link'>
          <div className={classes.navItem}>
            <BiRss />
            <Typography sx={{ minWidth: 80 }} ml={1}>
              News Feed
            </Typography>
          </div>
        </NavLink>
        <NavLink
          to='/agent/farmers'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className={classes.navItem}>
            <BsShop />
            <Typography sx={{ minWidth: 80 }} ml={1}>
              Farmers
            </Typography>
          </div>
        </NavLink>
        <NavLink
          to='/agent/products'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className={classes.navItem}>
            <BsShop />
            <Typography sx={{ minWidth: 80 }} ml={1}>
              Products
            </Typography>
          </div>
        </NavLink>
        <NavLink
          to='/my-jobs'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className={classes.navItem}>
            <WorkIcon />
            <Typography sx={{ minWidth: 80 }} ml={1}>
              Jobs
            </Typography>
          </div>
        </NavLink>
        <div className={classes.navItem}>
          <BsShop />
          <Typography sx={{ minWidth: 80 }} ml={1}>
            Promotions
          </Typography>
        </div>
      </Box>
    </>
  )
}
