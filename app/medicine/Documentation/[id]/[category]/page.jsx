"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/app/components/medcine_layout/layout';
import Side_bar from '@/app/components/medicine/mainpage/sidebar';


const Page = ({params}) => {
    const {category} = params;
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
                const response = await fetch("http://localhost:3001/api/medicines/getFamilies");
                const data = await response.json();
                
                if (data.status === "success" && data.data && data.data.families) {
                    const targetFamily = data.data.families.find(
                        fam => fam._id.toString() === _id.toString()
                    );
                    
                    if (targetFamily) {
                        setFetchedData(targetFamily.brands);
                        setVisible((targetFamily.brands).slice(0, 9));
                    } else {
                        console.error("Family not found");
                        setFetchedData([]);
                        setVisible([]);
                    }
                } else {
                    console.error("Unexpected API response format");
                    setFetchedData([]);
                    setVisible([]);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id]);

    const nextPage = () => {
        const nextPageNum = page + 1;
        const start = nextPageNum * 9;
        const end = start + 9;
        
        if (start >= fetchedData.length) return; // Don't go beyond available data
        
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

  // ...existing code...
return (
    <Layout>
        <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr] bg-gradient-to-br from-blue-50 via-white to-green-50">
            <Side_bar />
            <div className="flex p-6 min-h-screen w-full relative flex-col gap-10 px-4 sm:px-20">
                <div className="mb-2">
                    <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-1">
                        Medicaments Documentation
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Browse all medicines in the <span className="font-semibold text-green-700">{_id}</span> family.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></span>
                        <p className="text-gray-500 text-lg">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <svg className="w-10 h-10 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                        </svg>
                        <p className="text-red-500 text-lg">Error: {error}</p>
                    </div>
                ) : visible.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                            {visible.map((brandName, index) => (
                                <div
                                    key={index}
                                    className="bg-white h-60 flex flex-col p-6 border border-green-200 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Decorative gradient circle */}
                                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
                                    <div className="flex-1 z-10">
                                        <p className="text-xl font-bold text-blue-700 mb-2">{brandName}</p>
                                        <p className="text-sm text-gray-600">
                                            Part of the <span className="font-semibold text-green-700">{_id}</span> family.<br />
                                            View detailed information including dosage, interactions, and usage guidelines.
                                        </p>
                                    </div>
                                    <div className="flex justify-center w-full mt-6 z-10">
                                        <Link href={`../`}>
                                            <button className="px-4 py-2 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                                View Documentation
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 mt-8">
                            {page > 0 && (
                                <button
                                    onClick={prevPage}
                                    className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors shadow"
                                >
                                    &larr; Previous
                                </button>
                            )}
                            <span className="text-gray-600 font-medium self-center">
                                Page {page + 1} of {Math.ceil(fetchedData.length / 9)}
                            </span>
                            {fetchedData.length > (page + 1) * 9 && (
                                <button
                                    onClick={nextPage}
                                    className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow"
                                >
                                    Next &rarr;
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 00-4-4 4 4 0 00-4 4v2a4 4 0 004 4h4a4 4 0 004-4v-2a4 4 0 00-4-4z" />
                        </svg>
                        <p className="text-gray-500 text-lg">No medicines found in this family.</p>
                    </div>
                )}
            </div>
        </div>
    </Layout>
);
// ...existing code...
}

export default Page;