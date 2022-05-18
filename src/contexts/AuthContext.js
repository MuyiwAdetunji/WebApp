import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify'

import {
  signIn as signInApi,
  signOut as signOutApi,
  register as registerApi,
  registerVendor as registerVendorApi,
  getVendorDetails as getVendorDetailsApi,
  updateVendorDetails as updateVendorDetailsApi,
} from '../apis'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('tink_token'))
  const [role, setRole] = useState(localStorage.getItem('tink_role'))
  const [vendor, setVendor] = useState(
    JSON.parse(localStorage.getItem('tink_vendor'))
  )
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('tink_user'))
  )
  const [loading, setLoading] = useState(false)

  const signIn = async (email, password, callback) => {
    setLoading(true)
    const res = await signInApi(email, password)

    if (res.token) {
      localStorage.setItem('tink_token', res.token)
      localStorage.setItem('tink_role', res.user.role)
      localStorage.setItem('tink_user', JSON.stringify(res.user))

      setToken(res.token)
      setUser(res.user)
      setRole(res.user.role)
      callback()
    }
    setLoading(false)
  }

  const register = async (
    firstName,
    lastName,
    phone,
    email,
    password,
    role,
    callback
  ) => {
    setLoading(true)
    const res = await registerApi(
      firstName,
      lastName,
      phone,
      email,
      password,
      role
    )

    if (res.status === 'success') {
      toast.success(res.message)
      callback()
    }
    setLoading(false)
  }

  const registerVendor = async (
    firstName,
    lastName,
    phone,
    email,
    password,
    role,
    isVendor,
    storeName,
    country,
    city,
    address,
    countryState,
    callback
  ) => {
    setLoading(true)
    const res = await registerVendorApi(
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      isVendor,
      storeName,
      country,
      city,
      address,
      countryState
    )

    if (res.status === 'success') {
      toast.success(res.message)
      callback()
    }
    setLoading(false)
  }

  const signOut = async () => {
    try {
      const res = await signOutApi()
      localStorage.removeItem('tink_token')
      localStorage.removeItem('tink_user')
      localStorage.removeItem('tink_role')
      localStorage.removeItem('tink_vendor')
      setToken('')
      setRole('')
      setUser({})
      setVendor({})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // VENDOR
  // const getVendorDetails = async (id, callback) => {
  //   setLoading(true)
  //   const res = await getVendorDetailsApi(id)

  //   if (res._id) {
  //     localStorage.setItem('tink_vendor', JSON.stringify(res))
  //     setVendor(res)
  //     callback()
  //   }
  //   setLoading(false)
  // }

  // const updateVendorDetails = async (
  //   storeName,
  //   country,
  //   city,
  //   address,
  //   state,
  //   token,
  //   callback
  // ) => {
  //   setLoading(true)
  //   const res = await updateVendorDetailsApi(
  //     storeName,
  //     country,
  //     city,
  //     address,
  //     state,
  //     token,
  //     callback
  //   )

  //   if (res.storeName) {
  //     localStorage.setItem('tink_vendor', JSON.stringify(res))
  //     setVendor(res)
  //     callback()
  //   }
  //   setLoading(false)
  // }

  const value = {
    token,
    user,
    loading,
    signIn,
    signOut,
    register,
    registerVendor,
    role,
    vendor,
    // getVendorDetails,
    // updateVendorDetails,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
