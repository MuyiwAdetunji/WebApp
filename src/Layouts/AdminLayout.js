import { Box, Grid } from '@mui/material'
import React from 'react'
import AdminNav from '../components/admin/AdminNav'
import AdminTopNav from '../components/admin/AdminTopNav'

const AdminLayout = ({ children, title }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <AdminNav />
      </Grid>
      <Grid item xs={9}>
        <div style={{ overflow: 'auto', height: '100vh' }}>
          <Box sx={{ pr: 3 }}>
            <AdminTopNav title={title} />
            {children}
          </Box>
        </div>
      </Grid>
    </Grid>
  )
}

export default AdminLayout
