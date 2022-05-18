import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  Dialog,
  Slide,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useParams, useHistory, Link } from 'react-router-dom'
import UserLayout from '../../Layouts/UserLayout'
import { useDashboardStyles } from '../../styles/styles'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import ProductCard from '../../components/cards/ProductCard'
import MessageIcon from '@mui/icons-material/Message'
import {
  getUserFollowers,
  getUserProfile,
  getUserFollowing,
  followUser,
  unfollowUser,
  getLoggedInUser,
  getMyProducts,
} from '../../apis'
import AuthContext from '../../contexts/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { NoUserUrl } from '../../noUserImg'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Dashboard = () => {
  const classes = useDashboardStyles()

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  // const auth = useContext(AuthContext)
  const params = useParams()
  const history = useHistory()

  const [userData, setUserData] = useState(null)
  const [loggedUserFollowStats, setUserFollowStats] = useState({})
  const [followLoading, setFollowLoading] = useState(false)

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const [products, setProducts] = useState([])

  useEffect(() => getUser(params.id), [])

  useEffect(() => {
    if (user) {
      getLoggedUser(user.token)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      getFollowers(userData?.user?._id, user.token)
    }
  }, [userData])

  useEffect(() => {
    if (userData) {
      getFollowing(userData?.user?._id, user.token)
    }
  }, [userData])

  useEffect(() => {
    if (userData) {
      loadProducts(userData?.user?._id)
    }
  }, [userData])

  const getFollowers = async (id, token) => {
    const res = await getUserFollowers(id, token)
    if (res) {
      setFollowers(res)
    }
  }

  const getFollowing = async (id, token) => {
    const res = await getUserFollowing(id, token)
    if (res) {
      setFollowing(res)
    }
  }

  const loadProducts = async (id) => {
    const res = await getMyProducts(id)

    if (res) {
      setProducts(res.doc)
    }
  }

  const getLoggedUser = async (token) => {
    const res = await getLoggedInUser(token)

    if (res) {
      const { followStats } = res
      setUserFollowStats(followStats)
    }
  }

  const getUser = async (id) => {
    const res = await getUserProfile(id)

    if (res) {
      setUserData(res)
    }
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const ownAccount = userData?.user?._id === user?._id

  // useEffect(() => {
  //   if (ownAccount) {
  //     history.push('/vendor')
  //   }
  // })

  const isFollowing =
    loggedUserFollowStats?.following?.length > 0 &&
    loggedUserFollowStats?.following?.filter(
      (following) => following.user === userData?.user?._id
    ).length > 0

  return (
    <UserLayout>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={10} className={classes.section}>
            <Avatar
              alt='User'
              src={
                userData?.user?.profilePicUrl
                  ? userData?.user?.profilePicUrl.url
                  : NoUserUrl
              }
              sx={{ width: 200, height: 200 }}
              className={classes.avatar}
            />
            {/* <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 10 }}
              className={classes.status}
            >
              Online
            </Typography> */}

            <Typography variant='h6' component='div' className={classes.title}>
              {`${userData?.user?.firstName} ${userData?.user?.lastName}`}
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 14 }}
              className={classes.idNumber}
            >
              {userData?.user?.userId}
            </Typography>
            {/* <div className={classes.followContainer}>
              <Typography
                variant='h6'
                component='div'
                sx={{ fontSize: 14, cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
                {userData?.followingLength} Following
              </Typography>
              <Typography
                variant='h6'
                component='div'
                sx={{ fontSize: 14, pl: 8, cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
                {userData?.followersLength}{' '}
                {userData?.followersLength > 1 ? 'Followers' : 'Follower'}
              </Typography>
            </div> */}
            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 14 }}
              className={classes.productText}
            >
              7 Products
            </Typography>
            <Link to={`/user/${userData?.user?._id}/posts`} className='link'>
              <Typography
                variant='h6'
                component='div'
                sx={{ fontSize: 14 }}
                className={classes.productText}
              >
                {userData?.postLength}{' '}
                {userData?.postLength > 1 ? 'Posts' : 'Post'}
              </Typography>
            </Link>
            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 14 }}
              className={classes.ratingText}
            >
              4.5 Overall Rating
            </Typography>
            {!ownAccount && (
              <div className={classes.action}>
                <Button variant='primary' startIcon={<MessageIcon />}>
                  T Messenger
                </Button>
                {/* <IconButton>
                  <MailOutlineOutlinedIcon />
                </IconButton>
                <MainButton
                  isFollowing={isFollowing}
                  userData={userData}
                  setUserFollowStats={setUserFollowStats}
                  auth={user}
                /> */}
              </div>
            )}

            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 14 }}
              className={classes.ratingText}
            >
              {userData?.user?.phone}
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 14 }}
              className={classes.ratingText}
            >
              About
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ fontSize: 12 }}
              className={classes.idNumber}
            >
              {userData?.user?.description}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={10} className={classes.paper}>
            <Typography
              variant='h6'
              component='div'
              sx={{ textAlign: 'center', pb: 4 }}
            >
              Products
            </Typography>
            <Grid container spacing={2}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={6} md={3} sm={4} lg={2.4} key={product._id}>
                    <ProductCard
                      product={product}
                      onClick={() => history.push(`/product/${product.slug}`)}
                    />
                  </Grid>
                ))
              ) : (
                <Paper elevation={3} sx={{ p: 2, m: 2, width: '100%' }}>
                  <Typography variant='h6'>User has no product</Typography>
                </Paper>
              )}

              {/* <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard /> */}
              {/* TODO: PRODUCT CARD */}
            </Grid>
          </Paper>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
          >
            <FollowerAndFollowingTab
              userData={userData}
              auth={user}
              loggedUserFollowStats={loggedUserFollowStats}
              setUserFollowStats={setUserFollowStats}
              followers={followers}
              setFollowers={setFollowers}
              following={following}
              setFollowing={setFollowing}
            />
          </Dialog>
        </Grid>
      </Grid>
    </UserLayout>
  )
}

