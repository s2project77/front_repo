"use client";
import { Database, Archive, User,MapPin, PlusCircle } from 'lucide-react';
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
  { id: 1, name: "medicament documents", link: "/" ,icon: Database},
  { id: 2, name: "Archive", link: "/" , icon: Archive},
  
  { id: 3, name: "profile", link: "/" ,icon: User},
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
    blue: "bg-slate-100",
    green: "bg-gray-100",
  };

  const linkColorMap = {
    blue: "text-slate-700 ",
    green: "text-black ",
  };

  const background = bgColorMap[color] || "bg-gray-100"; // Default to gray if no color is passed
  const linkClasses = linkColorMap[color] || "text-gree-700 hover:text-green-100"; // Default to green links

  return (
    <div className={`font-bold text-black shadow-lg min-h-screen relative shadow-gray-300   flex flex-col gap-4 top-0 left-0  bottom-0 h-full py-7 text-left px-auto rounded-2xl ${background}`}>
     {/* Location Section */}
     <div className='flex flex-col relative mx-auto w-[90%] gap-3'>
        <div className='flex flex-row gap-2 items-center'>
          {Show ? (
            <ChevronDown className='cursor-pointer' onClick={handledisapear}></ChevronDown>
          ) : (
            <ChevronRight onClick={handleShow}></ChevronRight>
          )}
          <div className='flex hover:bg-white w-[100%] p-1 cursor-pointer items-center gap-2'>
            <MapPin size={20} />
            <h1 >your location</h1>
          </div>
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


     
      <div className='w-[90%] mx-auto'>
        <div className='flex   flex-row gap-2 items-center'>
          {Show2 ? (
            <ChevronDown className='cursor-pointer' onClick={handledisapear2}></ChevronDown>
          ) : (
            <ChevronRight onClick={handleShow2}></ChevronRight>
          )}
          <Link href="../addmedicament"  className={`${linkClasses} flex hover:bg-white w-[100%] mb-1 cursor-pointer  flex-row`}>
            <PlusCircle className='pt-1'  size={20} />
            <span className='pl-2 pb-1 '>add medicament</span>
          </Link>
        </div>
        {Show2 && (
          <div className='border border-gray-300 py-5 rounded-xl'>
            <ImageUploader />
          </div>
        )}
      </div>


      <div className='flex mx-auto w-[90%] relative'>
      <ul className='flex flex-col gap-3 w-full relative'>
        {side_bar_data.map((data) => (
          <li className='hover:bg-white w-[100%] p-1' key={data.id}>
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
    </div>
  );
};
