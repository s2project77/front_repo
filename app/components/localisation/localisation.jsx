"use client"
{/*
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown,ChevronRight } from 'lucide-react'
export const Localisation = () => {
    const [show,setshow]=useState(false)
       const hadndleshow=()=>{
            setshow(true)
        }
     const handledisapear=()=>{
         setshow(false)
     }
  return (
    <div className='  grid-rows-2 w-full mt-7 mx-auto justify-center items-center '>
<div className='w-[65%]  rounded-xl mb-5  flex flex-row relative justify-center items-center h-[2cm] mx-auto '>
    <span className=" text-2xl text-gray-400 relative left-14 top-1  ">🔍</span>
<input type="text" className='w-[86%] h-[68%] mt-2  ml-3  pl-14 py-3 border-gray-400 border-solid border rounded-xl ' placeholder='Search For Medicament' />
<span className="pr-3 pl-2 font-bold text-2xl justify-center mb-2 h-6 w-10 text-yellow-500"> 🔔</span>
    </div>
    <div className='flex flex-col gap-4 justify-center items-center  relative w-full '>
 <div className='flex relative   flex-row gap-2 ' >
       {show ?(<  ChevronDown onClick={handledisapear} ></ChevronDown>):(<ChevronRight onClick={hadndleshow}></ChevronRight>)}
         <h1  >your location</h1></div>
    


    {show &&
<div className='w-[90%]  flex items-center'>
<Image src={"/loc.jpg"}  width={100} height={100} alt='d' className='h-full w-full object-cover'  ></Image>
    </div>}</div>
    </div>
  )
}
*/}
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Search, MapPin, Bell, ChevronDown, List, Info, Clock, Phone, Star } from 'lucide-react';

const Localisation=()=> {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  
  const pharmacies = [
    { id: 1, name: "MediCare Plus", address: "123 Broadway, New York, NY", rating: 4.8, openNow: true, distance: "0.3 mi", lat: 40.712776, lng: -74.005974 },
    { id: 2, name: "HealthPoint Pharmacy", address: "456 5th Ave, New York, NY", rating: 4.6, openNow: true, distance: "1.2 mi", lat: 40.723776, lng: -73.989974 },
    { id: 3, name: "QuickCare Pharma", address: "789 Park Ave, New York, NY", rating: 4.7, openNow: false, distance: "1.8 mi", lat: 40.732776, lng: -73.978974 },
  
  ];
  
  return (
    <div className="min-h-screen  bg-gray-50">
      <Head>
        <title>Pharmacy Locator | MediCare</title>
        <meta name="description" content="Find pharmacies near you" />
      </Head>
      
            
          
        
      
      
      <div className="container mx-auto px-4 py-6 ">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
           placeholder="Search for pharmacy" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>
              
              <div className="mt-4  ">
         <div className="flex items-center justify-between mb-2 ">
    <h3 className="font-medium text-gray-800">Nearby Pharmacies</h3>
            <div className="flex space-x-2">
      <button 
                      className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}
                onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </button>
                    <button 
                      className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}
                      onClick={() => setViewMode('map')}
               >
            <MapPin size={16} />
                    </button>                  </div>
                </div>
                
                <div className="space-y-3 mt-3">
                  {pharmacies.map((pharmacy) => (
                    <div 
                      key={pharmacy.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 ${selectedPharmacy?.id === pharmacy.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedPharmacy(pharmacy)}
                    >
                      <div className="flex justify-between items-start">
            <div>
                          <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                 <p className="text-xs text-gray-500 mt-1">{pharmacy.address}</p>
                        </div>
                        <div className="flex items-center bg-emerald-100 px-2 py-1 rounded text-xs font-medium text-emerald-700">
                          {pharmacy.distance}
                    </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <div className="flex items-center text-amber-500">
                            <Star size={14} fill="currentColor" /> <span className="ml-1 text-xs font-medium">{pharmacy.rating}</span>
                          </div>                      <span className="mx-2 text-gray-300">•</span>
                          <div className={`text-xs font-medium ${pharmacy.openNow ? 'text-emerald-600' : 'text-red-500'}`}>
              {pharmacy.openNow ? 'Open Now' : 'Closed'}
                  </div>                    </div>
         <button className="text-emerald-600 text-xs font-medium">Details</button>
              </div>
                    </div>                  ))}
    </div>          </div>
      </div>
            
        {selectedPharmacy && (              <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between">
          <h3 className="font-semibold text-gray-900">{selectedPharmacy.name}</h3>                  <div className="flex items-center bg-emerald-100 px-2 py-1 rounded text-xs font-medium text-emerald-700">
                    {selectedPharmacy.distance}
                 </div>
        </div>
                
        <p className="text-sm text-gray-500 mt-1">{selectedPharmacy.address}</p>
                
                <div className="flex items-center mt-3">
          <div className="flex items-center text-amber-500">
             <Star size={16} fill="currentColor" />
         <span className="ml-1 text-sm font-medium">{selectedPharmacy.rating}</span>               </div>
                  <span className="mx-2 text-gray-300">•</span>
          <div className={`text-sm font-medium ${selectedPharmacy.openNow ? 'text-emerald-600' : 'text-red-500'}`}>
                    {selectedPharmacy.openNow ? 'Open Now' : 'Closed'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
               <Phone size={16} />
         <span>Call</span>
            </button>
                  <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
        <MapPin size={16} />
                <span>Directions</span>
                  </button>
        </div>  
   <div className="mt-4 space-y-3">
        <div className="flex items-start">
             <Clock className="text-emerald-600 mt-0.5" size={16} />
           <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Hours</p>
 <div className="text-xs text-gray-500 mt-1">
             <div className="flex justify-between">
                          <span>Monday - Friday</span>     <span>8:00 AM - 9:00 PM</span>
            </div>
                        <div className="flex justify-between">        <span>Saturday</span>
                         <span>9:00 AM - 7:00 PM</span>
             </div>
            <div className="flex justify-between">
      <span>Sunday</span>
         <span>10:00 AM - 6:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="text-emerald-600 mt-0.5" size={16} />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Services</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">24/7 Pickup</span>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">Drive-thru</span>                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">Delivery</span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">Vaccinations</span>
                   </div>
     </div>
    </div>
  </div>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4 order-1 md:order-2">
            <div className="relative w-full h-[calc(100vh-12rem)] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
          
              <div className="absolute inset-0 bg-gray-200">
                <div className="relative w-full h-full">
                  <Image 
                    src="/api/placeholder/1200/800" 
                    alt="Pharmacy locations map" 
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                  />
            
                  {pharmacies.map((pharmacy, index) => (
        <div 
                      key={pharmacy.id}                      className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${selectedPharmacy?.id === pharmacy.id ? 'scale-125 z-10' : ''}`}
                      style={{ 
                        left: `${30 + (index * 15)}%`, 
                        top: `${25 + (index * 20)}%` 
            }}
     onClick={() => setSelectedPharmacy(pharmacy)}
                    >                   <div className={`w-full h-full rounded-full flex items-center justify-center ${selectedPharmacy?.id === pharmacy.id ? 'bg-emerald-600' : 'bg-red-500'} text-white shadow-md`}>
                  <MapPin size={16} />
    </div>
                    </div>                ))}
</div>              </div>

              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col space-y-2">
                 <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">+</button>
                  <div className="w-full h-px bg-gray-200"></div>                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">−</button>
</div>
              </div>          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
    <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>                  <span className="text-xs">Pharmacy Location</span>
       </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
           <span className="text-xs">Selected Pharmacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Localisation;