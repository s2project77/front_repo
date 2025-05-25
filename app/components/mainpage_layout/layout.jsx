import React from 'react';
import Navbar from '../mainpage/navbar';

const Layout = ({ children, userData }) => {
  return (
    <div className='min-h-screen overflow-hidden'>
      <Navbar userData={userData} /> 
      {children}
    </div>
  );
};

export default Layout;
