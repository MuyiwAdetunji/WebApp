import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import JobsListCard from '../../../components/jobs/JobsListCard'
import UserLayout from '../../../Layouts/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getMyJobs } from '../../../apis'
import AgentNavbar from '../../../components/shared/agent/NavBar'
import VendorNavbar from '../../../components/shared/vendor/Navbar'
import HeaderMenu from '../../../components/shared/vendor/HeaderMenu'
import Header from '../../../components/shared/agent/Header'
import VendorHeader from '../../../components/shared/vendor/Header'

const MyJobs = () => {
  const [jobs, setJobs] = useState([])
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadMyJobs(user._id)
  }, [])
  console.log(jobs)
  const loadMyJobs = async (id) => {
    const res = await getMyJobs(id)

    if (res) {
      setJobs(res.doc)
    }
  }

  return (
    <Container sx={{ py: 10 }}>
      {user.role === 'agent' && <Header />}
      {user.role === 'agent' && <AgentNavbar />}
      {user.role === 'vendor' && <HeaderMenu />}
      {/* {user.role === 'vendor' && <VendorNavbar />} */}

      <Grid container spacing={3}>
        <Hidden mdDown>
          <Grid item xs={3}></Grid>
        </Hidden>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              // background: '#ccc',
            }}
          >
            <Typography variant='h6' component='p'>
              MY JOBS
            </Typography>
            <Button
              // variant={user.role === 'agent' ? 'agent' : 'vendor'}
              variant='primary'
              onClick={() => {
                history.push('/jobs/create')
              }}
            >
              Create Job
            </Button>
          </Box>
          {jobs.length > 0
            ? jobs.map((job) => (
                <JobsListCard
                  job={job}
                  key={job._id}
                  buttonText={`See Applicants (0)`}
                  onClick={() => {
                    history.push(`/jobs/${job._id}`)
                  }}
                />
              ))
            : "You haven't posted a job"}
        </Grid>
        <Hidden mdDown>
          <Grid item xs={3}></Grid>
        </Hidden>
      </Grid>
    </Container>
    // <UserLayout>

    // </UserLayout>
  )
}

export default MyJobs
