import { Avatar, Box } from '@mui/material'
import React, { useState } from 'react'
import { NoUserUrl } from '../../noUserImg'
import calculateTime from '../../utils/calculateTime'

const Message = ({
  message,
  user,
  setMessages,
  messagesWith,
  bannerProfilePic,
}) => {
  const [deleteIcon, showDeleteIcon] = useState(false)
  const ifYouSender = message.sender === user._id

  return (
    <Box sx={{ p: 2 }}>
      <div className='bubbleWrapper'>
        <div
          className={ifYouSender ? 'inlineContainer own' : 'inlineContainer'}
        >
          <Avatar
            className='inlineIcon'
            src={
              ifYouSender
                ? user?.profilePicUrl
                  ? user?.profilePicUrl?.url
                  : NoUserUrl
                : bannerProfilePic
            }
          />

          <div className={ifYouSender ? 'ownBubble own' : 'otherBubble other'}>
            {message.msg}
          </div>
          <span className={ifYouSender ? 'own' : 'other'}>
            {calculateTime(message.date)}
          </span>
        </div>
      </div>
    </Box>
  )
}

export default Message
