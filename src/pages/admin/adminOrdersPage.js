import { Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import React from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import SEO from '../../components/shared/Seo'

const AdminOrders = () => {
  const history = useHistory()
  return (
    <AdminLayout title='Orders'>
      <SEO title='Orders' />
    </AdminLayout>
  )
}

export default AdminOrders
