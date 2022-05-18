import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import React from 'react'
import { usePromoCardStyles } from '../../styles/agentStyle'

const PromoCard = ({ name, duration, product, amount, variant }) => {
  const classes = usePromoCardStyles()
  return (
    <Grid item xs={12} md={4}>
      <div className={classes.container}>
        <Typography component='h4' variant='h6' className={classes.typography}>
          {name.toUpperCase()}
        </Typography>
        <Typography
          component='h4'
          variant='h6'
          sx={{ py: 2 }}
          className={classes.typography}
        >
          N{amount}
        </Typography>
        <Typography
          sx={{ fontSize: 14, py: 2 }}
          component='div'
          variant='body1'
        >
          {duration.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component='div' variant='body1'>
          {product} PRODUCTS
        </Typography>

        <Button fullWidth variant={variant}>
          Choose Plan
        </Button>
      </div>
    </Grid>
  )
}

export default PromoCard
