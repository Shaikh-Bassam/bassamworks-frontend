import React from 'react'
import Navbar from './Navbar'
import Menu from './menu'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (

    <>
      <Navbar />
      <Menu />
      {children}
      <Footer/>
    </>
  )
}

export default Layout