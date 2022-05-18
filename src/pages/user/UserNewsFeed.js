import UserLayout from '../../Layouts/UserLayout'
import { Box, Container } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import FeedCard from '../../components/cards/FeedCard'
import Header from '../../components/shared/agent/Header'
import VendorHeader from '../../components/shared/vendor/Header'
import { getUserPost } from '../../apis'
import PostSkeleton from '../../components/skeletons/PostSkeleton'
import AuthContext from '../../contexts/AuthContext'
import AgentNavbar from '../../components/shared/agent/NavBar'
import VendorNavbar from '../../components/shared/vendor/Navbar'
import { useParams } from 'react-router-dom'

const UserNewsFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  // const auth = useContext(AuthContext)
  const params = useParams()

  useEffect(() => {
    loadPosts(params.userId)
  }, [])

  const loadPosts = async (id) => {
    try {
      setLoading(true)
      const res = await getUserPost(id)

      if (res) {
        setLoading(false)
        setPosts(res.posts)
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
            {posts.map((post) => (
              <FeedCard key={post._id} post={post} setPosts={setPosts} />
            ))}
          </>
        )}
      </Box>
    </UserLayout>
  )
}

export default UserNewsFeed
