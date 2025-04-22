import React from 'react';
import Image from 'next/image';

export const Middle_part = ({ themeColor = 'green' }) => {
  const textTheme = `text-${themeColor}-600`;
  const bgTheme = `bg-${themeColor}-100`;
  const borderTheme = `border-${themeColor}-300`;

  return (
    <div className="min-h-screen flex flex-col gap-3 pt-6 relative items-center">
      {/* Search Box */}
      <div className="w-[85%] rounded-xl flex flex-row relative justify-center items-center h-[2cm] mx-auto">
        <span className="text-2xl text-blue-500 absolute left-8">🔍</span>
        <input
          type="text"
          className="w-[86%] h-[68%] mt-2 ml-3 pl-10 py-3 border-gray-300 border rounded-xl"
          placeholder="Search For Medicament"
        />
        <span className="pr-3 font-bold text-2xl justify-center mb-2 h-6 w-10 text-yellow-500">
          🔔
        </span>
      </div>

      {/* Info Box */}
      <div
        className={`w-[85%] ${bgTheme} ${borderTheme} border shadow-xl shadow-gray-300 rounded-xl flex flex-col gap-2 relative h-[7cm] mx-auto mt-3`}
      >
        <div className="flex flex-row gap-2 flex-1">
          <div className="relative h-full w-[40%]">
            <Image
              src="/map.jpg"
              width={100}
              height={100}
              alt="s"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <ul className="flex flex-col justify-center h-full">
              <li className="text-left">Pharmacie name</li>
              <li className="text-left">Location</li>
              <li className="text-left">User reference: DZ-19</li>
            </ul>
          </div>
        </div>

        <div className="flex relative w-full h-full flex-col gap-4 flex-1">
          <div className="grid w-full ml-4 grid-cols-2 gap-5">
            <span className="flex flex-row gap-2">
              First name: <p>Lachoub</p>
            </span>
            <span className="flex flex-row gap-2">
              Last Name: <p>Zineddine</p>
            </span>
          </div>

          <div className="w-full ml-4">
            <span className="flex-row flex">
              Pharm agreement number: <p>167771717</p>
            </span>
          </div>

          <div className="grid ml-4 w-full grid-cols-2">
            <span className="flex flex-row">
              Phone number: <p>0661895757</p>
            </span>
            <span className="flex flex-row">
              FAX: <p>value to fetch</p>
            </span>
          </div>
        </div>
      </div>

      {/* Info Prompt */}
      <div className="w-[85%] rounded-xl h-[3cm] flex flex-col gap-3 justify-center mx-auto mt-3">
        <span className={`text-2xl mx-2 font-bold ${textTheme}`}>
          Improve your website:
        </span>
        <p className="mx-3">
          Adding a new medicament or information will improve your website so do not miss it.
        </p>
      </div>

      {/* CTA Button (red kept as requested) */}
      <div className="w-[85%] rounded-xl relative justify-center items-center h-[1cm] mx-auto">
        <button className="w-full h-full rounded-xl font-bold text-1xl text-white bg-red-500 mt-2 hover:bg-red-400">
          Add information about your medicament
        </button>
      </div>
    </div>
  );
};
