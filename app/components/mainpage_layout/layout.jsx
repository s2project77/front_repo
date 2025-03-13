import React, { Children } from 'react'
import Navbar from '../mainpage/navbar'
const Layout=({ children })=> {
  return (
    <div className='h-screen overflow-hidden '>
        <Navbar/>
        {children}</div>
  )
}
export default Layout;