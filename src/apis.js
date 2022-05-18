// export const getCategories = () => `${base_url}/v1/categories`

import { toast } from 'react-toastify'
import axios from 'axios'

function request(path, { data = null, token = null, method = 'GET' }) {
  return fetch(`${process.env.REACT_APP_API}${path}`, {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  }).then((response) => {
    if (response.ok) {
      // response.json().then((json) => console.log(json))
      return response.json()
    }
    response.json().then((json) => {
      // console.log(json)
      if (json.status === 'fail') {
        toast.error(json.message)
      }
    })
  })
}

// function request(path, { data = null, token = null, method = "GET" }) {
//   return (
//     fetch(`${process.env.REACT_APP_API}${path}`, {
//       method,
//       headers: {
//         Authorization: token ? `Bearer ${token}` : "",
//         "Content-Type": "application/json",
//       },
//       body:
//         method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
//     })
//       .then((response) => {
//         // If Successful
//         if (response.ok) {
//           if (method === "DELETE") {
//             // If delete, nothing returned
//             return true
//           }
//           return response.json()
//         }

//         // If errors
//         return response
//           .json()
//           .then((json) => {
//             // Handle Json Error response from server

//             if (response.status === 400) {
//               const errors = Object.keys(json).map(
//                 (k) => `${json[k].join(" ")}`
//               )
//               throw new Error(errors.join(" "))
//             }
//             throw new Error(JSON.stringify(json))
//           })
//           .catch((e) => {
//             if (e.name === "SyntaxError") {
//               throw new Error(response.statusText)
//             }
//             console.log("ERROR", e)
//             throw new Error(e)
//           })
//       })
//       // .then((json) => {
//       //   toast(JSON.stringify(json), { type: 'success' })
//       // })
//       .catch((e) => {
//         // Handle all errors
//         console.log(e)
//         toast(e.Error, { type: "error" })
//       })
//   )
// }

// export const login = async (email, password) =>
//   await axios.post(`${process.env.REACT_APP_API}/v1/auth/login`, {
//     email,
//     password,
//   })

export const signIn = (email, password) => {
  return request('/v1/auth/login', {
    data: { email, password },
    method: 'POST',
  })
}

export const resetPassword = (email) => {
  return request('/v1/auth/forgotPassword', {
    data: { email },
    method: 'POST',
  })
}
export const register = (firstName, lastName, phone, email, password, role) => {
  return request('/v1/auth/register', {
    data: { firstName, lastName, phone, email, password, role },
    method: 'POST',
  })
}
export const registerVendor = (
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
  description
) => {
  return request('/v1/auth/register', {
    data: {
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
      description,
    },
    method: 'POST',
  })
}

export const activateAccount = (token) => {
  return request(`/v1/auth/activateAccount/${token}`, {
    method: 'GET',
  })
}

