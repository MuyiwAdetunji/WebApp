import { Grid, Paper, Box, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const JobCard = ({ job, onClick }) => {
  return (
    <Grid item xs={12} md={4} sm={6} lg={2.4}>
      <Paper
        elevation={5}
        className='product-card-paper'
        onClick={onClick}
        sx={{ cursor: 'pointer' }}
      >
        <Box sx={{ p: 2 }}>
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant='h5' component='h5'>
                {job.title}
              </Typography>
            </Box>
            <Typography variant='subtitle1' component='h2'>
              {job.jobType}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: 1,
              }}
            >
              <Typography variant='subtitle2' component='p'>
                {moment(job.createdAt).fromNow()}
              </Typography>
              <Typography variant='subtitle2' component='p'>
                {job?.user?.storeName}
              </Typography>
              {/* <Typography variant='subtitle2' component='p'>
                {job.location}
              </Typography> */}
            </Box>
            <Typography variant='body2' component='p' sx={{ height: 40 }}>
              <HTMLEllipsis
                unsafeHTML={job.description}
                maxLine='2'
                ellipsis='...'
                basedOn='letters'
                style={{ my: 1 }}
              />
            </Typography>
            <Box sx={{ my: 1 }}>
              <Typography variant='subtitle2' component='p'>
                {job?.workLocation}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default JobCard

// sx={{
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// }}
