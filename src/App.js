import React, { lazy, Suspense } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'

import VendorProtectedRoute from './router/VendorProtectedRoute'
import AdminProtectedRoute from './router/AdminProtectedRoute'
import ProtectedRoute from './router/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoadingLargeIcon } from './icons'
import SideCartDrawer from './components/drawer/SideCartDrawer'
import SideMenuDrawer from './components/drawer/SideMenuDrawer'

const Quote = lazy(() => import('./pages/quotePage'))
const AgentProvider = lazy(() => import('./pages/legal/agentProviderPage'))
const VendorProvider = lazy(() => import('./pages/legal/vendorProviderPage'))
const AgentApply = lazy(() => import('./pages/legal/agentApplyForm'))

const MembershipAgreement = lazy(() =>
  import('./pages/legal/membershipAgreement')
)
const PrivacyPolicy = lazy(() => import('./pages/legal/privacyPolicyPage'))
const HowToShop = lazy(() => import('./pages/legal/howToShopPage'))
const TermsAndConditions = lazy(() =>
  import('./pages/legal/termsAndConditionsPage')
)
const AboutUs = lazy(() => import('./pages/legal/aboutUsPage'))
const HowToSell = lazy(() => import('./pages/legal/howToSellPage'))
const DeliveryShipping = lazy(() =>
  import('./pages/legal/deliveryShippingPage')
)

const MyJobs = lazy(() => import('./pages/vendor/jobs/MyJobs'))
const AllProducts = lazy(() => import('./pages/allProductsPage'))
const Cart = lazy(() => import('./pages/cartPage'))
const Checkout = lazy(() => import('./pages/checkoutPage'))

const ProductPage = lazy(() => import('./pages/productPage'))
const AllCategories = lazy(() => import('./pages/allCategoriesPage'))
const MessagePage = lazy(() => import('./pages/messagePage'))
const SingleFeed = lazy(() => import('./pages/user/SingleFeed'))
const Login = lazy(() => import('./pages/auth/loginPage'))
const ForgotPassword = lazy(() => import('./pages/auth/forgotPasswordPage'))
const VendorRegister = lazy(() => import('./pages/auth/vendorRegisterPage'))
const Interests = lazy(() => import('./pages/auth/interestsPage'))
const Home = lazy(() => import('./pages/Home'))
const FeedPage = lazy(() => import('./pages/feedPage'))
const Settings = lazy(() => import('./pages/vendor/Settings'))
const SettingsUserInfo = lazy(() =>
  import('./components/settings/SettingsUserInfo')
)
const SettingsBusinessInfo = lazy(() =>
  import('./components/settings/SettingsBusinessInfo')
)
const SettingsPasswordChange = lazy(() =>
  import('./components/settings/SettingsPasswordChange')
)

const UserNewsFeed = lazy(() => import('./pages/user/UserNewsFeed'))
const Dashboard = lazy(() => import('./pages/user/Dashboard'))
const SignUp = lazy(() => import('./pages/auth/signupPage'))
const AgentHome = lazy(() => import('./pages/agent'))
const AddFarmerProduct = lazy(() => import('./pages/agent/addFarmerProduct'))
const Farmers = lazy(() => import('./pages/agent/farmersPage'))
const NewsFeed = lazy(() => import('./pages/agent/newsFeedPage'))
const VendorAgentDashboard = lazy(() =>
  import('./pages/vendorAgentDashboardPage')
)

const AddProduct = lazy(() => import('./pages/products/addProductPage'))
const AllVendorProducts = lazy(() =>
  import('./pages/vendor/products/allProducts')
)
const AgentProductsPage = lazy(() => import('./pages/agent/productsPage'))

const JobCreate = lazy(() => import('./pages/jobs/createJob'))
const AllJobs = lazy(() => import('./pages/jobs'))
const JobPage = lazy(() => import('./pages/jobs/jobPage'))
const AdminDashboard = lazy(() => import('./pages/admin'))
const AdminProducts = lazy(() => import('./pages/admin/adminProductsPage'))
const AdminEmail = lazy(() => import('./pages/admin/adminEmailPage'))
const AdminUsers = lazy(() => import('./pages/admin/adminUsersPage'))
const AdminBlog = lazy(() => import('./pages/admin/adminBlogPage'))
const AdminOrders = lazy(() => import('./pages/admin/adminOrdersPage'))
const AdminReports = lazy(() => import('./pages/admin/adminReportsPage'))
const AdminCategories = lazy(() => import('./pages/admin/adminCategoriesPage'))
const NewEmail = lazy(() => import('./pages/admin/email/adminNewEmailPage'))
const NewBlog = lazy(() => import('./pages/admin/blog/newBlogPage'))
const Blog = lazy(() => import('./pages/blogPage'))
const NewUser = lazy(() => import('./pages/admin/user/adminNewUserPage'))

