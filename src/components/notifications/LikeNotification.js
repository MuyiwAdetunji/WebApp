import React from 'react'
import {
  MenuItem,
  ListItemText,
  Avatar,
  ListItem,
  ListItemAvatar,
  Typography,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import calculateTime from '../../utils/calculateTime'

const LikeNotification = ({ notification }) => {
  return (
    <>
      <MenuItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          {/* <ListItemText>
          
        </ListItemText> */}
          <ListItemText
            primary={
              <Typography>
                {`${notification.user.firstName} ${notification.user.lastName} liked your`}{' '}
                <Link className='link' to={`/post/${notification.post._id}`}>
                  post
                </Link>{' '}
              </Typography>
            }
            secondary={calculateTime(notification.date)}
          />
        </ListItem>
      </MenuItem>
      <Divider />
    </>
  )
}

export default LikeNotification
