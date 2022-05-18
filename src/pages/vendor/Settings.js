import React from 'react'
import { Grid, Container, Box } from '@mui/material'
import SettingsNav from '../../components/shared/vendor/SettingsNav'
import VendorHeader from '../../components/shared/vendor/Header'
import VendorNavbar from '../../components/shared/vendor/Navbar'
import VendorMenu from '../../components/shared/vendor/HeaderMenu'
import SettingsUserInfo from '../../components/settings/SettingsUserInfo'
import SettingsBusinessInfo from '../../components/settings/SettingsBusinessInfo'
import SettingsPasswordChange from '../../components/settings/SettingsPasswordChange'

const Settings = () => {
  return (
    <div>
      <Container>
        <VendorMenu />
        {/* <VendorHeader />
        <VendorNavbar /> */}
        <Box sx={{ pb: 10, pt: 12 }}>
          <Grid container spacing={4}>
            <SettingsNav />
            <SettingsUserInfo />
            {/* <SettingsBusinessInfo /> */}
            {/* <SettingsPasswordChange /> */}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Settings
