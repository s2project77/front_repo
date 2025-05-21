"use client";
import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/medcine_layout/layout';
import { Middle_part } from '@/app/components/medicine/mainpage/middilpart';
import { Right_part } from '@/app/components/medicine/mainpage/rightpart';
import { Side_bar } from '@/app/components/medicine/mainpage/sidebar';
import { useRouter } from 'next/navigation';

const Page1 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://192.168.103.88:3001/api/doctors/myinfo',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.data.data);

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        // Redirect to login if unauthorized
        if (err.message.includes('401')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };


    fetchUserData();
    
  }, [router]);
  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userData={userData}>
      <div id='mainpage' className='grid bg-white min-h-screen md:grid-cols-[1.3fr_3fr_1.3fr] grid-cols-1'>
        <Side_bar color={'blue'} />
        <Middle_part themeColor={'slate'} userData={userData} />
        <Right_part />
      </div>
    </Layout>
  );
};

export default Page1;