import { Box, Container, Grid } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import FeedCard from '../../components/cards/FeedCard'
import Header from '../../components/shared/agent/Header'
import VendorHeader from '../../components/shared/vendor/Header'
import { getAllPosts } from '../../apis'
import PostSkeleton from '../../components/skeletons/PostSkeleton'
import AuthContext from '../../contexts/AuthContext'
import AgentNavbar from '../../components/shared/agent/NavBar'
import VendorNavbar from '../../components/shared/vendor/Navbar'

import { useDispatch, useSelector } from 'react-redux'
import SearchNav from '../../components/shared/SearchNav'

const NewsFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const res = await getAllPosts()

      if (res) {
        setLoading(false)
        setPosts(res)
      }
    } catch (err) {
      setLoading(false)
    }
  }
  return (
    <>
      <Container>
        {user.role === 'agent' && <Header />}
        {user.role === 'agent' && <AgentNavbar />}
        {user.role === 'vendor' && <VendorHeader />}
        {user.role === 'vendor' && <VendorNavbar />}

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box sx={{ my: 2, mx: 'auto' }}>
              <SearchNav />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box maxWidth='sm' sx={{ my: 2, mx: 'auto' }}>
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
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default NewsFeed