const App = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <LoadingLargeIcon />
        </div>
      }
    >
      <ToastContainer />
      <Router>
        <SideCartDrawer />
        <SideMenuDrawer />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <ProtectedRoute path='/feed' exact>
            <FeedPage />
          </ProtectedRoute>
          <ProtectedRoute path='/checkout' exact>
            <Checkout />
          </ProtectedRoute>
          <Route path='/products' exact>
            <AllProducts />
          </Route>
          <Route path='/all-categories' exact>
            <AllCategories />
          </Route>
          <Route path='/submit-quote' exact>
            <Quote />
          </Route>
          <Route path='/post/:id' exact>
            <SingleFeed />
          </Route>
          <Route path='/user/:userId/posts' exact>
            <UserNewsFeed />
          </Route>
          <Route path='/user/:id' exact>
            <Dashboard />
          </Route>
          <Route path='/blog/:id' exact>
            <Blog />
          </Route>

          <ProtectedRoute path='/messages' exact>
            <MessagePage />
          </ProtectedRoute>
          <Route path='/product/:slug' exact>
            <ProductPage />
          </Route>

          {/* Legal */}
          <Route path='/legal/membership-agreement' exact>
            <MembershipAgreement />
          </Route>
          <Route path='/legal/privacy-policy' exact>
            <PrivacyPolicy />
          </Route>
          <Route path='/services/become-an-agent' exact>
            <AgentProvider />
          </Route>
          <Route path='/services/become-a-vendor' exact>
            <VendorProvider />
          </Route>
          <Route path='/services/become-an-agent-apply' exact>
            <AgentApply />
          </Route>
          <Route path='/services/delivery-and-shipping' exact>
            <DeliveryShipping />
          </Route>
          <Route path='/services/how-to-shop' exact>
            <HowToShop />
          </Route>
          <Route path='/services/how-to-sell' exact>
            <HowToSell />
          </Route>
          <Route path='/services/about-us' exact>
            <AboutUs />
          </Route>
          <Route path='/services/terms-and-conditions' exact>
            <TermsAndConditions />
          </Route>

          {/* AUTH */}

          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/forgot-password' exact>
            <ForgotPassword />
          </Route>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
          <Route path='/signup/vendor' exact>
            <VendorRegister />
          </Route>
          <ProtectedRoute path='/interests' exact>
            <Interests />
          </ProtectedRoute>

          {/* AGENT */}

          <Route path='/agent' exact>
            <AgentHome />
          </Route>
          <Route path='/agent/farmers' exact>
            <Farmers />
          </Route>
          <Route path='/agent/products' exact>
            <AgentProductsPage />
          </Route>
          <VendorProtectedRoute path='/add-product' exact>
            <AddProduct />
          </VendorProtectedRoute>
          <Route path='/agent/news-feed' exact>
            <NewsFeed />
          </Route>

          {/* ADMIN */}

          <AdminProtectedRoute path='/admin' exact>
            <AdminDashboard />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/products' exact>
            <AdminProducts />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/categories' exact>
            <AdminCategories />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/email' exact>
            <AdminEmail />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/orders' exact>
            <AdminOrders />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/reports' exact>
            <AdminReports />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/email/new' exact>
            <NewEmail />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/users' exact>
            <AdminUsers />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/blog' exact>
            <AdminBlog />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/blog/new' exact>
            <NewBlog />
          </AdminProtectedRoute>
          <AdminProtectedRoute path='/admin/user/new' exact>
            <NewUser />
          </AdminProtectedRoute>

          {/* VENDOR */}

          <VendorProtectedRoute path='/dashboard' exact>
            <VendorAgentDashboard />
          </VendorProtectedRoute>

          <VendorProtectedRoute path='/add-product' exact>
            <AddProduct />
          </VendorProtectedRoute>
          <VendorProtectedRoute path='/vendor/products' exact>
            <AllVendorProducts />
          </VendorProtectedRoute>
          <VendorProtectedRoute path='/jobs/create' exact>
            <JobCreate />
          </VendorProtectedRoute>
          <Route path='/jobs' exact>
            <AllJobs />
          </Route>
          <Route path='/jobs/:id' exact>
            <JobPage />
          </Route>
          <VendorProtectedRoute path='/my-jobs' exact>
            <MyJobs />
          </VendorProtectedRoute>
          {/* <ProtectedRoute path='/settings' exact>
            <Settings />
          </ProtectedRoute> */}
          <ProtectedRoute path='/settings/personal-information' exact>
            <SettingsUserInfo />
          </ProtectedRoute>
          <ProtectedRoute path='/settings/business-information' exact>
            <SettingsBusinessInfo />
          </ProtectedRoute>
          <ProtectedRoute path='/settings/change-password' exact>
            <SettingsPasswordChange />
          </ProtectedRoute>
          <Route path='/cart' exact>
            <Cart />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App

// heroku git:remote -a tinkoko-react
