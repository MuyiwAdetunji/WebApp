import { makeStyles } from '@mui/styles'

export const useFeedPostStyles = makeStyles((theme) => ({
  article: {
    background: '#ccc',
    borderRadius: '10px',
    marginBottom: 60,
    [theme.breakpoints.down('xs')]: {
      // border: 'unset',
      marginBottom: 0,
    },
  },

  postHeader: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 20px)',
    gridGap: 10,
    alignItems: 'center',
    padding: 16,
  },
  moreIcon: {
    height: 24,
    width: 18,
    justifySelf: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    width: '100%',
  },
  postButtons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '24px 24px 24px minmax(24px, auto)',
    gridGap: 16,
    padding: '6px 0px !important',
  },
  postButtonsWrapper: {
    padding: '0px 16px 8px !important',
  },
  commentUsername: {
    fontWeight: '600 !important',
  },
  datePosted: {
    fontSize: '10px !important',
  },
  likes: {
    fontWeight: '600 !important',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  like: {
    animation: '$like-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  liked: {
    animation: '$liked-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  '@keyframes like-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes liked-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  textField: {
    padding: '10px 0px !important',
  },
  root: {
    fontSize: '14px !important',
  },
  underline: {
    '&::before': {
      border: 'none !important',
    },
    '&::after': {
      border: 'none !important',
    },
    '&:hover&:before': {
      border: 'none !important',
    },
  },
  commentContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 56px)',
    padding: '0px 0px 0px 16px !important',
  },
  commentButton: {
    width: '48px !important',
    padding: 'unset',
  },
  moreButton: {
    color: '#999 !important',
    padding: '0px !important',
    '&:hover': {
      background: 'transparent !important',
    },
  },
  saveIcon: {
    justifySelf: 'right',
  },
  commentsLink: {
    color: '#999',
    margin: '5px 0 !important',
  },
  collapsed: {
    display: 'flex',
    alignItems: 'center',
  },
  expanded: {
    display: 'block',
  },
  caption: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif`,
    fontSize: '14px !important',
  },
  captionWrapper: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-all',
  },
  username: {
    fontWeight: '600 !important',
    marginRight: '5px !important',
  },
}))

/* UserCard component: /components/shared/UserCard.js */
export const useUserCardStyles = makeStyles({
  avatar: {
    width: ({ avatarSize = 44 }) => avatarSize,
    height: ({ avatarSize = 44 }) => avatarSize,
  },
  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'min-content auto',
    gridGap: 12,
    alignItems: 'center',
    width: '100%',
  },
  nameWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})

// LOGIN STYLES
export const useLoginPageStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: `#E5E5E5`,
    width: '100%',
    // paddingBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff',
    },
  },
  imageGrid: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: '10rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1rem',
    },
  },
  image: {
    height: '100%',
  },

  grid: {
    height: '100%',
    // display: 'flex',
    paddingTop: '10rem',
    padding: '5rem 0',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '7rem',
    },
  },
  paper: {
    margin: '0 auto',
    padding: '1.2rem 2rem',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxWidth: '346px',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '100px',
    marginBottom: '2rem',
  },
  button: {
    padding: '2rem 0',
    width: '100%',
  },
  socialButton: {
    width: '100%',
  },
}))

// SIGNUP PAGE STYLES
export const useSignUpPageStyles1 = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: `#E5E5E5`,
    width: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff',
    },
  },

  grid: {
    // height: '100vh',
    // display: 'flex',
    // paddingTop: '2rem',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0',
    },
  },
  paper: {
    margin: '0 auto',
    padding: '1.2rem 2rem',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxWidth: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '100px',
    marginBottom: '2rem',
  },
  button: {
    padding: 'rem 0',
    width: '100%',
  },
  socialButton: {
    width: '100%',
  },
}))
export const useSignUpPageStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: `#E5E5E5`,
    width: '100%',
    // height: '100%',
    paddingBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff',
    },
  },

  imageGrid: {
    // height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'static',
    // paddingTop: '10rem',
  },
  image: {
    height: '100%',
    objectFit: 'cover',
  },

  grid: {
    // height: '100vh',
    // display: 'flex',
    paddingTop: '5rem',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0',
    },
  },
  paper: {
    margin: '0 auto',
    padding: '1.2rem 2rem',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxWidth: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '100px',
    marginBottom: '2rem',
  },
  button: {
    padding: 'rem 0',
    width: '100%',
  },
  socialButton: {
    width: '100%',
  },
}))

