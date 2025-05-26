"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/app/components/mainpage_layout/layout';
import { Side_bar } from '@/app/components/mainpage/side_bar';

const Page = ({ params }) => {
    const { category } = params;
    const _id = category;
    const [fetchedData, setFetchedData] = useState([]);
    const [visible, setVisible] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                
                const response = await fetch("http://localhost:3001/api/medicines/getFamilies");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status === "success" && data.data?.families) {
                    const targetFamily = data.data.families.find(
                        fam => fam._id?.toString() === _id?.toString()
                    );
                    
                    if (targetFamily && targetFamily.brands) {
                        setFetchedData(targetFamily.brands);
                        setVisible(targetFamily.brands.slice(0, 9));
                    } else {
                        console.warn("Family not found or no brands available");
                        setFetchedData([]);
                        setVisible([]);
                    }
                } else {
                    throw new Error("Unexpected API response format");
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setFetchedData([]);
                setVisible([]);
            } finally {
                setLoading(false);
            }
        };

        if (_id) {
            fetchData();
        }
    }, [_id]);

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

    return (
        <Layout>
            <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
                <Side_bar />
                
                <div className="flex p-6 min-h-screen w-full relative flex-col gap-10 px-4 sm:px-20">
                    <div>
                        <h1 className="text-2xl font-bold">Medicaments Documentation</h1>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                                <p className="text-red-600 font-medium">Error loading data</p>
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : visible.length > 0 ? (
                        <>
                            <div className="mb-4">
                                <p className="text-gray-600">
                                    Showing {page * 9 + 1}-{Math.min((page + 1) * 9, fetchedData.length)} of {fetchedData.length} medicines
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">
                                {visible.map((brandName, index) => (
                                    <div 
                                        className="bg-white h-60 hover:shadow-2xl flex flex-col p-4 border border-green-200 rounded-lg transition-all duration-300 shadow-lg hover:border-green-400" 
                                        key={`${brandName}-${index}`}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                                {brandName}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                Part of the medicine family. View detailed information including dosage, 
                                                interactions, and usage guidelines in our documentation.
                                            </p>
                                        </div>
                                        <div className="flex justify-center w-full mt-4">
                                            <Link 
                                                href={`/Documentation?medicine=${encodeURIComponent(brandName)}&family=${encodeURIComponent(_id)}`}
                                                className="w-full"
                                            >
                                                <button className="px-4 py-2 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                                    View Documentation
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-6">
                                    <button 
                                        onClick={prevPage} 
                                        disabled={!hasPrevPage}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            hasPrevPage 
                                                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    <span className="text-gray-600">
                                        Page {page + 1} of {totalPages}
                                    </span>
                                    
                                    <button 
                                        onClick={nextPage} 
                                        disabled={!hasNextPage}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            hasNextPage 
                                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
                                <p className="text-gray-500">No medicines are available in this category at the moment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Page;