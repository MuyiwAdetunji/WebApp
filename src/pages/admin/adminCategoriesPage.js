import { Tabs, Tab, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import AdminCategory from '../../components/admin/categoriesNav/Category'
import AdminSubCategory from '../../components/admin/categoriesNav/SubCategory'
import AdminLayout from '../../Layouts/AdminLayout'
import SEO from '../../components/shared/Seo'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AdminCategories = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <AdminLayout title='Categories'>
      <SEO title='Categories' />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Categories' {...a11yProps(0)} />
            <Tab label='Sub Categories' {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <AdminCategory />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminSubCategory />
        </TabPanel>
      </Box>
    </AdminLayout>
  )
}

export default AdminCategories
