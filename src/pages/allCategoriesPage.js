import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import UserLayout from '../Layouts/UserLayout'
import { useAllCategoriesStyles } from '../styles/styles'

const AllCategories = () => {
  const classes = useAllCategoriesStyles()

  return (
    <UserLayout>
      <Typography variant='h6' className={classes.title}>
        ALL CATEGORIES
      </Typography>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <div className={classes.categoryHeader}>CEREALS/GRAINS</div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography className={classes.item}>Rice</Typography>
                <Typography className={classes.item}>Beans</Typography>
                <Typography className={classes.item}>Ofada Rice</Typography>
                <Typography className={classes.item}>Beans</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default AllCategories
