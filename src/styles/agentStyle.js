import { makeStyles } from '@mui/styles'

export const useAgentHomePageStyles = makeStyles((theme) => ({
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3rem',
    paddingBottom: '5px',
    // borderBottom: '2px solid blue',
  },

  lead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    width: '50%',
  },
}))
export const useFarmersPageStyles = makeStyles((theme) => ({
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3rem',
  },

  lead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadImage: {
    border: '2px dashed #ccc',
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0',
  },

  button: {
    width: '50%',
  },
}))

export const useAddFarmerProductPageStyles = makeStyles((theme) => ({
  addImageButton: {
    margin: '1.3rem 0',
    border: '1px solid #c4c4c4',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    background: '#c4c4c4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },

  buttonIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
export const usePromoCardStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid #000',
    borderRadius: '10px',
    padding: '2rem 1.5rem',
    margin: '2rem 0',
  },

  typography: {
    textAlign: 'center',
  },
}))

export const useHomeFeedCardStyles = makeStyles((theme) => ({
  image: {
    height: '11rem',
    width: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    padding: '0.6rem',
    cursor: 'pointer',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
export const useAgentFarmerCardStyles = makeStyles((theme) => ({
  image: {
    height: '13rem',
    width: '100%',
    objectFit: 'contain',
  },
  container: {
    display: 'flex',
    padding: '0.6rem',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
export const useFeedCardStyles = makeStyles((theme) => ({
  article: {
    border: '1px solid #e6e6e6',
    background: '#ffffff',
    marginBottom: 60,
    [theme.breakpoints.down('md')]: {
      border: 'unset',
      marginBottom: 0,
    },
  },
  heading: {
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headingContainer: {
    display: 'flex',
  },

  headingText: {
    display: 'flex',
    // alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: '10px',
  },

  content: {
    padding: '4px 1rem',
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

  moreButton: {
    color: '#999 !important',
    padding: '0px !important',
    '&:hover': {
      background: 'transparent !important',
    },
  },
  captionWrapper: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-all',
  },
  image: {
    height: '27rem',
    width: '100%',
    objectFit: 'cover',
  },
  likeContainer: {
    padding: '0.5rem 1rem',
    margin: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '3px solid #D3D3D3',
  },
  commentContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 56px)',
    padding: '0px 0px 0px 16px !important',
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
  textField: {
    padding: '10px 0px !important',
  },
  commentButton: {
    width: '48px !important',
    padding: 'unset',
  },

  gestureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '1.5rem',
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

  likeIcon: {
    display: 'flex',
    cursor: 'pointer',
  },
}))
