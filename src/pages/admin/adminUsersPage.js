import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../apis'
import AdminLayout from '../../Layouts/AdminLayout'
import { DataGrid } from '@mui/x-data-grid'
import { useAdminEmailStyles } from '../../styles/adminStyle'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import SEO from '../../components/shared/Seo'

const AdminUsers = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const classes = useAdminEmailStyles()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const history = useHistory()

  const columns = [
    { field: 'userId', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },

    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'phone', headerName: 'Phone', width: 160 },
    {
      field: 'createdAt',
      headerName: 'Date Joined',
      width: 120,
      valueGetter: (params) => `${moment(params.value).format('Do MMM YYYY')}`,
    },
    { field: 'role', headerName: 'Designation', width: 100 },
    // { field: 'lastLoginDate', headerName: 'Last Login', width: 200 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },

    {
      field: 'fullName',
      headerName: 'Full name',
      // description: 'This column is not sortable.',
      // sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]

  useEffect(() => {
    loadUsers(user.token)
  }, [])

  const loadUsers = async (token) => {
    setLoading(true)
    const res = await getAllUsers(token)

    if (res) {
      setLoading(false)
      setUsers(res.doc)
      console.log(res.doc)
    }
  }
  return (
    <AdminLayout title='Users'>
      <SEO title='Users' />
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant='h6' component='body'>
            All Users
          </Typography>
          <Button
            variant='primary'
            onClick={() => history.push('/admin/user/new')}
          >
            Create User
          </Button>
        </div>
        <Box sx={{ py: 2 }}>
          <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
              rows={users}
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

export default AdminUsers
