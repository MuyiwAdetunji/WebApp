import React, { useEffect, useState } from 'react'
import { useAdminEmailStyles } from '../../../styles/adminStyle'
import { Box, Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { getAllProducts } from '../../../apis'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'

const AdminProduct = () => {
  const classes = useAdminEmailStyles()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const naira = '\u20A6'

  const history = useHistory()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    const res = await getAllProducts()

    if (res) {
      setLoading(false)
      setProducts(res.doc)
      console.log(res)
    }
  }

  const columns = [
    { field: 'productName', headerName: 'Product Name', width: 130 },
    { field: `price`, headerName: 'Price', width: 100 },
    { field: `quantity`, headerName: 'Qty. Left', width: 100 },
    { field: `sold`, headerName: 'Qty. Sold', width: 100 },
    { field: `ratingsAverage`, headerName: 'Avg. Rating', width: 100 },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      width: 120,
      valueGetter: (params) => `${moment(params.value).format('Do MMM YYYY')}`,
    },

    {
      field: 'user',
      headerName: 'Owner',
      // description: 'This column is not sortable.',
      // sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.value.firstName || ''} ${params.value.lastName || ''}`,
    },
  ]

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant='h6' component='body'>
          All Products
        </Typography>
        <Button variant='primary' onClick={() => history.push('/add-product')}>
          Create Product
        </Button>
      </div>
      <Box sx={{ py: 2 }}>
        <div style={{ height: '70vh', width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
            checkboxSelection
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
  )
}

export default AdminProduct