// SEARCHNAV SHARED COMPONENT

export const useSearchNavStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    paddingTop: '2rem',
    // justifyContent: 'center',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0.2rem 1rem 2rem',
    cursor: 'pointer',
    // color: '#7AB259',
    '&:hover': {
      background: '#e9f2e4',
    },
  },

  typography: {
    paddingLeft: '0.5rem',
  },

  test: {
    background: '#fff',
    position: 'fixed',
    top: 70,
    left: 270,
    zIndex: 10,
    right: 0,
    bottom: 350,
    padding: 15,
  },
}))

export const usePostButtonStyles = makeStyles((theme) => ({
  newPost: {
    border: '1px solid #000',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: '#AFAFAF',
  },
}))

export const usePostFeedStyles = makeStyles((theme) => ({
  sectionTitle: {
    borderBottom: '2px solid #d3d3d3',
    paddingBottom: 4,
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: '2px solid #d3d3d3',
  },
}))
export const useJobsStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderBottom: '1px solid #ADADAD',
    paddingBottom: 10,
    marginBottom: 10,
  },

  details: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
}))

export const useDashboardStyles = makeStyles((theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem',
    height: '100%',
    // justifyContent: 'center',
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
  },
  status: {
    paddingTop: '0.8rem',
    color: '#AEAEAE',
    alignSelf: 'center',
  },

  title: {
    paddingTop: '0.8rem',
  },

  idNumber: {
    paddingTop: '0.8rem',
    color: '#AEAEAE',
  },

  followContainer: {
    paddingTop: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  productText: {
    paddingTop: '0.8rem',
  },
  ratingText: {
    paddingTop: '0.8rem',
  },

  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paper: {
    height: '100%',
    padding: '1rem',
  },
}))

export const useSettingsNavStyles = makeStyles((theme) => ({
  paper: {
    padding: '2rem 1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  button: {
    justifySelf: 'center',
  },
}))

export const useSettingsStyles = makeStyles((theme) => ({
  paper: {
    padding: '2rem 1rem',
    height: '100%',
  },

  form: {
    width: 400,
    margin: '1rem auto',
  },
}))

// PRODUCT CARD STYLE
export const useReviewsCardStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  avatar: {
    marginRight: 10,
  },

  text: {
    color: '#c4c4c4',
  },
}))

// PRODUCT DETAIL PAGE STYLE

export const useProductDetailPageStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: 10,
  },

  ratings: {
    display: 'flex',
    alignItems: 'center',
  },

  addReviewContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
  },
}))

export const useProductVendorDetailStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },

  storeUser: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 15,
  },

  avatar: {
    marginRight: 10,
  },
}))

export const useSearchStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },

  storeUser: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 15,
  },

  avatar: {
    marginRight: 10,
  },

  list: {
    height: '25rem',
    overflowY: 'scroll',
  },
}))

export const useAllProductsStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f4f4f4',
  },

  contentWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
  },
}))
export const useInterestStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainText: {
    textAlign: 'center',
    padding: '2rem',
  },
  button: {
    padding: '1rem 0',
    width: '100%',
  },

  submitButton: {
    display: 'flex',
    border: '1px solid #7AB259',
    width: '20rem',
    marginTop: '5rem',
    padding: '1rem 2rem',
    alignSelf: 'center',
    borderRadius: '10px',
    justifyContent: 'center',
    color: '#fff',
    cursor: 'pointer',
    background: '#7AB259',
    '&:hover': {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.02)',
    },
  },
}))

// ALL CATEGORIES

export const useAllCategoriesStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
    color: '#7AB259',
    fontSize: 25,
  },

  categoryHeader: {
    color: '#7AB259',
    background: '#E9F2E4',
    padding: '0.5rem 0.7rem',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  item: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}))
