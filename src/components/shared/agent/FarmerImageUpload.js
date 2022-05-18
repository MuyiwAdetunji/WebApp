import React, { useContext } from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

// import AuthContext from '../../../contexts/AuthContext'
import { Avatar, Badge, Grid, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import AddIcon from '@mui/icons-material/Add'
import { useAddFarmerProductPageStyles } from '../../../styles/agentStyle'
import { useFarmersPageStyles } from '../../../styles/agentStyle'
import { useDispatch, useSelector } from 'react-redux'

const FarmerImageUpload = ({ images, setImages, setLoading }) => {
  // const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  const classes = useAddFarmerProductPageStyles()
  const newClasses = useFarmersPageStyles()

  const fileUploadAndResize = (e) => {
    let file = e.target.files[0]

    if (file) {
      setLoading(true)
      Resizer.imageFileResizer(
        file,
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
              setImages(res.data)
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

        setImages('')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <>
      {Object.keys(images).length === 0 && (
        <Tooltip title='Click to add photos'>
          <label>
            <Grid item xs={12}>
              <div className={newClasses.uploadImage}>
                <Typography>Upload</Typography>
              </div>
            </Grid>
            <input
              type='file'
              accept='images/*'
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        </Tooltip>
      )}

      <Box sx={{ my: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={4}></Grid>
          {Object.keys(images).length > 0 && (
            <Grid item xs={4}>
              <Badge
                overlap='circular'
                onClick={() => handleImageRemove(images.public_id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={
                  <CancelSharpIcon color='error' sx={{ cursor: 'pointer' }} />
                }
              >
                <Avatar
                  src={images.url}
                  variant='square'
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Grid>
          )}
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  )
}

export default FarmerImageUpload
