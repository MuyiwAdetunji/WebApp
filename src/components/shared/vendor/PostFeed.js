import { Avatar, Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { usePostFeedStyles } from '../../../styles/styles'
import FeedFileUpload from '../FeedFileUpload'
import { LoadingIcon } from '../../../icons'
import { createPost } from '../../../apis'
import { useDispatch, useSelector } from 'react-redux'

const PostFeed = () => {
  const classes = usePostFeedStyles()
  // const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const [post, setPost] = useState('')
  const [images, setImages] = useState([])
  const [imageLoading, setImageLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await createPost(post, images, user.token)
    if (res) {
      console.log(res)
    }
  }

  return (
    <section>
      <div className={classes.sectionTitle}>
        <Typography sx={{ textAlign: 'center' }} variant='h6' component='body'>
          New Post
        </Typography>
      </div>
      <div className={classes.sectionHeader}>
        <Avatar />
        <Typography variant='h6' component='body' sx={{ marginLeft: 2 }}>
          {user.storeName}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          color='vendor'
          rows={4}
          fullWidth
          sx={{ my: 3 }}
          placeholder='Say something...'
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <FeedFileUpload
          images={images}
          setImages={setImages}
          setLoading={setImageLoading}
        />
        {imageLoading && <LoadingIcon />}
        <Button variant='vendor' fullWidth type='submit'>
          POST
        </Button>
      </form>
    </section>
  )
}

export default PostFeed
