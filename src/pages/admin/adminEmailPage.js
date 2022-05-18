import { Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import React from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { useAdminEmailStyles } from '../../styles/adminStyle'
import SEO from '../../components/shared/Seo'

const AdminEmail = () => {
  const classes = useAdminEmailStyles()

  const history = useHistory()
  return (
    <AdminLayout title='Email'>
      <SEO title='Emails' />
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant='h6' component='body'>
            All Emails
          </Typography>
          <Button
            variant='primary'
            onClick={() => history.push('/admin/email/new')}
          >
            New Bulk Email
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminEmail
