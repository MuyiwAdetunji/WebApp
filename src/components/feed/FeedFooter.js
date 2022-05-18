import { Box, Typography } from '@mui/material'
import React from 'react'

const FeedFooter = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography component='p' variant='body2' sx={{ fontWeight: 'bold' }}>
        About . Terms &amp; Conditions
      </Typography>
      <Typography component='p' variant='body2' sx={{ fontWeight: 'bold' }}>
        Privacy Policy . Careers
      </Typography>
      <Typography component='p' variant='body2' sx={{ fontWeight: 'bold' }}>
        Advertisment . Help
      </Typography>
    </Box>
  )
}

export default FeedFooter
