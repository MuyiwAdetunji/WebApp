import { makeStyles } from '@mui/styles'

export const useAdminTopNavStyles = makeStyles((theme) => ({
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

export const useAdminNavStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    width: '100%',
    background: '#7AB259',
    padding: '1.2rem',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  logo: {
    width: 120,
    height: 120,
  },

  navItems: {
    marginTop: 40,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '1rem 2rem',
  },
  icon: {
    color: '#fff',
  },

  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bolder',
  },
}))

// ==========================

export const useAdminEmailStyles = makeStyles((theme) => ({
  container: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

export const useAdminNewEmailStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem 0',
    width: 450,
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
