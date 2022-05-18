import { Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import React from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import SEO from '../../components/shared/Seo'

const AdminReports = () => {
  const history = useHistory()
  return (
    <AdminLayout title='Reports'>
      <SEO title='Reports' />
    </AdminLayout>
  )
}

export default AdminReports
