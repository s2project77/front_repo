"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ImageUploader from './input_file';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

const side_bar_data = [
  { id: 1, name: "medicament documents", link: "/" },
  { id: 2, name: "Archive", link: "/" },
  { id: 3, name: "history", link: "/" },
  { id: 4, name: "profile", link: "/" },
];

export const Side_bar = ({ color = 'green' }) => {
  const [Show, setShow] = useState(true);
  const handleShow = () => setShow(true);
  const handledisapear = () => setShow(false);
  const [Show2, setShow2] = useState(true);
  const handleShow2 = () => setShow2(true);
  const handledisapear2 = () => setShow2(false);

  // Define dynamic color classes
  const bgColorMap = {
    blue: "bg-blue-100",
    green: "bg-green-100",
  };

  const linkColorMap = {
    blue: "text-blue-700 hover:text-blue-900",
    green: "text-green-700 hover:text-green-900",
  };

  const background = bgColorMap[color] || "bg-gray-100"; // Default to gray if no color is passed
  const linkClasses = linkColorMap[color] || "text-green-700 hover:text-green-900"; // Default to green links

  return (
    <div className={`font-bold text-black shadow-lg shadow-gray-400 relative flex flex-col gap-4 top-0 left-0 min-h-screen bottom-0 h-full py-7 text-left px-auto rounded-2xl ${background}`}>
      {/* Location Section */}
      <div className='flex flex-col relative mx-auto w-[90%] gap-3'>
        <div className='flex flex-row gap-2'>
          {Show ? (
            <ChevronDown className='cursor-pointer' onClick={handledisapear}></ChevronDown>
          ) : (
            <ChevronRight onClick={handleShow}></ChevronRight>
          )}
          <h1 className=''>your location</h1>
        </div>
        {Show && (
          <Image
            src={"/map.jpg"}
            className='w-full object-cover h-full'
            width={100}
            height={100}
            alt='your location'
          />
        )}
      </div>

      {/* Add Medicament Section */}
      <div className='w-[90%] mx-auto'>
        <div className='flex flex-row gap-2'>
          {Show2 ? (
            <ChevronDown className='cursor-pointer' onClick={handledisapear2}></ChevronDown>
          ) : (
            <ChevronRight onClick={handleShow2}></ChevronRight>
          )}
          <Link href="../addmedicament" className={linkClasses}>
            add medicament
          </Link>
        </div>
        {Show2 && (
          <div className='border border-gray-300 py-5 rounded-xl'>
            <ImageUploader />
          </div>
        )}
      </div>

      {/* Sidebar Links */}
      <div className='flex mx-auto w-[90%]'>
        <ul className='flex flex-col gap-3'>
          {side_bar_data.map((data) => (
            <li key={data.id}>
              <Link href={data.link} className={linkClasses}>
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
