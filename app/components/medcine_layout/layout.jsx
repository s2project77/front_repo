'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../medicine/navabr';

const Layout = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         console.warn('No token found in localStorage');
  //         return;
  //       }

  //       const response = await fetch('http://localhost:3001/api/doctors/myinfo', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       if (!response.ok) throw new Error('Failed to fetch');
  //       const data = await response.json();
  //       setUserData(data.data.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       console.log(error.message);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <div className='min-h-screen overflow-hidden'>
       <Navbar userData={userData} />
      {children}
    </div>
  );
};

export default Layout;
