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
import { createBlog } from '../../../apis'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import SEO from '../../../components/shared/Seo'

const NewBlog = () => {
  const classes = useAdminNewEmailStyles()

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [images, setImages] = useState([])
  const [body, setBody] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await createBlog(title, body, images, source, user.token)

    if (res) {
      toast.success(`'${res.doc.title}' successfully created`)
      history.push('/admin/blog')
    }
  }

  return (
    <AdminLayout title='Create Blog'>
      <SEO title='Create Blog' />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel htmlFor='title' required>
                Title
              </InputLabel>
              <OutlinedInput
                id='name'
                required
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label='title'
              />
            </FormControl>

            <ReactQuill theme='snow' value={body} onChange={setBody} />

            <FormControl>
              <InputLabel htmlFor='source'>Source URL</InputLabel>
              <OutlinedInput
                id='source'
                type='url'
                value={source}
                onChange={(e) => setSource(e.target.value)}
                label='Source URL'
              />
            </FormControl>
            <Button variant='primary' type='submit'>
              Post
            </Button>
          </Stack>
        </form>
      </div>
    </AdminLayout>
  )
}

export default NewBlog
