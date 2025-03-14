import React, { Children } from 'react'
import Navbar from '../mainpage/navbar'
import { Right_part } from '../mainpage/right_part'
import { Side_bar } from '../mainpage/side_bar'
const Layout=({ children })=> {
  return (
    <div className='min-h-screen sm:h-screen  overflow-hidden '>
        <Navbar/>
       
        {children}</div>
  )
}
export default Layout;