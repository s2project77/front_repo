import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import search from "../../search.svg"

export const Middle_part = ({ themeColor = 'slate', userData, phone = '0661895757', fax = '046572729' }) => {
  const textTheme = `text-${themeColor}-400`;
  const bgTheme = `bg-${themeColor}-100`;
  const borderTheme = `border-${themeColor}-300`;

  return (
    <div className="min-h-screen p-4 md:p-6 m-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md flex flex-col gap-6 items-center">
      {/* Search Box */}
      <div className="w-full md:w-[85%] rounded-xl flex relative items-center h-[3.5rem]">
        <span className="absolute left-4">
          <Image src={search} width={25} height={25} alt="search icon" />
        </span>
        <input
          type="text"
          placeholder="Search For Medicament"
          className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Info Box */}
      <div className={clsx("w-full md:w-[85%] rounded-xl shadow-xl border flex flex-col gap-4 p-4", bgTheme, borderTheme, "dark:bg-gray-800 dark:border-gray-700")}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-[40%] h-48 md:h-auto">
            <Image
              src="/map.jpg"
              layout="fill"
              objectFit="cover"
              alt="map"
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 text-sm md:text-base dark:text-white">
            <p><strong>First name:</strong> {userData?.Firstname || 'Unknown'}</p>
            <p><strong>Last name:</strong> {userData?.Lastname || 'Unknown'}</p>
            <p><strong>Phone number:</strong> {phone}</p>
            <p><strong>FAX:</strong> {fax}</p>
          </div>
        </div>
      </div>

      {/* Info Prompt */}
      <div className="w-full md:w-[85%] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-xl font-bold text-slate-700 dark:text-white">Improve your website</h2>
        <p className="text-slate-600 dark:text-gray-300">
          Adding a new medicament or information will improve your website — don’t miss out!
        </p>
      </div>

      {/* CTA Button */}
      <div className="w-full md:w-[85%]">
        <button className="w-full md:w-[65%] flex items-center justify-center gap-4 h-12 mx-auto bg-slate-400 hover:bg-slate-700 text-slate-900 hover:text-white dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white font-bold rounded-xl shadow-md transition">
          <Image src="/add-icon-svgrepo-com.svg" width={20} height={20} alt="add icon" />
          Add information about your medicament
        </button>
      </div>
    </div>
  );
};
