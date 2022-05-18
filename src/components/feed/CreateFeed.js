import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import FeedFileUpload from '../shared/FeedFileUpload'
import { LoadingIcon } from '../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../apis'
import { NoUserUrl } from '../../noUserImg'

const CreateFeed = () => {
  const [post, setPost] = useState('')
  const [images, setImages] = useState([])
  const [imageLoading, setImageLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await createPost(post, images, user.token)
    if (res) {
      window.location.reload()
      setPost('')
      setImages([])
    }
  }

  return (
    <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', pr: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={user.profilePicUrl ? user?.profilePicUrl?.url : NoUserUrl}
            sx={{ mr: 1 }}
          />{' '}
          <Typography variant='h6'>{`${user.firstName} ${user.lastName}`}</Typography>
        </Box>
        <TextField
          value={post}
          onChange={(e) => setPost(e.target.value)}
          sx={{ width: 340 }}
          placeholder={
            user.role === 'user'
              ? 'What are you looking for?'
              : user.role === 'vendor'
              ? 'Talk about your business'
              : 'Write Something'
          }
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'space-between',
          // my: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* <Typography sx={{ pr: 5 }}> */}
          <FeedFileUpload
            images={images}
            setImages={setImages}
            setLoading={setImageLoading}
          />
          {/* </Typography> */}
        </Box>
        <Button variant='primary' onClick={handleSubmit}>
          Post
        </Button>
      </Box>
      {imageLoading && <LoadingIcon />}
    </Box>
  )
}

export default CreateFeed
