import { Container, Grid, Hidden, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import JobsListCard from '../../components/jobs/JobsListCard'
import UserLayout from '../../Layouts/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../apis'

const AllJobs = () => {
  const [jobs, setJobs] = useState([])
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadAllJobs()
  }, [])

  const loadAllJobs = async () => {
    const res = await getAllJobs()

    if (res) {
      setJobs(res.doc)
    }
  }
  return (
    <UserLayout>
      <Grid container spacing={3} sx={{ background: '#e5e5e5' }}>
        <Hidden mdDown>
          <Grid item xs={3}></Grid>
        </Hidden>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <Container>
            <Typography variant='h6' component='p'>
              JOBS NEARBY
            </Typography>
            {jobs.length > 0
              ? jobs.map((job) => (
                  // <JobsListCard
                  //   job={job}
                  //   buttonText='Apply'
                  //   key={job._id}
                  //   onClick={() => {
                  //     history.push(`/jobs/${job._id}`)
                  //   }}
                  // />

                  <JobsListCard
                    job={job}
                    key={job._id}
                    buttonText={`Apply`}
                    onClick={() => {
                      history.push(`/jobs/${job._id}`)
                    }}
                  />
                ))
              : 'No Job found'}
          </Container>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={3}></Grid>
        </Hidden>
      </Grid>
    </UserLayout>
  )
}

export default AllJobs
