import {
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
  Typography,
  MenuItem,
  Checkbox,
  Button,
} from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import React, { useState } from 'react'
import { createJobAnswers } from '../../apis'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const JobApply = ({ job }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [answers, setAnswers] = useState(new Map())

  const history = useHistory()

  function updateAnswer(id, value) {
    const newMap = new Map(answers)
    newMap.set(id, value)
    setAnswers(newMap)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(answers)
    const res = await createJobAnswers(
      job._id,
      name,
      phone,
      email,
      city,
      Object.fromEntries(answers.entries())
    )

    if (res) {
      history.push('/')
      toast.success('Application Successful')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ textAlign: 'center' }} variant='h6' component='p'>
        Application
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 56, height: 56, mr: 2, color: 'black' }}>
          <WorkIcon />
        </Avatar>
        <Box>
          <Typography variant='h6' component='p'>
            {job.title}
          </Typography>
          <Typography variant='subtitle2' component='p'>
            {job.jobType}
          </Typography>
          <Typography variant='subtitle2' component='p'>
            {job?.user?.storeName}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: '100%', mt: 2, my: 1 }} variant='outlined'>
            <InputLabel htmlFor='name' required>
              Name
            </InputLabel>
            <OutlinedInput
              required
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              label='Name'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: '100%', mt: 2, my: 1 }} variant='outlined'>
            <InputLabel htmlFor='phone' required>
              Phone
            </InputLabel>
            <OutlinedInput
              id='phone'
              type='number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label='Phone'
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: '100%', my: 1 }} variant='outlined'>
            <InputLabel htmlFor='email' required>
              Email
            </InputLabel>
            <OutlinedInput
              required
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: '100%', my: 1 }} variant='outlined'>
            <InputLabel htmlFor='city' required>
              City
            </InputLabel>
            <OutlinedInput
              id='city'
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label='city'
            />
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant='h6' component='p'>
        Screening Questions
      </Typography>

      {job?.screeningQuestions?.map((q) => (
        <Box sx={{ my: 1 }} key={q.id}>
          <p>{q.question}</p>
          {q?.questionType === 'boolean' ? (
            <Grid container>
              <Grid item xs={12} md={4}>
                <Select
                  id='location'
                  required={q.requiredQuestion}
                  fullWidth
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </Grid>
            </Grid>
          ) : (
            <OutlinedInput
              required={q.requiredQuestion}
              id='name'
              type='text'
              fullWidth
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              // label='Name'
            />
          )}
        </Box>
      ))}
      <Box sx={{ my: 4, p: 2, background: '#F3F3F3', borderRadius: 2 }}>
        <Typography variant='body2'>
          {`Your application will be shared with ${job?.user?.storeName} and may be sent to them in Messenger. When you submit an application, ${job?.user?.storeName} will see who you are and your public info. Your messages will be
          relayed through Tinkoko and monitored for policy violations. Your information will be used according to Tinkoko's Data Policy.`}
        </Typography>
        <Box
          sx={{
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='body2'>I agree</Typography>
          <Checkbox required />
        </Box>
      </Box>

      <Button type='submit' variant='primary'>
        Send
      </Button>
    </form>
  )
}

export default JobApply
