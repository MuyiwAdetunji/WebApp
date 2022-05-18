import { createTheme } from '@mui/material'
// import {  } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7AB259',
      light: '#E9F2E4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#979797',
      light: '#F4F5F8',
      dark: '#e5e5e5',
    },
    standard: {
      main: '#fff',
      contrastText: '#979797',
    },
    nav: {
      main: '#fff',
      contrastText: '#000',
    },
    vendor: {
      main: '#EE960A',
    },
    agent: {
      main: '#002855',
    },

    dark: {
      main: '#ccc',
      contrastText: '#fffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          marginTop: '1.3rem',
          textTransform: 'capitalize',
        },
      },
      variants: [
        {
          props: { variant: 'black' },
          style: {
            textTransform: 'capitalize',
            border: '1px solid #000',
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              border: '1px solid #000',
              backgroundColor: '#fff',
              color: '#000',
            },
          },
        },
        {
          props: { variant: 'primary2' },
          style: {
            textTransform: 'capitalize',
            border: '1px solid #7AB259',
            backgroundColor: '#7AB259',
            color: '#fff',
            '&:hover': {
              border: '1px solid #7AB259',
              backgroundColor: '#7AB259',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'plain2' },
          style: {
            border: '1px solid #000',
            backgroundColor: '#fff',
            color: '#000',
            '&:hover': {
              border: '1px solid #000',
              backgroundColor: '#fff',
              color: '#000',
            },
          },
        },
        {
          props: { variant: 'plain' },
          style: {
            border: '1px solid #000',
            backgroundColor: '#fff',
            color: '#000',
            '&:hover': {
              border: '0.5px solid #000',
              backgroundColor: '#fff',
              color: '#000',
            },
          },
        },
        {
          props: { variant: 'agent' },
          style: {
            border: '1px solid #002855',
            backgroundColor: '#002855',
            color: '#fff',
            '&:hover': {
              border: '0.5px solid #002855',
              backgroundColor: '#fff',
              color: '#002855',
            },
          },
        },
        {
          props: { variant: 'agent-plain' },
          style: {
            border: '0.5px solid #002855',
            backgroundColor: '#fff',
            color: '#002855',

            '&:hover': {
              border: '1px solid #002855',
              backgroundColor: '#002855',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'vendor' },
          style: {
            border: '1px solid #EE960A',
            backgroundColor: '#EE960A',
            color: '#fff',
            '&:hover': {
              border: '0.5px solid #EE960A',
              backgroundColor: '#fff',
              color: '#EE960A',
            },
          },
        },
        {
          props: { variant: 'vendor-plain' },
          style: {
            border: '0.5px solid #EE960A',
            backgroundColor: '#fff',
            color: '#EE960A',

            '&:hover': {
              border: '1px solid #EE960A',
              backgroundColor: '#EE960A',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'primary-plain' },
          style: {
            border: '0.5px solid #7AB259',
            backgroundColor: '#fff',
            color: '#7AB259',

            '&:hover': {
              border: '1px solid #7AB259',
              backgroundColor: '#7AB259',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'primary' },
          style: {
            border: '0.5px solid #fff',
            backgroundColor: '#7AB259',
            color: '#fff',

            '&:hover': {
              border: '0.5px solid #7AB259',
              backgroundColor: '#fff',
              color: '#7AB259',
            },
          },
        },
        {
          props: { variant: 'primary-register' },
          style: {
            border: '0.5px solid #fff',
            backgroundColor: '#7AB259',
            color: '#fff',

            '&:hover': {
              border: '0.5px solid #fff',
              backgroundColor: '#7AB259',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'vendor-register' },
          style: {
            border: '0.5px solid #fff',
            backgroundColor: '#EE960A',
            color: '#fff',

            '&:hover': {
              border: '0.5px solid #fff',
              backgroundColor: '#EE960A',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'agent-register' },
          style: {
            border: '0.5px solid #fff',
            backgroundColor: '#002855',
            color: '#fff',
            '&:hover': {
              border: '0.5px solid #fff',
              backgroundColor: '#002855',
              color: '#fff',
            },
          },
        },
      ],
    },
  },
})

export default theme