export const signOut = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/v1/auth/logout`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updatePassword = (passwordCurrent, password, token) => {
  return request(`/v1/auth/updateMyPassword`, {
    data: { passwordCurrent, password },
    token,
    method: 'PATCH',
  })
}

export const updateInterests = (interests, token) => {
  return request(`/v1/auth/saveMyInterests`, {
    data: { interests },
    token,
    method: 'PATCH',
  })
}

// CATEGORIES

export const createCategory = (name, token) => {
  return request('/v1/categories', {
    data: { name },
    token,
    method: 'POST',
  })
}
export const getAllCategories = () => {
  return request('/v1/categories', {
    method: 'GET',
  })
}

export const deleteCategory = (slug, token) => {
  return request(`/v1/categories/${slug}`, { token, method: 'DELETE' })
}

export const getCategory = (slug) => {
  return request(`/v1/categories/${slug}`, { method: 'GET' })
}
export const updateCategory = (slug, name, token) => {
  return request(`/v1/categories/${slug}`, {
    data: { name },
    token,
    method: 'PATCH',
  })
}
// SUBCATEGORIES

export const createSubCategory = (name, parent, token) => {
  return request('/v1/subCategories', {
    data: { name, parent },
    token,
    method: 'POST',
  })
}
export const getAllSubCategories = () => {
  return request('/v1/subCategories', {
    method: 'GET',
  })
}
export const deleteSubCategory = (slug, token) => {
  return request(`/v1/subCategories/${slug}`, { token, method: 'DELETE' })
}
export const getSubCategory = (slug) => {
  return request(`/v1/subCategories/${slug}`, { method: 'GET' })
}
export const updateSubCategory = (slug, name, parent, token) => {
  return request(`/v1/subCategories/${slug}`, {
    data: { name, parent },
    token,
    method: 'PATCH',
  })
}
export const vendorOnboard = (storeName, address, city, state, token) => {
  return request(`/v1/user/onboard`, {
    data: { storeName, address, city, state },
    token,
    method: 'PATCH',
  })
}

// PRODUCT
export const createVendorProduct = (
  productName,
  description,
  price,
  category,
  subCategory,
  quantity,
  weight,
  images,
  metrics,
  deliveryType,
  paymentType,
  user,
  token
) => {
  return request('/v1/products', {
    data: {
      productName,
      description,
      price,
      category,
      subCategory,
      quantity,
      weight,
      images,
      metrics,
      deliveryType,
      paymentType,
      user,
    },
    token,
    method: 'POST',
  })
}
export const createAgentProduct = (
  productName,
  description,
  price,
  category,
  subCategory,
  quantity,
  weight,
  images,
  metrics,
  deliveryType,
  farmer,
  user,
  token
) => {
  return request('/v1/products', {
    data: {
      productName,
      description,
      price,
      category,
      subCategory,
      quantity,
      weight,
      images,
      metrics,
      deliveryType,
      farmer,
      user,
    },
    token,
    method: 'POST',
  })
}

export const getProduct = (slug) => {
  return request(`/v1/products/${slug}`, {
    method: 'GET',
  })
}

export const getAllProducts = (page = 1) => {
  return request(`/v1/products?page=${page}`, {
    method: 'GET',
  })
}
export const getAllProductsNoPaginate = () => {
  return request(`/v1/products`, {
    method: 'GET',
  })
}

export const getProductsCount = () => {
  return request(`/v1/products/total`, {
    method: 'GET',
  })
}

export const getPopularProducts = () => {
  return request(`/v1/products/popular`, {
    method: 'GET',
  })
}

export const getProductsByFilter = async (arg) =>
  await axios.post(
    `${process.env.REACT_APP_API}/v1/products/search/filters`,
    arg
  )
// export const getProductsByFilter = (query) => {
//   console.log(query)
//   return request('/v1/products/search/filters', {
//     data: { query },
//     method: 'POST',
//   })
// }

// GET VENDOR'S PRODUCT
export const getVendorProducts = (vendorId) => {
  return request(`/v1/products?user=${vendorId}`, {
    method: 'GET',
  })
}

export const getVendorDetails = (userId) => {
  return request(`/v1/vendors/findVendor/${userId}`, {
    method: 'GET',
  })
}
export const updateVendorDetails = (
  storeName,
  country,
  city,
  address,
  state,
  token
) => {
  return request(`/v1/vendors/updateVendor`, {
    data: { storeName, country, city, address, state },
    token,
    method: 'POST',
  })
}

export const getCategorySubs = (_id) => {
  return request(`/v1/categories/subCategories/${_id}`, {
    method: 'GET',
  })
}

export function uploadImage(image) {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', 'tinkoko_')

  return fetch('https:/.cloudinary.com/v1_1/paapii3d/image/upload', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    return response.json()
  })
}

// AGENTS FARMERS
export const createFarmer = (
  fullName,
  phone,
  address,
  state,
  country,
  nextOfKin,
  nextOfKinPhone,
  photo,
  agent,
  token
) => {
  return request('/v1/farmers', {
    data: {
      fullName,
      phone,
      address,
      state,
      country,
      nextOfKin,
      nextOfKinPhone,
      photo,
      agent,
    },
    token,
    method: 'POST',
  })
}
export const getMyFarmers = (agentId, page = 1) => {
  return request(`/v1/farmers?agent=${agentId}&page=${page}`, {
    method: 'GET',
  })
}

export const createFarmerProduct = (
  productName,
  description,
  price,
  category,
  subCategory,
  quantity,
  weight,
  images,
  deliveryType,
  farmer,
  agent,
  token
) => {
  return request('/v1/farmerProducts', {
    data: {
      productName,
      description,
      price,
      category,
      subCategory,
      quantity,
      weight,
      images,
      deliveryType,
      farmer,
      agent,
    },
    token,
    method: 'POST',
  })
}
export const getMyFarmerProduct = (agentId) => {
  return request(`/v1/farmerProducts?agent=${agentId}`, {
    method: 'GET',
  })
}
export const getMyProducts = (vendorId) => {
  return request(`/v1/products?user=${vendorId}`, {
    method: 'GET',
  })
}

// ============================= FEEDS =======================================

export const createPost = (post, images, token) => {
  return request('/v1/posts', {
    data: { post, images },
    token,
    method: 'POST',
  })
}

export const getAllPosts = () => {
  return request('/v1/posts', {
    method: 'GET',
  })
}
export const getPost = (id) => {
  return request(`/v1/posts/${id}`, {
    method: 'GET',
  })
}

export const deletePost = (postId, token) => {
  return request(`/v1/posts/${postId}`, {
    token,
    method: 'DELETE',
  })
}

export const createComment = (post, comment, token) => {
  return request('/v1/comments', {
    data: { post, comment },
    token,
    method: 'POST',
  })
}

export const likePost = (postId, token) => {
  return request(`/v1/posts/like/${postId}`, {
    data: {},
    token,
    method: 'POST',
  })
}

export const unlikePost = (postId, token) => {
  return request(`/v1/posts/unlike/${postId}`, {
    data: {},
    token,
    method: 'PUT',
  })
}

export const getAllLikes = (postId) => {
  return request(`/v1/posts/like/${postId}`, {
    method: 'GET',
  })
}

// ===========================================================================

// ==============================REPORT==================================

export const createReportFeed = (feedId, text) => {
  return request('/v1/reportFeeds', {
    data: { feedId, text },
    method: 'POST',
  })
}

// ===========================================================================

// ==============================GET USER PROFILE=============================

export const getLoggedInUser = (token) => {
  return request(`/v1/users/me`, {
    token,
    method: 'GET',
  })
}

export const getUserProfile = (id) => {
  return request(`/v1/users/${id}`, {
    method: 'GET',
  })
}

export const getUserPost = (id) => {
  return request(`/v1/users/posts/${id}`, {
    method: 'GET',
  })
}

export const updateMyProfile = (
  firstName,
  lastName,
  phone,
  gender,
  location,
  profilePicUrl,
  id,
  token
) => {
  return request(`/v1/users/${id}`, {
    data: { firstName, lastName, phone, gender, location, profilePicUrl },
    token,
    method: 'PATCH',
  })
}
export const updateMyBusinessProfile = (
  storeName,
  description,
  address,
  country,
  city,
  countryState,
  id,
  token
) => {
  return request(`/v1/users/${id}`, {
    data: { storeName, description, address, country, city, countryState },
    token,
    method: 'PATCH',
  })
}

// ===========================================================================

// ===========================GET FOLLOW AND UNFOLLOW=============================

export const getUserFollowers = (userId, token) => {
  return request(`/v1/users/followers/${userId}`, {
    token,
    method: 'GET',
  })
}

export const getUserFollowing = (userId, token) => {
  return request(`/v1/users/following/${userId}`, {
    token,
    method: 'GET',
  })
}

// ===========================================================================

// ===========================FOLLOW AND UNFOLLOW=============================

export const followUser = (userToFollowId, token, datas) => {
  return request(`/v1/users/follow/${userToFollowId}`, {
    data: { datas },
    token,
    method: 'POST',
  })
}

export const unfollowUser = (userToUnfollowId, token, datas) => {
  return request(`/v1/users/unfollow/${userToUnfollowId}`, {
    data: { datas },
    token,
    method: 'PUT',
  })
}
// ===========================================================================

// ===========================NOTIFICATIONS=============================

export const getNotifications = (token) => {
  return request(`/v1/notifications`, {
    token,
    method: 'GET',
  })
}

export const readNotification = (token) => {
  return request(`/v1/users/notifications`, {
    data: {},
    token,
    method: 'POST',
  })
}
// ==========================================================================

// ===========================CHATS=============================

export const getChats = (token) => {
  return request(`/v1/chats`, {
    token,
    method: 'GET',
  })
}

export const ChatGetUserInfo = (userToFindId, token) => {
  return request(`/v1/chats/user/${userToFindId}`, {
    token,
    method: 'GET',
  })
}
// ===========================================================================
// ===========================REVIEWS=============================
export const createReview = (review, rating, product, user, token) => {
  return request('/v1/reviews', {
    data: { review, rating, product, user },
    token,
    method: 'POST',
  })
}

// ===========================================================================
// ===========================CART=============================
export const userCart = (cart, token) => {
  return request('/v1/cart/add', {
    data: {
      cart,
    },
    token,
    method: 'POST',
  })
}

export const getUserCart = (token) => {
  return request(`/v1/cart/getCart`, {
    token,
    method: 'GET',
  })
}
export const emptyUserCart = (token) => {
  return request(`/v1/cart/empty`, {
    token,
    method: 'DELETE',
  })
}
export const saveUserAddress = (address, city, state, token) => {
  return request(`/v1/users/address`, {
    data: { address, city, state },
    token,
    method: 'POST',
  })
}

// ===========================================================================

// ===========================JOBS=============================

export const createJob = (
  title,
  workLocation,
  jobType,
  description,
  minSalary,
  maxSalary,
  screeningQuestions,
  user,
  token
) => {
  return request('/v1/jobs', {
    data: {
      title,
      workLocation,
      jobType,
      description,
      minSalary,
      maxSalary,
      screeningQuestions,
      user,
    },
    token,
    method: 'POST',
  })
}

export const getAllJobs = () => {
  return request(`/v1/jobs`, {
    method: 'GET',
  })
}
export const getPopularJobs = () => {
  return request(`/v1/jobs/popular-jobs`, {
    method: 'GET',
  })
}
export const getMyJobs = (id) => {
  return request(`/v1/jobs?user=${id}`, {
    method: 'GET',
  })
}
export const getJob = (id) => {
  return request(`/v1/jobs/${id}`, {
    method: 'GET',
  })
}

export const createJobAnswers = (
  job,
  name,
  phone,
  email,
  city,
  answers,
  user,
  token
) => {
  return request('/v1/jobAnswers', {
    data: {
      job,
      name,
      phone,
      email,
      city,
      answers,
      user,
    },
    token,
    method: 'POST',
  })
}
// ===========================================================================

// ===============================QUOTES=================================

export const submitAQuote = (
  quote,
  name,
  phone,
  email,
  city,
  address,
  description
) => {
  return request('/v1/quotes', {
    data: {
      quote,
      name,
      phone,
      email,
      city,
      address,
      description,
    },

    method: 'POST',
  })
}
// ===========================================================================

// ===============================EMAIL=================================

export const sendEmail = (
  senderName,
  senderEmail,
  receiverEmails,
  subject,
  body,
  token
) => {
  return request('/v1/emails', {
    data: { senderName, senderEmail, receiverEmails, subject, body },
    token,
    method: 'POST',
  })
}

// ===========================================================================
// ===============================BLOGS=================================

export const createBlog = (title, body, images, source, token) => {
  return request('/v1/blogs', {
    data: { title, body, images, source },
    token,
    method: 'POST',
  })
}

export const getAllBlogs = () => {
  return request(`/v1/blogs`, {
    method: 'GET',
  })
}
export const getBlog = (id) => {
  return request(`/v1/blogs/${id}`, {
    method: 'GET',
  })
}
export const updateBlog = (id, title, body, images, source, token) => {
  return request(`/v1/blogs/${id}`, {
    data: { title, body, images, source },
    token,
    method: 'PUT',
  })
}
export const deleteBlog = (id, token) => {
  return request(`/v1/blogs/${id}`, {
    token,
    method: 'DELETE',
  })
}

// ===========================================================================
// ===============================ADMIN USERS=================================

export const getAllUsers = (token) => {
  return request(`/v1/users`, {
    token,
    method: 'GET',
  })
}

// ===========================================================================
