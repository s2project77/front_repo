"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/app/components/medcine_layout/layout';
import Side_bar from '@/app/components/medicine/mainpage/sidebar';
import Searchbar from '@/app/components/searchbar';
import Link from 'next/link';
import Image from 'next/image';

// Common medicine image for all cards
const MEDICINE_IMAGE = '/medicine-icon.png';

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [visible, setVisible] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:3001/api/medicines/getAllMedicines");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status !== "success" || !result.data?.data) {
          throw new Error("Invalid data format received from API");
        }
        
        setFetchedData(result.data.data);
        setVisible(result.data.data.slice(0, 9));
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setFetchedData([]);
        setVisible([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextPage = () => {
    const nextPageNum = page + 1;
    const start = nextPageNum * 9;
    const end = start + 9;
    
    if (start >= fetchedData.length) return; 
    setPage(nextPageNum);
    setVisible(fetchedData.slice(start, end));
  };

  const prevPage = () => {
    if (page === 0) return;
    const prevPageNum = page - 1;
    const start = prevPageNum * 9;
    const end = start + 9;
    setPage(prevPageNum);
    setVisible(fetchedData.slice(start, end));
  };

  const totalPages = Math.ceil(fetchedData.length / 9);
  const hasNextPage = fetchedData.length > (page + 1) * 9;
  const hasPrevPage = page > 0;

  // Enhanced loading component
  if (loading) {
    return (
      <Layout>
        <div className="w-full min-h-screen grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
          <Side_bar />
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center p-8">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Medicines</h2>
              <p className="text-gray-600">Please wait while we fetch the latest medicine data...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Enhanced error component
  if (error) {
    return (
      <Layout>
        <div className="w-full min-h-screen grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
          <Side_bar />
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
            <div className="text-center p-8 max-w-md">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
              <p className="text-gray-600 mb-4">Unable to load medicine data. Please check your connection.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
          <Side_bar />
         
          <div className="flex p-6 min-h-screen w-full relative flex-col gap-8 px-4 sm:px-20">
            {/* Enhanced Header */}
            <div className="text-center py-8">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Medical Database
                </span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Medicine Documentation
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive database of medicines with detailed information, dosages, and usage guidelines
              </p>
            </div>
            
            {/* Enhanced Search Section */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-full max-w-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-4">
                  <Searchbar data={fetchedData} />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Medicines</p>
                    <p className="text-2xl font-bold text-blue-600">{fetchedData.length}</p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Page</p>
                    <p className="text-2xl font-bold text-green-600">{page + 1} of {totalPages}</p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Showing Results</p>
                    <p className="text-2xl font-bold text-purple-600">{visible.length}</p>
                  </div>
                  <div className="bg-purple-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {visible.length > 0 ? (
              <>
                {/* Enhanced Medicine Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
                  {visible.map((item, index) => (
                    <Link key={`${item.id}-${index}`} href={`./Documentation/${item.id}`}>
                      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 overflow-hidden transform hover:-translate-y-2 h-80">
                        {/* Card Header with Image */}
                        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-24 overflow-hidden">
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="absolute -bottom-8 -right-8 opacity-20">
                            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                            </svg>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Image 
                              height={40} 
                              width={40}
                              src={MEDICINE_IMAGE}
                              alt="Medicine"
                              className="w-10 h-10 object-contain bg-white/20 backdrop-blur-sm rounded-lg p-2"
                              onError={(e) => {
                                e.target.src = '/placeholder-medicine.svg';
                              }}
                            />
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex flex-col justify-between h-56">
                          <div>
                            <div className="mb-3">
                              <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                                {item.brandName}
                              </h3>
                              <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full">
                                {item.genericName}
                              </p>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Form:</span> {item.form}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Unit:</span> {item.measurementUnit}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {item.description || 'Complete medicine information available in documentation.'}
                            </p>
                          </div>
                          
                          {/* Card Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              ID: {item.id}
                            </span>
                            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                              <span>View Details</span>
                              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 mt-12 py-8">
                    <button 
                      onClick={prevPage} 
                      disabled={!hasPrevPage}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        hasPrevPage 
                          ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-white rounded-xl px-6 py-3 shadow-lg border border-gray-200">
                        <span className="text-gray-600 font-medium">
                          Page <span className="text-blue-600 font-bold">{page + 1}</span> of <span className="text-purple-600 font-bold">{totalPages}</span>
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={nextPage} 
                      disabled={!hasNextPage}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        hasNextPage 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Enhanced Empty State
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-gray-100">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
                  <p className="text-gray-600 mb-6">We couldn't find any medicines matching your criteria. Try adjusting your search or check back later.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;