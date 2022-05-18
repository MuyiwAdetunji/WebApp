import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.token && user.role === 'admin' ? (
          children
        ) : (
          <>
            {toast.error('Unauthorized')}
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          </>
        )
      }
    />
  )
}

export default AdminProtectedRoute

// auth.token && auth.user.role=== 'admin'
