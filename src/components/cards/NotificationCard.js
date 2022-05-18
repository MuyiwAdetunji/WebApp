import {
  Paper,
  Divider,
  MenuList,
  MenuItem,
  ListItemText,
  Avatar,
  Typography,
  ListItem,
} from '@mui/material'
import { useEffect } from 'react'
import { getNotifications } from '../../apis'
import LikeNotification from '../notifications/LikeNotification'
import React, { useState } from 'react'
import CommentNotification from '../notifications/CommentNotification'

const NotificationCard = ({ auth }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getAllNotifications(auth.token)
  }, [])

  const getAllNotifications = async (token) => {
    const res = await getNotifications(token)
    if (res) {
      setNotifications(res)
    }
  }
  return (
    // <Paper sx={{ width: 400 }}>
    <MenuList dense>
      {notifications.length > 0 ? (
        notifications.map((notification, i) => (
          <div key={i}>
            {notification.type === 'newLike' && notification.post !== null && (
              <LikeNotification
                key={notification._id}
                notification={notification}
              />
            )}

            {notification.type === 'newComment' &&
              notification.post !== null && (
                <CommentNotification
                  key={notification._id}
                  notification={notification}
                />
              )}
          </div>
        ))
      ) : (
        <MenuItem>
          <ListItem>No Notification</ListItem>
        </MenuItem>
      )}
    </MenuList>
    // </Paper>
  )
}

export default NotificationCard
