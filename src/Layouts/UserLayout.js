import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/shared/Seo'

const UserLayout = ({ children, title }) => {
  return (
    <div style={{ marginTop: 70 }}>
      <SEO title={title} />
      <Header />
      <div style={{ minHeight: '70vh' }}>{children}</div>
      <Footer />
    </div>
  )
}

export default UserLayout
