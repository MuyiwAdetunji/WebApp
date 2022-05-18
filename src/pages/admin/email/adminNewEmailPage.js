import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { useAdminNewEmailStyles } from '../../../styles/adminStyle'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { sendEmail } from '../../../apis'
import { useDispatch, useSelector } from 'react-redux'
import SEO from '../../../components/shared/Seo'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const NewEmail = () => {
  const classes = useAdminNewEmailStyles()

  const [senderName, setSenderName] = useState('Alex from Tinkoko')
  const [senderEmail, setSenderEmail] = useState('no-reply')
  const [emails, setEmails] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const history = useHistory()

  const { user } = useSelector((state) => ({ ...state }))

  const data = emails.split(/[\n,]/)
  const receiverEmails = data.filter((item) => item)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const sender = senderEmail.concat('@tinkoko.com')

    const res = await sendEmail(
      senderName,
      sender,
      receiverEmails,
      subject,
      body,
      user.token
    )

    if (res && res.status === 'success') {
      toast.success('Emails Sent Successfully')
      history.push('/admin/email')
    }
  }

  return (
    <AdminLayout title='New Email'>
      <SEO title='Create Email' />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel htmlFor='name' required>
                Sender's Name
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                label="Sender's Name"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='name' required>
                Sender's Email
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                label="Sender's Email"
                endAdornment={
                  <InputAdornment position='end'>@tinkoko.com</InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                id='recipents'
                required
                type='text'
                multiline
                maxRows={4}
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                label='Recipients'
                render
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='subject' required>
                Email Subject
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label='Email Subject'
              />
            </FormControl>
            <ReactQuill theme='snow' value={body} onChange={setBody} />
            <Button
              variant='primary'
              type='submit'
            >{`Send Email (${receiverEmails.length})`}</Button>
          </Stack>
        </form>
      </div>
    </AdminLayout>
  )
}

export default NewEmail
