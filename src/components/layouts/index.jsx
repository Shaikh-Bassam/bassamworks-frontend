import React from 'react'
import Navbar from './Navbar'
import Menu from './menu'
import Footer from './Footer'
import ScrollProgress from '../common/ui/ScrollProgress'
import ScrollToTopButton from '../common/ui/ScrollToTopButton'

const Layout = ({ children }) => {
  return (

    <div className="relative min-h-dvh">
      <ScrollProgress />
      <Navbar />
      <Menu />
      {children}
      <ScrollToTopButton />
      <Footer/>
    </div>
  )
}

export default Layout