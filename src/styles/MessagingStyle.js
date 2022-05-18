import { makeStyles } from '@mui/styles'

export const useMessageInputStyle = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '95%',
    margin: `${theme.spacing(0)} auto`,
  },
  wrapText: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}))
