import {
  Avatar,
  IconButton,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  Hidden,
  Container,
  Popper,
  Fade,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Menu,
} from '@mui/material'
import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useFeedCardStyles } from '../../styles/agentStyle'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import AuthContext from '../../contexts/AuthContext'
import { AiOutlineLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { FaRegCommentDots } from 'react-icons/fa'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'
import ReportIcon from '@mui/icons-material/Report'
import { Link } from 'react-router-dom'
import calculateTime from '../../utils/calculateTime'
import {
  deletePost,
  createComment,
  likePost,
  unlikePost,
  createReportFeed,
} from '../../apis'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import CommentCard from './CommentCard'
import { toast } from 'react-toastify'
import LikesList from '../feed/LikesList'
import { NoUserUrl } from '../../noUserImg'

const FeedCard = ({ post, setPosts }) => {
  const classes = useFeedCardStyles()
  // const auth = useContext(AuthContext)
  const history = useHistory()

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const [likes, setLikes] = useState(post?.likes)
  const [comments, setComments] = useState(post?.comments)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClickClose = () => {
    setDialogOpen(false)
  }
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleClick = (newPlacement) => (event) => {
  //   setAnchorEl(event.currentTarget)
  //   setOpen((prev) => placement !== newPlacement || !prev)
  //   setPlacement(newPlacement)

  const handleReport = async (postId, text) => {
    const report = await createReportFeed(postId, text)

    if (report) {
      toast.success(`Post Reported`)
      handleClose()
    }
  }

  const handleDelete = async (postId, token) => {
    if (window.confirm('Delete Post?')) {
      setLoading(true)

      const deleted = await deletePost(postId, token)

      if (deleted) {
        setLoading(false)
        toast.success(`Post deleted successfully`)
        setPosts((prev) => prev.filter((post) => post._id !== postId))
        handleClose()
      } else {
        toast.error('Something went wrong')
        setLoading(false)
        handleClose()
      }
    }
  }

  const isLiked =
    likes?.length > 0 &&
    likes?.filter((like) => like.user === user._id).length > 0

  const [showCaption, setCaption] = useState(false)
  // const comments = []
  return (
    <article className={classes.article}>
      <div className={classes.heading}>
        <div className={classes.headingContainer}>
          <Link to={`/user/${post?.poster?._id}`} className='link'>
            <Avatar
              alt='user avatar'
              src={
                post?.poster?.profilePicUrl
                  ? post?.poster?.profilePicUrl?.url
                  : NoUserUrl
              }
              sx={{ width: 56, height: 56 }}
            />
          </Link>
          <div className={classes.headingText}>
            <Link to={`/user/${post?.poster?._id}`} className='link'>
              <Typography component='h4' variant='h6'>
                {`${post?.poster?.firstName} ${post?.poster?.lastName}`}
              </Typography>
            </Link>
            <Typography sx={{ fontSize: 12 }}>
              {calculateTime(post?.poster?.createdAt)}
            </Typography>
          </div>
        </div>
        <IconButton
          id='demo-positioned-button'
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon sx={{ color: '#E4E4E4' }} />
        </IconButton>
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShareIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
          </MenuItem>
          {((!user && user.token) || post?.poster._id !== user._id) && (
            <MenuItem
              onClick={() => {
                handleReport(post._id, 'Reporting')
              }}
            >
              <ListItemIcon>
                <ReportIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Report</ListItemText>
            </MenuItem>
          )}
          {user && user.token && post?.poster._id === user._id && (
            <MenuItem>
              <ListItemIcon>
                <EditIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          )}
          {user &&
            user.token &&
            (user.role === 'admin' || post?.poster._id === user._id) && (
              <MenuItem onClick={() => handleDelete(post._id, user.token)}>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            )}
        </Menu>
      </div>
      <div className={classes.content}>
        <div className={showCaption ? classes.expanded : classes.collasped}>
          {showCaption ? (
            <Typography
              variant='body2'
              component='span'
              dangerouslySetInnerHTML={{ __html: post?.post }}
            />
          ) : (
            <div className={classes.captionWrapper}>
              <HTMLEllipsis
                unsafeHTML={post?.post}
                className={classes.caption}
                maxLine='0'
                ellipsis='...'
                basedOn='letters'
              />{' '}
              <Typography
                sx={{ cursor: 'pointer', color: '#7fb560' }}
                className={classes.moreButton}
                onClick={() => setCaption(true)}
              >
                More
              </Typography>
            </div>
          )}
        </div>
      </div>
      <Carousel showThumbs={false}>
        {post?.images.map((image) => (
          <div key={image.public_id}>
            <img className={classes.image} src={image?.url} alt='Post' />
          </div>
        ))}
      </Carousel>

      <div className={classes.likeContainer}>
        <div className={classes.likeIcon}>
          <LikeButton
            post={post}
            likes={likes}
            setLikes={setLikes}
            isLiked={isLiked}
            auth={user}
          />
          <Typography sx={{ pl: 1 }}>{likes.length}</Typography>
        </div>
        <Typography onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
          {comments.length} {comments.length <= 1 ? 'comment' : 'comments'}
        </Typography>
      </div>
      <div className={classes.gestureContainer}>
        <div className={classes.likeIcon}>
          <LikeButton
            post={post}
            likes={likes}
            setLikes={setLikes}
            isLiked={isLiked}
            auth={user}
          />
          <Typography sx={{ pl: 1 }}>{isLiked ? 'Liked' : 'Like'}</Typography>
        </div>
        <div className={classes.likeIcon}>
          <BiCommentDetail size={'1.3rem'} />
          <Typography sx={{ pl: 1 }}>Comment</Typography>
        </div>
        <Link to={`/messages?message=${post?.poster._id}`} className='link'>
          <div className={classes.likeIcon}>
            <FaRegCommentDots size={'1.3rem'} />
            <Typography sx={{ pl: 1 }}>T message</Typography>
          </div>
        </Link>
      </div>

      <div className={classes.content}>
        {comments.length > 3 && (
          <Typography
            className={classes.commentsLink}
            variant='body2'
            component='div'
            onClick={handleClickOpen}
            sx={{ cursor: 'pointer' }}
          >
            View all {comments.length} comments
          </Typography>
        )}

        {comments.length > 0 &&
          comments.map(
            (comment, i) =>
              i < 3 && (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  setComments={setComments}
                />
              )
          )}

        <Hidden xsDown>
          <Divider />
          <Comment
            post={post}
            auth={user}
            setComments={setComments}
            comments={comments}
          />
        </Hidden>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleClickClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Carousel showThumbs={false}>
          {post?.images.map((image) => (
            <div key={image.public_id}>
              <img className={classes.image} src={image?.url} alt='Post' />
            </div>
          ))}
        </Carousel>
        {comments.map((comment) => (
          <Container key={comment._id}>
            <CommentCard comment={comment} setComments={setComments} />
          </Container>
        ))}
        <Divider />
        <Comment
          post={post}
          auth={user}
          setComments={setComments}
          comments={comments}
        />
      </Dialog>
    </article>
  )
}

function LikeButton({ post, likes, setLikes, isLiked, auth }) {
  const classes = useFeedCardStyles()

  const Icon = isLiked ? ThumbUpIcon : ThumbUpOutlinedIcon

  const handleLike = async () => {
    await likePost(post._id, auth.token)
    setLikes((prev) => [...prev, { user: auth._id }])
  }

  const handleUnlike = async () => {
    await unlikePost(post._id, auth.token)
    setLikes((prev) => prev.filter((like) => like.user !== auth._id))
  }

  const className = isLiked ? classes.like : classes.liked
  const onClick = isLiked ? handleUnlike : handleLike
  return <Icon className={className} onClick={onClick} />
}

function Comment({ post, auth, setComments, comments }) {
  const classes = useFeedCardStyles()
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await createComment(post._id, content, auth.token)

      if (res) {
        setLoading(false)
        toast.success('Comment Successful')
        console.log(res)
        setContent('')
        setComments((prev) => [res.doc, ...prev])
      }
    } catch (err) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder='Add a comment'
        multiline
        maxRows={2}
        onChange={(e) => setContent(e.target.value)}
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        color='primary'
        className={classes.commentButton}
        disabled={!content.trim()}
        onClick={handleSubmit}
      >
        {loading ? 'Loading' : 'Post'}
      </Button>
    </div>
  )
}

export default FeedCard
