import { Container, Typography, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJob } from '../../apis'
import JobApply from '../../components/jobs/JobApply'
import UserLayout from '../../Layouts/UserLayout'

const JobPage = () => {
  const params = useParams()
  const [job, setJob] = useState({})

  useEffect(() => {
    loadJob(params.id)
  }, [])

  const loadJob = async (id) => {
    const res = await getJob(id)

    if (res) {
      setJob(res.doc)
    }
  }

  return (
    <UserLayout>
      <Container>
        <Box sx={{ py: 3 }}>
          {/* <Typography>JobPage</Typography> */}
          <JobApply job={job} />
        </Box>
      </Container>
    </UserLayout>
  )
}

export default JobPage
