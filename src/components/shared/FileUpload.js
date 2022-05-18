import React, { useContext } from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

import AuthContext from '../../contexts/AuthContext'
import { Avatar, Badge, Grid, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'

import { useAddFarmerProductPageStyles } from '../../styles/agentStyle'

const FileUpload = ({ images, setImages, setLoading }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  // const auth = useContext(AuthContext)
  const classes = useAddFarmerProductPageStyles()

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
      <Tooltip title='Click to add photos'>
        <label className={classes.addImageButton}>
          <AddIcon sx={{ fontSize: 50 }} />
          <input
            type='file'
            multiple
            accept='images/*'
            hidden
            onChange={fileUploadAndResize}
          />
        </label>
      </Tooltip>
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
                    sx={{ width: 100, height: 100 }}
                  />
                </Badge>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  )
}

export default FileUpload
