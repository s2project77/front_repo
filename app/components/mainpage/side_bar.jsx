"use client";

import { Database, Archive, User, MapPin, PlusCircle, LogOut, ChevronDown, ChevronRight } from 'lucide-react';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import ImageUploader from './input_file';

const side_bar_data = [
  { id: 1, name: "medicament documents", link: "/Documentation", icon: Database },
  { id: 2, name: "Archive", link: "/", icon: Archive },

  { id: 3, name: "profile", link: "/profile", icon: User },

];

export const Side_bar = ({ color = 'green' }) => {
  const [Show, setShow] = useState(true);

  const handleShow = () => setShow(true);
  const handledisapear = () => setShow(false);
  
  const [Show2, setShow2] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/pharmacy");
  };

  const bgColorMap = {
    blue: "bg-slate-100",
    green: "bg-gray-100",
  };

  const linkColorMap = {

    blue: "text-blue-700 hover:text-blue-900",
    green: "text-green-700 hover:text-green-900",
  };

  const iconColorMap = {
    blue: "text-blue-600",
    green: "text-green-600", 
  };

  const borderColorMap = {
    blue: "border-blue-200",
    green: "border-green-200",
  };

  const background = bgColorMap[color] || "bg-gray-100";
  const linkClasses = linkColorMap[color] || "text-green-700 hover:text-green-900";
  const iconColor = iconColorMap[color] || "text-green-600";
  const borderColor = borderColorMap[color] || "border-green-200";

  return (
    <div className={`font-medium text-gray-800 shadow-lg min-h-screen relative shadow-gray-300 
      flex flex-col  top-0 left-0 bottom-0 h-full py-6 gap-4 mt-2 text-left rounded-2xl ${background}`}>
      
    

      {/* Location Section */}
      <div className='flex flex-col relative mx-auto w-[90%] gap-3'>
        <div className='flex flex-row gap-2 items-center'>

          <button 
            onClick={Show ? handledisapear : handleShow}
            className="focus:outline-none"
            aria-label={Show ? "Hide location" : "Show location"}
          >
            {Show ? (
              <ChevronDown className={`cursor-pointer ${iconColor}`} />
            ) : (
              <ChevronRight className={`cursor-pointer ${iconColor}`} />
            )}
          </button>
          <div className='flex hover:bg-white w-full p-2 rounded-lg cursor-pointer items-center gap-2 transition-colors duration-200'>
            <MapPin size={20} className={iconColor} />
            <h3 className="font-medium">Your location</h3>

          </div>
        </div>
        
        {Show && (
          <div className="relative overflow-hidden rounded-lg shadow-md border border-gray-200">
            <Image
              src="/map.jpg"
              className='w-full object-cover aspect-video'
              width={300}
              height={200}
              alt='Your pharmacy location'
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              <div className="flex items-center text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <span>Pharmacy Location</span>
              </div>
            </div>
          </div>
        )}
      </div>

      
      {/* Add Medicament Section */}
      <div className='w-[90%] mx-auto'>
        <div className='flex flex-row gap-2 items-center'>
          <button 
            onClick={Show2 ? handledisapear2 : handleShow2}
            className="focus:outline-none"
            aria-label={Show2 ? "Hide add medicament" : "Show add medicament"}
          >
            {Show2 ? (
              <ChevronDown className={`cursor-pointer ${iconColor}`} />
            ) : (
              <ChevronRight className={`cursor-pointer ${iconColor}`} />
            )}
          </button>
          <Link 
            href="../addmedicament" 
            className={`${linkClasses} flex hover:bg-white w-full p-2 rounded-lg mb-1 cursor-pointer transition-colors duration-200`}
          >
            <PlusCircle size={20} className="mt-0.5" />
            <span className='pl-2'>Add medicament</span>

          </Link>
        </div>
        
        {Show2 && (
          <div className={`border ${borderColor} py-5 px-3 rounded-xl bg-white bg-opacity-70 shadow-sm mt-2`}>
            <ImageUploader />
          </div>
        )}
      </div>

      
      {/* Navigation Links */}
      <div className='flex mx-auto w-[90%] relative mt-2'>
        <nav className='w-full'>
          <ul className='flex flex-col  w-full relative'>
            {side_bar_data.map((data) => (
              <li key={data.id}>
                <Link 
                  href={data.link} 
                  className={`${linkClasses} flex items-center p-2 rounded-lg hover:bg-white transition-colors duration-200 w-full`}
                >
                  {data.icon && <data.icon size={20} className={`${iconColor} mr-2`} />}
                  <span className="capitalize">{data.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Footer */}
      <div className="mt-auto w-[90%] mx-auto py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">© 2025 PharmacyApp</span>
          <button 
            className={`p-1 rounded-full ${iconColor} hover:bg-white transition-colors duration-200`}
            aria-label="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Side_bar;