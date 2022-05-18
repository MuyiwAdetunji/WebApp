import { Box, Divider } from '@mui/material'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import React from 'react'

const NewsCard = ({ news, onClick }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 0.3,
          p: 1,
          color: '#7ab259',
          fontSize: '0.9rem',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <HTMLEllipsis
          unsafeHTML={news.title}
          // className={classes.caption}
          maxLine='2'
          ellipsis='...'
          basedOn='letters'
        />
      </Box>

      <Divider />
    </>
  )
}

export default NewsCard
