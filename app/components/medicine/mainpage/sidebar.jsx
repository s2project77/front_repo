"use client";
<<<<<<< HEAD
import { Database, Archive, User, MapPin, PlusCircle, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
=======
import { Database, Archive, User, MapPin, PlusCircle, Pill } from 'lucide-react';
>>>>>>> 9b55ceb (static data)
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageUploader from '../../mainpage/input_file';
import { useRouter } from 'next/navigation';

const side_bar_data = [
  { id: 1, name: "medicament documents", link: "/medicine/Documentation", icon: Database },
  { id: 2, name: "Archive", link: "/", icon: Archive },
  { id: 3, name: "profile", link: "/", icon: User },
];

export const Side_bar = ({ color = 'green' }) => {
  const [Show, setShow] = useState(true);
  const [Show2, setShow2] = useState(true);
  const router = useRouter();

  const bgColorMap = {
    blue: "bg-slate-100",
    green: "bg-gray-100",
  };

  const linkColorMap = {
    blue: "text-slate-700",
    green: "text-black",
  };

  const background = bgColorMap[color] || "bg-gray-100";
<<<<<<< HEAD
  const linkClasses = linkColorMap[color] || "text-green-700 hover:text-green-100";

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className={`font-bold text-black shadow-lg min-h-screen relative shadow-gray-300 flex flex-col gap-4 py-7 text-left px-auto rounded-2xl ${background}`}>
      
      {/* Location Section */}
=======
  const linkClasses = linkColorMap[color] || "text-gree-700 hover:text-green-100";

  return (
    <div className={`font-bold text-black shadow-lg min-h-screen relative shadow-gray-300 mt-2 flex flex-col gap-4 top-0 left-0 bottom-0 h-full py-7 text-left px-auto rounded-2xl ${background}`}>
      {/* Medicine Location Section */}
>>>>>>> 9b55ceb (static data)
      <div className='flex flex-col relative mx-auto w-[90%] gap-3'>
        <div className='flex flex-row gap-2 items-center'>
          {Show ? (
            <ChevronDown className='cursor-pointer' onClick={() => setShow(false)} />
          ) : (
            <ChevronRight className='cursor-pointer' onClick={() => setShow(true)} />
          )}
<<<<<<< HEAD
          <div className='flex hover:bg-white w-full p-1 cursor-pointer items-center gap-2'>
            <MapPin size={20} />
            <h1>your location</h1>
=======
          <div className='flex hover:bg-white w-[100%] p-1 cursor-pointer items-center gap-2'>
            <Pill size={20} />
            <h1>Pharmacy Network</h1>
>>>>>>> 9b55ceb (static data)
          </div>
        </div>
        {Show && (
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-red-500" />
              <span className="font-semibold">Nearest Pharmacy:</span>
            </div>
            <p className="text-sm mb-1">LifeCare Pharmacy</p>
            <p className="text-xs text-gray-600">123 Health St, Medical District</p>
            <p className="text-xs text-gray-600">Open: 8AM - 10PM</p>
            
            <div className="mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Pill size={16} className="text-blue-500" />
                <span className="font-semibold">Available Medicines:</span>
              </div>
              <ul className="text-xs space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Paracetamol (In Stock)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Ibuprofen (In Stock)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Amoxicillin (Low Stock)
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Add Prespective Section */}
=======
>>>>>>> 9b55ceb (static data)
      <div className='w-[90%] mx-auto'>
        <div className='flex flex-row gap-2 items-center'>
          {Show2 ? (
            <ChevronDown className='cursor-pointer' onClick={() => setShow2(false)} />
          ) : (
            <ChevronRight className='cursor-pointer' onClick={() => setShow2(true)} />
          )}
<<<<<<< HEAD
          <Link href="/medicine/patient" className={`${linkClasses} flex hover:bg-white w-full mb-1 cursor-pointer flex-row`}>
=======
          <Link href="../medicine/patient" className={`${linkClasses} flex hover:bg-white w-[100%] mb-1 cursor-pointer flex-row`}>
>>>>>>> 9b55ceb (static data)
            <PlusCircle className='pt-1' size={20} />
            <span className='pl-2 pb-1'>add prespective</span>
          </Link>
        </div>
        {Show2 && (
          <div className='border border-gray-300 py-5 rounded-xl'>
            <ImageUploader />
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Sidebar Navigation */}
      <div className='flex mx-auto w-[90%]'>
        <ul className='flex flex-col gap-3 w-full'>
          {side_bar_data.map((data) => (
            <li className='hover:bg-white w-full p-1' key={data.id}>
=======
      <div className='flex mx-auto w-[90%] relative'>
        <ul className='flex flex-col gap-3 w-full relative'>
          {side_bar_data.map((data) => (
            <li className='hover:bg-white w-[100%] p-1' key={data.id}>
>>>>>>> 9b55ceb (static data)
              <Link href={data.link} className={linkClasses}>
                <span className="inline-flex items-center">
                  {data.icon && <data.icon size={20} />}
                  <span className="ml-2">{data.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
<<<<<<< HEAD

      {/* Logout Button */}
      <div className="mt-auto w-[90%] mx-auto border-t pt-4">
        <Link
          href="/"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-500 hover:bg-red-100 px-4 py-2 rounded"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
=======
>>>>>>> 9b55ceb (static data)
    </div>
  );
};