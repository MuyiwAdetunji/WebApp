import React from 'react'
import { Box, Divider, Avatar, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import CircleIcon from '@mui/icons-material/Circle'

const ChatList = ({ chat, setChats, connectedUsers }) => {
  const history = useHistory()

  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          my: 2,
        }}
        onClick={() =>
          history.push(`/messages?message=${chat.messagesWith}`, undefined, {
            shallow: true,
          })
        }
      >
        <Avatar
          src={chat.profilePicUrl}
          sx={{ width: 56, height: 56 }}
          alt={`${chat.firstName} ${chat.lastName}`}
        />
        <Box sx={{ pl: 2 }}>
          <Typography component='h4' variant='body'>
            {`${chat.firstName} ${chat.lastName}`}{' '}
            {isOnline ? (
              <CircleIcon sx={{ fontSize: 10, color: 'green' }} />
            ) : (
              <CircleIcon sx={{ fontSize: 10, color: '#ccc' }} />
            )}
          </Typography>
          <Typography>
            {chat.lastMessage.length > 20
              ? `${chat.lastMessage.substring(0, 20)} ...`
              : chat.lastMessage}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default ChatList
