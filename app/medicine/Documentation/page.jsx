"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/app/components/medcine_layout/layout';
import { Side_bar } from '@/app/components/mainpage/side_bar';
import Searchbar from '@/app/components/searchbar';
const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [visible, setVisible] = useState([]);
  const [page, setPage] = useState(0);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://192.168.1.8:4001/api/medicines/getfamilies");
        const json = await result.json();
        const medicines = json.data.data; // this is the actual array
        setFetchedData(medicines);
        setVisible(medicines.slice(0, 9)); // first 9 items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  {/* useEffect(() => {
    const fetchData = async () => {
      try {
        
       // http://192.168.239.229:3000/api/medicines/getFamilies
        const result = await fetch("http://192.168.239.229:3000/api/medicines/getFamilies");
        const data = await result.json();
        setFetchedData(data);
        setVisible(data.slice(0, 9));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);*/}
  
 {/* const nextPage = () => {
    const nextPage = page + 1;
    const start = nextPage * 9;
    const end = start + 9;
    setPage(nextPage);
    setVisible(fetchedData.slice(start, end));
  };
 */}
 const nextPage = () => {
  const nextPageNum = page + 1;
  const start = nextPageNum * 9;
  const end = start + 9;
  setPage(nextPageNum);
  setVisible(fetchedData.slice(start, end));
};

  
  return (
    <Layout>
      <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
        <Side_bar />
        
        <div className="flex p-6 min-h-screen    w-full relative flex-col gap-10 px-20">
          <div>
            <h1 className="text-2xl font-bold">Medicaments Documentation</h1>
          </div>
          
          <div className="flex items-center justify-center">
            <Searchbar data={fetchedData} />
          </div>
          
          {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full sm:w-[80%] mx-auto">
            {visible.map((item,index) => (
            
              <div 
                key={index} 
                className="bg-red-200 h-48 flex flex-col p-4 shadow-sm border shadow-gray-400 rounded"
              > 
                <p className="text-sm overflow-hidden">{item.brandName}</p>
               
             
                
              </div>
            ))}
          </div>
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl mx-auto px-4">
  {visible.map((item, index) => (
    <div 
      key={index} 
    className="bg-white h-48 flex flex-col justify-between p-4 shadow-md border border-green-200 transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer hover:rounded-2xl"c
    > 
      <p className="text-base font-semibold text-gray-800 truncate">{item.brandName}</p>
      <p className="text-sm text-gray-600 overflow-hidden line-clamp-3">{item.description}</p>
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