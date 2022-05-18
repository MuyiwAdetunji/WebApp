import { Avatar, Box, Divider, Grid, Rating, Typography } from '@mui/material'
import React from 'react'
import { useReviewsCardStyles } from '../../styles/styles'
import calculateTime from '../../utils/calculateTime'
import Moment from 'react-moment'
import moment from 'moment'

const ReviewsCard = ({ review }) => {
  const classes = useReviewsCardStyles()
  return (
    <Grid container spacing={4} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <div className={classes.container}>
          <Avatar className={classes.avatar} />
          <div>
            <Typography variant='body2' className={classes.text}>
              {/* {calculateTime(review?.createdAt)} */}
              {moment(review?.createdAt).fromNow()}
            </Typography>
            <Typography variant='body2'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Rating
          name='read-only'
          value={review.rating}
          precision={0.5}
          readOnly
        />
        <Typography variant='body2' className={classes.comment}>
          {review?.review}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ReviewsCard
