import UserLayout from '../../Layouts/UserLayout'
import { Box, Container } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import FeedCard from '../../components/cards/FeedCard'
import Header from '../../components/shared/agent/Header'
import VendorHeader from '../../components/shared/vendor/Header'
import { getPost } from '../../apis'
import PostSkeleton from '../../components/skeletons/PostSkeleton'
import AuthContext from '../../contexts/AuthContext'
import AgentNavbar from '../../components/shared/agent/NavBar'
import VendorNavbar from '../../components/shared/vendor/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SingleFeed = () => {
  const [post, setPosts] = useState({})
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  console.log(post)

  // const auth = useContext(AuthContext)
  const params = useParams()

  useEffect(() => {
    console.log(params.id)
    loadPosts(params.id)
  }, [])

  const loadPosts = async (id) => {
    try {
      setLoading(true)
      const res = await getPost(id)

      if (res) {
        setLoading(false)
        setPosts(res)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <UserLayout>
      {' '}
      <Box maxWidth='sm' sx={{ my: 10, mx: 'auto' }}>
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <>
            <FeedCard post={post} />
          </>
        )}
      </Box>
    </UserLayout>
  )
}

export default SingleFeed
