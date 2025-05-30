"use client";
import React, { useState, useEffect } from 'react';
import Layout from '../components/mainpage_layout/layout';
import { Side_bar } from '../components/mainpage/side_bar';
import Searchbar from '@/app/components/searchbar';
import Link from 'next/link';
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <Layout>
        <div className="w-full min-h-screen  grid grid-cols-1 sm:grid-cols-[1.1fr_4fr] justify-center items-center">
          <Side_bar/>
          <div className="text-xl">Loading medicines...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="w-full min-h-screen grid grid-cols-1 sm:grid-cols-[1.1fr_4fr] justify-center items-center  ">
        <Side_bar/>
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
        <Side_bar />
       
        <div className="flex p-6 min-h-screen w-full relative flex-col gap-10 px-4 sm:px-20">
          <div>
            <h1 className="text-2xl font-bold">Medicaments Documentation

            

            </h1>
          </div>
          
          <div className="flex items-center  justify-center">
            <Searchbar  data={fetchedData} />
          </div>
          
          {visible.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">
                {visible.map((item,_) => (
                 <Link href={"./Documentation/"+item.id}  key={item._id}><div 
                   
                    className="bg-white h-60  hover:shadow-2xl flex flex-col justify-between p-4  border border-green-200 rounded-lg transition-all duration-300 shadow-lg hover:border-green-400"
                  > 
                    <div>
                      <p className="text-lg font-bold text-gray-800">{item.brandName}</p>
                      <p className="text-sm text-gray-600 font-medium">{item.genericName}</p>
                      <p className="text-xs text-gray-500 mt-1">Form: {item.form}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                   
                  </div></Link>
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
};

export default Page;