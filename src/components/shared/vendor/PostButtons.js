import { Grid, Typography, Backdrop, Modal, Fade, Hidden } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { usePostButtonStyles } from '../../../styles/styles'
import AddIcon from '@mui/icons-material/Add'
import PostFeed from './PostFeed'
import { makeStyles } from '@mui/styles'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
}

const PostButtons = () => {
  const classes = usePostButtonStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <article className={classes.newPost} onClick={handleOpen}>
            <Hidden mdDown>
              <div className={classes.circle}></div>
              <AddIcon fontSize='large' />
            </Hidden>
            <Typography variant='h6' component='div'>
              Create Feed
            </Typography>
          </article>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <PostFeed />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default PostButtons
