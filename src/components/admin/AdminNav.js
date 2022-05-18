import React from 'react'
import { useAdminNavStyles } from '../../styles/adminStyle'
import Logo from '../../img/logo_white.svg'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import EmailIcon from '@mui/icons-material/Email'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ReportIcon from '@mui/icons-material/Report'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Link, useHistory } from 'react-router-dom'

const AdminNav = () => {
  const classes = useAdminNavStyles()

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={Logo} alt='logo' />
      </div>

      <div className={classes.navItems}>
        <Link to='/admin' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <DashboardIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Dashboard</div>
          </div>
        </Link>
        <Link to='/admin/categories' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <ListAltIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Categories</div>
          </div>
        </Link>
        <Link to='/admin/products' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <ShoppingBagIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Products</div>
          </div>
        </Link>
        <Link to='/admin/email' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <EmailIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Email</div>
          </div>
        </Link>
        <Link to='/admin/users' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <AccountCircleIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Users</div>
          </div>
        </Link>
        <Link to='/admin/reports' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <ReportIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Reports</div>
          </div>
        </Link>
        <Link to='/admin/blog' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <NewspaperIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Blog</div>
          </div>
        </Link>
        <Link to='/admin/orders' className='link'>
          <div className={classes.navItem}>
            <div className={classes.icon}>
              <ShoppingCartIcon sx={{ fontSize: 40, mr: 2 }} />
            </div>
            <div className={classes.name}>Orders</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminNav
