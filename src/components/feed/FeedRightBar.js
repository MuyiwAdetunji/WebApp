import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import FeedFooter from './FeedFooter'
import NewsCard from './NewsCard'
import { getAllBlogs } from '../../apis'
import { useHistory } from 'react-router-dom'

const FeedRightBar = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    setLoading(true)
    const res = await getAllBlogs()

    if (res) {
      setBlogs(res.doc)
      setLoading(false)
    }
  }
  return (
    <>
      <Typography variant='h6' component='p'>
        Tinkoko Blog
      </Typography>
      {blogs.map((news) => (
        <NewsCard
          key={news._id}
          news={news}
          onClick={() => history.push(`/blog/${news._id}`)}
        />
      ))}

      <FeedFooter />
    </>
  )
}

export default FeedRightBar
