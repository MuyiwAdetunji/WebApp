import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { NoUserUrl } from '../../noUserImg'
import calculateTime from '../../utils/calculateTime'

const CommentCard = ({ comment }) => {
  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ marginRight: 1.5 }}>
          <Avatar
            alt='Image'
            src={
              comment?.user?.profilePicUrl
                ? comment?.user?.profilePicUrl?.url
                : NoUserUrl
            }
          />
        </Box>
        <Box>
          {/* <Typography sx={{ fontWeight: 'bold', fontSize: 12 }}> */}
          <Link to={`/user/${comment.user._id}`} className='link'>
            <Typography variant='subtitle2' component='span'>
              {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
            </Typography>
          </Link>

          <Typography sx={{ fontSize: 12 }}>{comment.comment}</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: 10, alignSelf: 'flex-end' }}>
        {calculateTime(comment?.createdAt)}
      </Typography>
    </Box>
  )
}

export default CommentCard
