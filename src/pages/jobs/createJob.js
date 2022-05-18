import React, { useState, useEffect, useRef } from 'react'
import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
} from '@mui/material'
import { useJobsStyles } from '../../styles/styles'
import VendorHeader from '../../components/shared/vendor/Header'
import VendorNavbar from '../../components/shared/vendor/Navbar'
import HeaderMenu from '../../components/shared/vendor/HeaderMenu'
import { v4 as uuidv4 } from 'uuid'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'
import AgentHeader from '../../components/shared/agent/Header'
import AgentNavbar from '../../components/shared/agent/NavBar'
import { createJob } from '../../apis'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const JobCreate = () => {
  const classes = useJobsStyles()
  const [title, setTitle] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [minSalary, setMinSalary] = useState('')
  const [maxSalary, setMaxSalary] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [question, setQuestion] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [requiredQuestion, setRequiredQuestion] = useState(false)
  const [questions, setQuestions] = useState([])
  const [showQuestion, setShowQuestion] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()

  const naira = '\u20A6'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await createJob(
      title,
      workLocation,
      jobType,
      jobDescription,
      minSalary,
      maxSalary,
      questions,
      user._id,
      user.token
    )
    if (res) {
      if (res.status === 'success') {
        toast.success('Your Job has been created')
        history.push('/my-jobs')
      }
    }
  }

  function addItem(e) {
    e.preventDefault()
    setQuestions([
      ...questions,
      { id: uuidv4(), questionType, question, requiredQuestion },
    ])
    setQuestionType('')
    setQuestion('')
    setRequiredQuestion(false)
  }

  const handleRemove = (e) => (id) => {
    // e.preventDefault()
    // questions.splice(
    //   questions.findIndex(function (i) {
    //     return i.id === id
    //   }),
    //   1
    // )
  }

  const screeningQuestions = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question Type</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        {questions.map((q) => (
          <TableBody key={q.id}>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{q.questionType}</TableCell>
              <TableCell>{q.question}</TableCell>
              <TableCell>
                <Checkbox checked={q.requiredQuestion} disabled />
              </TableCell>

              <TableCell className='text-center'>
                <IconButton
                  onClick={() => {
                    handleRemove(q.id)
                  }}
                >
                  <DeleteIcon sx={{ color: '#f00' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  )

  return (
    <Container>
      {user.role === 'vendor' ? (
        <>
          {/* <VendorHeader />
          <VendorNavbar /> */}
          <HeaderMenu />
        </>
      ) : (
        <>
          <AgentHeader />
          <AgentNavbar />
        </>
      )}

      <Grid container spacing={5} sx={{ py: 10 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={5}
            className={classes.paper}
            // sx={{ height: '100vh', overflow: 'auto' }}
          >
            <Typography component='div' variant='h6' sx={{ mb: 3 }}>
              Create Job
            </Typography>
            <div className={classes.avatarContainer}>
              <Avatar
                sx={{ width: 56, height: 56, mr: 3 }}
                alt='User'
                src='/static/images/avatar/1.jpg'
              />
              <Typography>{user.storeName}</Typography>
            </div>
            <form>
              <Stack spacing={3}>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='job-title' required>
                    Job Title
                  </InputLabel>
                  <OutlinedInput
                    id='job-title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label='Job Title'
                  />
                </FormControl>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='business-name' required>
                    Business Name
                  </InputLabel>
                  <OutlinedInput
                    id='business-name'
                    type='text'
                    value={user.storeName}
                    disabled
                    label='Business Name'
                  />
                </FormControl>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='work-location' required>
                    Work Location
                  </InputLabel>
                  <OutlinedInput
                    id='work-location'
                    type='text'
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    label='Work Location'
                  />
                </FormControl>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='location' required>
                    Job Type
                  </InputLabel>
                  <Select
                    id='location'
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    label='Location'
                  >
                    <MenuItem value='Full Time'>Full Time</MenuItem>
                    <MenuItem value='Contract'>Contract</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label='Description'
                  multiline
                  rows={5}
                  sx={{ width: '100%', my: 2 }}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />

                <Typography component='body' variant='subtitle2'>
                  Salary Range
                </Typography>

                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='job-title'>
                    Minimum Salary (optional)
                  </InputLabel>
                  <OutlinedInput
                    id='job-title'
                    type='number'
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    label='Minimum Salary (optional)'
                  />
                </FormControl>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='business-name'>
                    Maximum Salary (optional)
                  </InputLabel>
                  <OutlinedInput
                    id='business-name'
                    type='number'
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    label='Maximum Salary (optional)'
                  />
                </FormControl>

                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='location'>
                    Salary Type (Optional)
                  </InputLabel>
                  <Select
                    id='location'
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    label='Salary Type (Optional)'
                  >
                    <MenuItem value='Hourly'>Hourly</MenuItem>
                    <MenuItem value='Daily'>Daily</MenuItem>
                    <MenuItem value='Weekly'>Weekly</MenuItem>
                    <MenuItem value='Monthly'>Monthly</MenuItem>
                  </Select>
                </FormControl>
                <Typography component='body' variant='subtitle2'>
                  Screening Questions
                </Typography>
                <Button variant='plain'>+ Popular Questions</Button>
                <Button
                  variant='plain'
                  onClick={() => setShowQuestion(!showQuestion)}
                >
                  + Write Question
                </Button>

                {showQuestion && (
                  <div>
                    <Stack spacing={2}>
                      <Typography variant='subtitle2'>Question</Typography>

                      <FormControl sx={{ width: '100%' }} variant='outlined'>
                        <InputLabel htmlFor='location'>
                          Question Type
                        </InputLabel>
                        <Select
                          id='location'
                          value={questionType}
                          onChange={(e) => setQuestionType(e.target.value)}
                          label='Question Type'
                        >
                          <MenuItem value='boolean'>Yes/No</MenuItem>
                          <MenuItem value='text'>Text</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ width: '100%' }} variant='outlined'>
                        <InputLabel htmlFor='question'>Question</InputLabel>
                        <OutlinedInput
                          id='question'
                          type='text'
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          label='Question'
                        />
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox checked={requiredQuestion} />}
                        label='Answer is required?'
                        value={requiredQuestion}
                        onChange={(e) => setRequiredQuestion(!requiredQuestion)}
                      />
                      <Button
                        variant={user.role === 'vendor' ? 'vendor' : 'agent'}
                        startIcon={<AddIcon />}
                        onClick={addItem}
                        disabled={!question || !questionType}
                      >
                        Add Question
                      </Button>
                    </Stack>
                  </div>
                )}
              </Stack>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={5} className={classes.paper}>
            <Typography sx={{ mb: 3 }}>Preview</Typography>
            <div className={classes.avatarContainer}>
              <Avatar
                sx={{ width: 56, height: 56, mr: 3 }}
                alt='Remy Sharp'
                src='/static/images/avatar/1.jpg'
              />
              <Typography component='div' variant='h6'>
                {title}
              </Typography>
            </div>
            <Paper sx={{ margin: '3rem auto', width: '500px', p: 3 }}>
              <Typography component='div' variant='h6'>
                Job Details
              </Typography>
              <div className={classes.details}>
                <WorkIcon sx={{ mr: 2 }} />
                <Typography sx={{ mr: 2 }}>{jobType}</Typography>
                <Typography sx={{ mr: 2 }}>
                  {minSalary ? naira : ''}
                  {minSalary
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  - {maxSalary ? naira : ''}
                  {maxSalary
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  / {salaryType}
                </Typography>
              </div>
              <div className={classes.details}>
                <LocationOnIcon />
                <Typography>{workLocation}</Typography>
              </div>
              <Typography component='div' variant='h6'>
                Job Description
              </Typography>
              <Typography sx={{ mr: 2 }}>{jobDescription}</Typography>

              {questions.length > 0 ? (
                <>
                  <Typography component='div' variant='h6'>
                    Screening Questions
                  </Typography>
                  {screeningQuestions()}
                </>
              ) : null}
            </Paper>
            <Grid container>
              <Hidden mdDown>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Hidden>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant='primary'
                  // variant={user.role === 'agent' ? 'agent' : 'vendor'}
                  disabled={
                    !title || !workLocation || !jobType || !jobDescription
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default JobCreate
