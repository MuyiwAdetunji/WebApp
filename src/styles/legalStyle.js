import { makeStyles } from '@mui/styles'

export const useLegalTopNavStyles = makeStyles((theme) => ({
  container: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarNotify: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 100,
  },
}))
