// import React from 'react'
// import FeedPost from '../components/feed/FeedPost'
import SEO from '../components/shared/Seo'
import { Box, Container, Grid, Hidden } from '@mui/material'
import React, { useState, useEffect } from 'react'
import FeedCard from '../components/cards/FeedCard'
import Header from '../components/shared/agent/Header'
import VendorHeader from '../components/shared/vendor/Header'
import HeaderMenu from '../components/shared/vendor/HeaderMenu'
import { getAllPosts } from '../apis'
import PostSkeleton from '../components/skeletons/PostSkeleton'
import AgentNavbar from '../components/shared/agent/NavBar'
import VendorNavbar from '../components/shared/vendor/Navbar'
import UserHeader from '../components/Header'

import { useDispatch, useSelector } from 'react-redux'
import SearchNav from '../components/shared/SearchNav'
import FeedNav from '../components/feed/FeedNav'
import FeedRightBar from '../components/feed/FeedRightBar'
import CreateFeed from '../components/feed/CreateFeed'

const FeedPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  // function focusEditor() {
  //   editor.current.focus()
  // }

  // useEffect(() => {
  //   focusEditor()
  // }, [])

  // const auth = useContext(AuthContext)

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
      {user.role === 'vendor' && <Box sx={{ my: 8 }}></Box>}
      <SEO title='Feeds' />
      {(!user || user.role === 'user' || user.role === 'admin') && (
        <Box sx={{ mt: 10 }}>
          <UserHeader />
        </Box>
      )}
      <Container>
        {user.role === 'agent' && <Header />}
        {user.role === 'agent' && <AgentNavbar />}
        {/* {user.role === 'vendor' && <VendorHeader />}
        {user.role === 'vendor' && <VendorNavbar />} */}
        {user.role === 'vendor' && <HeaderMenu />}
      </Container>
      <Container>
        <Grid container spacing={3}>
          <Hidden mdDown>
            <Grid item xs={3} sx={{ height: '80vh', overflow: 'auto' }}>
              <Box sx={{ my: 2, mx: 'auto' }}>
                <FeedNav />
              </Box>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12} sx={{ height: '100vh', overflow: 'auto' }}>
            <Box maxWidth='sm' sx={{ my: 2, mx: 'auto' }}>
              <CreateFeed />
              {/* <div onClick={focusEditor}>
                <Editor
                  ref={editor}
                  editorState={editorState}
                  onChange={(editorState) => setEditorState(editorState)}
                />
              </div> */}
            </Box>
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
          <Hidden mdDown>
            <Grid item xs={3} sx={{ height: '80vh', overflow: 'auto' }}>
              <Box sx={{ my: 2, mx: 'auto' }}>
                <FeedRightBar />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  )
}

export default FeedPage
