import { Avatar, Typography } from '@mui/material'
import React from 'react'
import { useUserCardStyles } from '../../styles/styles'

import { defaultUser } from '../../data'
import { Link } from 'react-router-dom'

const UserCard = ({ user = defaultUser, avatarSize = 44 }) => {
  const classes = useUserCardStyles({ avatarSize })
  const { username, profile_image, name } = user

  return (
    <div className={classes.wrapper}>
      <Avatar
        src={profile_image}
        alt='User Avatar'
        className={classes.avatar}
      />
      <div className={classes.nameWrapper}>
        {/* <Link to={`/${username}`}> */}
        <Typography variant='subtitle2' className={classes.topography}>
          {username}
        </Typography>
        <Typography
          color='textSecondary'
          variant='body2'
          className={classes.datePosted}
        >
          10Hrs
        </Typography>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default UserCard
