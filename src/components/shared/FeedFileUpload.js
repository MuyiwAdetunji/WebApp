import React, { useContext } from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

import AuthContext from '../../contexts/AuthContext'
import { Avatar, Badge, Grid, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import ImageIcon from '@mui/icons-material/Image'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'

import { useAddFarmerProductPageStyles } from '../../styles/agentStyle'
import { useDispatch, useSelector } from 'react-redux'

const FeedFileUpload = ({ images, setImages, setLoading }) => {
  // const auth = useContext(AuthContext)
  const classes = useAddFarmerProductPageStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const fileUploadAndResize = (e) => {
    // let files = e.target.files[0]
    let files = e.target.files
    let allUploadedFiles = images
    // if (images.length > 4) {
    //   return window.alert('You can only upload 4 images')
    // }

    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri)
            axios
              .post(
                `${process.env.REACT_APP_API}/v1/images/upload`,
                { image: uri },
                {
                  headers: {
                    token: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                setLoading(false)
                allUploadedFiles.push(res.data)
                setImages(allUploadedFiles)
              })
              .catch((err) => {
                setLoading(false)
                console.log('CLOUDINARY UPLOAD ERR', err)
              })
          },
          'base64'
        )
      }
    }
  }

  const handleImageRemove = (public_id) => {
    setLoading(true)
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/v1/images/remove`,
        { public_id },
        {
          headers: {
            token: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false)

        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id
        })
        setImages(filteredImages)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <>
      <Box sx={{ display: 'flex', my: 2 }}>
        <Tooltip title='Click to add photos'>
          <label style={{ display: 'flex', marginRight: 10 }}>
            <ImageIcon sx={{ color: '#5FBA68', marginRight: '5px' }} /> Photo
            <input
              type='file'
              multiple
              accept='images/*'
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        </Tooltip>
        <Tooltip title='Click to add video'>
          <label style={{ display: 'flex' }}>
            <VideoLibraryIcon sx={{ color: '#EE960A', marginRight: '5px' }} />{' '}
            Video
            <input
              type='file'
              // multiple
              accept='video/*'
              hidden
              // onChange={fileUploadAndResize}
            />
          </label>
        </Tooltip>
      </Box>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={3}>
          {images &&
            images.map((image) => (
              <Grid item xs={3} key={image.public_id}>
                <Badge
                  overlap='circular'
                  onClick={() => handleImageRemove(image.public_id)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <CancelSharpIcon color='error' sx={{ cursor: 'pointer' }} />
                  }
                >
                  <Avatar
                    src={image.url}
                    variant='square'
                    sx={{ width: 50, height: 50 }}
                  />
                </Badge>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  )
}

export default FeedFileUpload
