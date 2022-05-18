import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const VendorProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.token && user.role === 'vendor' ? (
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

export default VendorProtectedRoute

// auth.token && auth.user.role=== 'admin'
