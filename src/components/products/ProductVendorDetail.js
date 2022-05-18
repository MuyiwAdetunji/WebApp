import { Avatar, Typography } from '@mui/material'
import React from 'react'
import { useProductVendorDetailStyles } from '../../styles/styles'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { NoUserUrl } from '../../noUserImg'
import { Link } from 'react-router-dom'

const ProductVendorDetail = ({ user, deliveryType }) => {
  const classes = useProductVendorDetailStyles()

  return (
    <div className={classes.container}>
      <Typography variant='subtitle2' component='div'>
        SELLER INFORMATION
      </Typography>
      <div className={classes.storeUser}>
        <Avatar
          className={classes.avatar}
          src={user?.profilePicUrl ? user?.profilePicUrl?.url : NoUserUrl}
        />
        <Link className='link' to={`/user/${user?._id}`}>
          <Typography variant='body1'>{user?.storeName}</Typography>
        </Link>
      </div>
      <Typography className={classes.storeUser} variant='body2'>
        {`SELLER ID: ${user?.userId}`}
      </Typography>

      <div className={classes.storeUser}>
        <LocalPhoneIcon className={classes.avatar} />
        <Typography variant='body2'>0{user?.phone}</Typography>
      </div>
      <div className={classes.storeUser}>
        <LocationOnIcon className={classes.avatar} />
        <Typography variant='body2'>{`${user?.state}, ${user?.country}`}</Typography>
      </div>
      <div className={classes.storeUser}>
        <LocalShippingIcon className={classes.avatar} />
        <Typography variant='body2'>{deliveryType}</Typography>
      </div>
      <div className={classes.storeUser}>
        <CreditCardIcon className={classes.avatar} />
        <Typography variant='body2'>Tinkoko Secure</Typography>
      </div>
    </div>
  )
}

export default ProductVendorDetail
