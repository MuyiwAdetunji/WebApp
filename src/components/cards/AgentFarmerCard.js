import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  DialogContent,
  Dialog,
  DialogTitle,
  InputAdornment,
} from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useAgentFarmerCardStyles } from '../../styles/agentStyle'

const divStyle = {
  p: 4,
}

const AgentFarmerCard = ({
  name,
  phone,
  address,
  state,
  photo,
  country,
  nextOfKin,
  nextOfKinPhone,
}) => {
  const classes = useAgentFarmerCardStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Grid item xs={6} md={3} sm={4} lg={3}>
        <div onClick={handleClickOpen}>
          <Paper elevation={5} className='product-card-paper'>
            <img src={photo} alt='Farmer' className={classes.image} />
            <Box sx={{ padding: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant='p' component='h4'>
                  {name}
                </Typography>
                <Typography variant='subtitle1' component='h2'>
                  ID: FAM010
                </Typography>
              </Box>
            </Box>
          </Paper>
        </div>
      </Grid>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Paper elevation={0}>
              <img src={photo} alt='Product' className={classes.image} />

              <Box sx={divStyle}>
                <FormControl
                  sx={{ width: '100%', padding: '1rem 0' }}
                  variant='outlined'
                >
                  <OutlinedInput
                    fullWidth
                    id='name'
                    type='text'
                    value={name}
                    // onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton edge='start'>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  sx={{ width: '100%', padding: '1rem 0' }}
                  variant='outlined'
                >
                  <OutlinedInput
                    fullWidth
                    id='name'
                    type='text'
                    value={phone}
                    // onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton edge='start'>
                          <LocalPhoneIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  sx={{ width: '100%', padding: '1rem 0' }}
                  variant='outlined'
                >
                  <OutlinedInput
                    fullWidth
                    id='name'
                    type='text'
                    value={address}
                    // onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton edge='start'>
                          <LocationOnIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  sx={{ width: '100%', padding: '1rem 0' }}
                  variant='outlined'
                >
                  <OutlinedInput
                    fullWidth
                    id='name'
                    type='text'
                    value={state}
                    // onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton edge='start'>
                          <LocationOnIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  sx={{ width: '100%', padding: '1rem 0' }}
                  variant='outlined'
                >
                  <OutlinedInput
                    fullWidth
                    id='name'
                    type='text'
                    value={country}
                    // onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton edge='start'>
                          <LocationOnIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Paper>
          </DialogContent>
        </Dialog>
      </>
    </>
  )
}

export default AgentFarmerCard
