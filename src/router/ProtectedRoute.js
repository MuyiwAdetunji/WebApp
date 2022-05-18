import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute

// auth.token && auth.user.role=== 'admin'
