import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminLayout from '../../Layouts/AdminLayout'
import { Box, Button, Typography } from '@mui/material'
import { useAdminEmailStyles } from '../../styles/adminStyle'
import { useHistory } from 'react-router-dom'
import { getAllBlogs } from '../../apis'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import SEO from '../../components/shared/Seo'

const AdminBlog = () => {
  const classes = useAdminEmailStyles()

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const res = await getAllBlogs()

    if (res) {
      setLoading(false)
      setBlogs(res.doc)
    }
  }

  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      width: 120,
      valueGetter: (params) => `${moment(params.value).format('Do MMM YYYY')}`,
    },
  ]

  return (
    <AdminLayout title='Blog'>
      <SEO title='Blog' />
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant='h6' component='body'>
            All Blogs
          </Typography>
          <Button
            variant='primary'
            onClick={() => history.push('/admin/blog/new')}
          >
            New Blog
          </Button>
        </div>
        <Box sx={{ py: 2 }}>
          <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid
              rows={blogs}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
              // checkboxSelection
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
        </Box>
      </div>
    </AdminLayout>
  )
}

export default AdminBlog
