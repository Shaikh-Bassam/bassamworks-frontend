import React from 'react'
import Navbar from './Navbar'
import Menu from './menu'
import useMenu from '../../hooks/useMenu';

const Layout = ({ children }) => {
  const menu = useMenu();
  return (

    <>
      <Navbar {...menu}/>
      <Menu {...menu}/>
      {children}

    </>
  )
}

export default Layout