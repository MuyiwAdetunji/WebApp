import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import UserLayout from '../Layouts/UserLayout'
import { getBlog } from '../apis'
import SEO from '../components/shared/Seo'

const Blog = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState({})

  useEffect(() => {
    loadBlog(params.id)
  }, [])

  const loadBlog = async (id) => {
    setLoading(true)
    const res = await getBlog(id)

    if (res) {
      setLoading(false)
      setBlog(res.doc)
      console.log(res)
    }
  }

  return (
    <UserLayout>
      <SEO title={blog.title} />
      <Container>
        <Box sx={{ mt: 12, my: 5 }}>
          <Typography variant='h5' sx={{ py: 2 }}>
            {blog.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
          {blog.source && (
            <div
              style={{
                marginTop: '1rem',
              }}
            >
              Source:{' '}
              <a
                href={blog.source}
                target='_blank'
                rel='noreferrer'
                style={{
                  textDecoration: 'none',
                  color: '#C3E88D',
                  fontStyle: 'italic',
                }}
              >
                {blog.source}
              </a>{' '}
            </div>
          )}
        </Box>
      </Container>
    </UserLayout>
  )
}

export default Blog
