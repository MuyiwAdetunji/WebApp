import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// import AuthContext from '../contexts/AuthContext'

const AgentRoute = ({ children, ...rest }) => {
  // const auth = useContext(AuthContext)

  const { user } = useSelector((state) => ({ ...state }))
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.token && user.role === 'agent' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default AgentRoute

// auth.token && auth.user.role=== 'admin'
