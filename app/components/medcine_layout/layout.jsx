import React from 'react';
import Navbar from '../medicine/navabr';

const Layout = ({ children, userData }) => {
  return (
    <div className='min-h-screen overflow-hidden'>
      {userData ? <Navbar userData={userData} /> : null}
      {children}
    </div>
  );
};

export default Layout;
