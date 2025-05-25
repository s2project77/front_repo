"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/app/components/mainpage_layout/layout';
import { Side_bar } from '@/app/components/mainpage/side_bar';
import Searchbar from '@/app/components/searchbar';

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
                const response = await fetch("http://localhost:80/api/medicines/getFamilies");
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

    return (
        <Layout>
            <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
                <Side_bar />
                
                <div className="flex p-6 min-h-screen w-full relative flex-col gap-10 px-4 sm:px-20">
                    <div>
                        <h1 className="text-2xl font-bold">Medicaments Documentation </h1>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <Searchbar data={[]} />
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500">Error: {error}</p>
                        </div>
                    ) : visible.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">
                                {visible.map((brandName, index) => (
                                    <div className="bg-white h-60 hover:shadow-2xl flex flex-col p-4 border border-green-200 rounded-lg transition-all duration-300 shadow-lg hover:border-green-400" key={index}>
                                        <div className="flex-1">
                                            <p className="text-lg font-bold text-gray-800 mb-2">{brandName}</p>
                                            <p className="text-sm text-gray-600">
                                                Part of the {_id} family. View detailed information including dosage, 
                                                interactions, and usage guidelines in our documentation.
                                            </p>
                                        </div>
                                        <div className="flex justify-center w-full mt-4">
                                            <Link href={`/Documentation`}>
                                                <button className="px-4 py-2 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                                    View Documentation
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-4 mt-4">
                                {page > 0 && (
                                    <button 
                                        onClick={prevPage} 
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}
                                {fetchedData.length > (page + 1) * 9 && (
                                    <button 
                                        onClick={nextPage} 
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No medicines found</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Page;