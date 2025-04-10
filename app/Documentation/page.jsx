"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/mainpage_layout/layout';
import { Side_bar } from '../components/mainpage/side_bar';
import Searchbar from '../components/searchbar';
import Image from 'next/image';
const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [visible, setVisible] = useState([]);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("https://jsonplaceholder.typicode.com/photos");
        const data = await result.json();
        setFetchedData(data);
        setVisible(data.slice(0, 9));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const nextPage = () => {
    const nextPage = page + 1;
    const start = nextPage * 9;
    const end = start + 9;
    setPage(nextPage);
    setVisible(fetchedData.slice(start, end));
  };
  
  return (
    <Layout>
      <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
        <Side_bar />
        
        <div className="flex w-full relative flex-col gap-10 px-20">
          <div>
            <h1 className="text-2xl font-bold">Medicaments Documentation</h1>
          </div>
          
          <div className="flex items-center justify-center">
            <Searchbar data={fetchedData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full sm:w-[80%] mx-auto">
            {visible.map((item) => (
              <div 
                key={item.id} 
                className="bg-red-200 h-48 flex flex-col p-4 shadow-sm border shadow-gray-400 rounded"
              >
                <p className="text-sm overflow-hidden">{item.title}</p>
               
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={nextPage} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;