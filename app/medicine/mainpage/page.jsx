"use client";
import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/medcine_layout/layout';
import { Middle_part } from '@/app/components/medicine/mainpage/middilpart';
import Sidebar from "../../components/medicine/mainpage/sidebar";
import { Right_part } from '@/app/components/medicine/mainpage/rightpart';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const Page1 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchUserData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/doctors/myinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data.data.data);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const handleRetry = () => {
    fetchUserData(true);
  };

  const LoadingScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-blue-500/10 p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 animate-bounce">
                <Loader2 className="animate-spin" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Your Dashboard</h2>
              <p className="text-gray-600">Fetching your doctor information...</p>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  const ErrorScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-red-500/10 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Connection Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-gray-50 rounded-xl">
              {isOnline ? (
                <>
                  <Wifi className="text-green-500" size={20} />
                  <span className="text-green-600 font-medium">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="text-red-500" size={20} />
                  <span className="text-red-600 font-medium">Offline</span>
                </>
              )}
            </div>
            <button
              onClick={handleRetry}
              disabled={!isOnline}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <RefreshCw size={18} />
              <span>{retryCount > 0 ? `Retry (${retryCount})` : 'Try Again'}</span>
            </button>
            {retryCount > 2 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-sm">
                  Multiple connection attempts failed. Please check your internet connection or contact support.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Layout >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {!isOnline && (
          <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <WifiOff size={16} />
            <span className="text-sm font-medium">You're offline</span>
          </div>
        )}
        <div
          id="mainpage"
          className="grid min-h-screen transition-all duration-300 lg:grid-cols-[300px_1fr_400px] md:grid-cols-[250px_1fr] grid-cols-1 gap-6 p-6"
        >
          <div className="lg:block hidden">
            <div className="sticky top-6">
              <Sidebar color={'blue'} />
            </div>
          </div>
          <div className="min-w-0">
            <Middle_part themeColor={'blue'} userData={userData} />
          </div>
          <div className="lg:block hidden">
            <div className="sticky top-6">
              <Right_part />
            </div>
          </div>
        </div>
        <div className="lg:hidden fixed bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-blue-500/10 p-4">
            <div className="flex justify-between items-center">
              <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">☰</span>
                </div>
                <span className="text-xs text-gray-600">Menu</span>
              </button>
              <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
                <span className="text-xs text-gray-600">Add</span>
              </button>
              <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">📊</span>
                </div>
                <span className="text-xs text-gray-600">Stats</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page1;