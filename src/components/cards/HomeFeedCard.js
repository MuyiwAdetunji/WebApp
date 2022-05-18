import {
  Grid,
  Paper,
  Box,
  Typography,
  Rating,
  IconButton,
  Avatar,
} from '@mui/material'

import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React from 'react'
import Rice from '../../img/rice.jpg'
import { useHomeFeedCardStyles } from '../../styles/agentStyle'

const HomeFeedCard = ({
  name,
  image,
  published,
  quantity,
  weight,
  onClick,
}) => {
  const classes = useHomeFeedCardStyles()
  return (
    <Grid item xs={6} md={3} sm={4} lg={2.4} onClick={onClick}>
      <Paper elevation={5}>
        <img src={image?.url} alt='Product' className={classes.image} />
        <div className={classes.container}>
          <div className={classes.textContainer}>
            <Typography variant='subtitle2' component='body'>
              <HTMLEllipsis
                unsafeHTML={` ${name}`}
                maxLine='1'
                ellipsis='...'
                basedOn='letters'
              />
            </Typography>
            <Typography
              variant='body2'
              component='body'
            >{`${quantity} left | ${weight}KG`}</Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}

export default HomeFeedCard
