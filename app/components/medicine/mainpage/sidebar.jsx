"use client";
import { Database, Archive, User, MapPin, PlusCircle, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
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
  const linkClasses = linkColorMap[color] || "text-green-700 hover:text-green-100";

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className={`font-bold text-black shadow-lg min-h-screen relative shadow-gray-300 flex flex-col gap-4 py-7 text-left px-auto rounded-2xl ${background}`}>
      
      {/* Location Section */}
      <div className='flex flex-col relative mx-auto w-[90%] gap-3'>
        <div className='flex flex-row gap-2 items-center'>
          {Show ? (
            <ChevronDown className='cursor-pointer' onClick={() => setShow(false)} />
          ) : (
            <ChevronRight className='cursor-pointer' onClick={() => setShow(true)} />
          )}
          <div className='flex hover:bg-white w-full p-1 cursor-pointer items-center gap-2'>
            <MapPin size={20} />
            <h1>your location</h1>
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

      {/* Add Prespective Section */}
      <div className='w-[90%] mx-auto'>
        <div className='flex flex-row gap-2 items-center'>
          {Show2 ? (
            <ChevronDown className='cursor-pointer' onClick={() => setShow2(false)} />
          ) : (
            <ChevronRight className='cursor-pointer' onClick={() => setShow2(true)} />
          )}
          <Link href="/medicine/patient" className={`${linkClasses} flex hover:bg-white w-full mb-1 cursor-pointer flex-row`}>
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

      {/* Sidebar Navigation */}
      <div className='flex mx-auto w-[90%]'>
        <ul className='flex flex-col gap-3 w-full'>
          {side_bar_data.map((data) => (
            <li className='hover:bg-white w-full p-1' key={data.id}>
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
    </div>
  );
};