// =========================

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function FollowerAndFollowingTab({
  userData,
  auth,
  loggedUserFollowStats,
  setUserFollowStats,
  followers,
  setFollowers,
  following,
  setFollowing,
}) {
  const [value, setValue] = useState(0)
  // const [followers, setFollowers] = useState([])
  // const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  // const handleFollow = async (userToFollowId, token, setUserFollowStats) => {
  //   await followUser(userToFollowId, token)

  //   setUserFollowStats((prev) => ({
  //     ...prev,
  //     following: [...prev.following, { user: userToFollowId }],
  //   }))
  // }

  // const handleUnfollow = async (
  //   userToUnfollowId,
  //   token,
  //   setUserFollowStats
  // ) => {
  //   await unfollowUser(userToUnfollowId, token)

  //   setUserFollowStats((prev) => ({
  //     ...prev,
  //     following: prev.following.filter(
  //       (following) => following.user !== userToUnfollowId
  //     ),
  //   }))
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // useEffect(() => {
  //   if (userData) {
  //     getFollowers(userData?.user?._id, auth.token)
  //   }
  //
  // }, [userData])

  // useEffect(() => {
  //   if (userData) {
  //     getFollowing(userData?.user?._id, auth.token)
  //   }
  //   // getFollowing('621bc0bf78832e919f65eb72', auth.token)
  // }, [userData])

  // const getFollowers = async (id, token) => {
  //   const res = await getUserFollowers(id, token)
  //   if (res) {
  //     setFollowers(res)
  //   }
  // }

  // const getFollowing = async (id, token) => {
  //   const res = await getUserFollowing(id, token)
  //   if (res) {
  //     setFollowing(res)
  //   }
  // }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{ width: '30rem' }}
        >
          <Tab label='Followers' {...a11yProps(0)} />
          <Tab label='Following' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {loading
          ? 'Loading'
          : followers.length > 0
          ? followers.map((profileFollower) => {
              const isFollowing =
                loggedUserFollowStats?.following?.length > 0 &&
                loggedUserFollowStats?.following?.filter(
                  (following) => following.user === profileFollower.user._id
                ).length > 0

              return (
                <>
                  <List
                    key={profileFollower?.user?._id}
                    dense
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <ListItem
                      secondaryAction={
                        <MainButton
                          isFollowing={isFollowing}
                          userData={profileFollower}
                          setUserFollowStats={setUserFollowStats}
                          auth={auth}
                        />

                        //

                        // <Button
                        //   variant='primary'
                        //   edge='end'
                        //   aria-label='comments'

                        // >
                        //   {isFollowing ? 'Following' : 'Follow'}
                        // </Button>
                      }
                      disablePadding
                    >
                      <Link
                        to={`/user/${profileFollower?.user?._id}`}
                        className='link'
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={`${profileFollower?.user?.firstName} ${profileFollower?.user?.lastName}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                          />
                        </ListItemAvatar>
                      </Link>
                      <Link
                        to={`/user/${profileFollower?.user?._id}`}
                        className='link'
                      >
                        <ListItemText>
                          {`${profileFollower?.user?.firstName} ${profileFollower?.user?.lastName}`}
                        </ListItemText>
                      </Link>
                    </ListItem>
                  </List>
                </>
              )
            })
          : 'No Follower'}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading
          ? 'Loading'
          : following.length > 0
          ? following.map((profileFollowing) => {
              const isFollowing =
                loggedUserFollowStats?.following?.length > 0 &&
                loggedUserFollowStats?.following?.filter(
                  (following) => following.user === profileFollowing?.user?._id
                ).length > 0

              return (
                <>
                  <List
                    key={profileFollowing.user._id}
                    dense
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <ListItem
                      secondaryAction={
                        <MainButton
                          isFollowing={isFollowing}
                          userData={profileFollowing}
                          setUserFollowStats={setUserFollowStats}
                          auth={auth}
                        />
                        // <Button
                        //   variant='primary'
                        //   edge='end'
                        //   aria-label='comments'
                        // >
                        //   {isFollowing ? 'Following' : 'Follow'}
                        // </Button>
                      }
                      disablePadding
                    >
                      <Link
                        to={`/user/${profileFollowing?.user?._id}`}
                        className='link'
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={`${profileFollowing?.user?.firstName} ${profileFollowing?.user?.lastName}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                          />
                        </ListItemAvatar>
                      </Link>
                      <Link
                        to={`/user/${profileFollowing?.user?._id}`}
                        className='link'
                      >
                        <ListItemText>
                          {`${profileFollowing?.user?.firstName} ${profileFollowing?.user?.lastName}`}
                        </ListItemText>
                      </Link>
                    </ListItem>
                  </List>
                </>
              )
            })
          : 'Not Following'}
      </TabPanel>
    </Box>
  )
}

function MainButton({ isFollowing, userData, setUserFollowStats, auth }) {
  const FollowButton = Button

  const handleFollow = async () => {
    await followUser(userData?.user?._id, auth.token)

    setUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userData?.user?._id }],
    }))
  }

  const handleUnfollow = async () => {
    await unfollowUser(userData?.user?._id, auth.token)
    setUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter(
        (following) => following.user !== userData?.user?._id
      ),
    }))
  }

  const onClick = isFollowing ? handleUnfollow : handleFollow

  const text = isFollowing ? 'Following' : 'Follow'
  const variant = isFollowing ? 'plain' : 'primary'

  return (
    <FollowButton onClick={onClick} variant={variant}>
      {text}
    </FollowButton>
  )
}

export default Dashboard
