import React from "react";
import Image from "next/image";
import search from "../search.svg";
export const Middle_part = ({ themeColor = "green", userData }) => {
  const textTheme = `text-${themeColor}-600`;
  const bgTheme = `bg-${themeColor}-100`;
  const borderTheme = `border-${themeColor}-300`;

  return (
    <div className="min-h-screen border shadow-md   p-3 m-2 mx-3  bg-gray-100 rounded-lg max-h-screen flex flex-col gap-3 pt-6 relative items-center">
      {/* Search Box */}
      <div className="w-[85%]  rounded-xl flex flex-row relative justify-center items-center h-[2cm] mx-auto">
        <span className="text-2xl text-blue-500 absolute left-8">
          {" "}
          <Image
            src={search}
            className="pt-2 pl-2"
            width={30}
            height={20}
            alt="0"
          ></Image>
        </span>
        <input
          type="text"
          className="w-[86%] shadow-md h-[68%] mt-2 ml-3 pl-10 py-3 border-gray-300 border rounded-xl"
          placeholder="Search For Medicament"
        />
        <span className="pr-3 font-bold text-2xl justify-center mb-2 h-6 w-10 text-yellow-500"></span>
      </div>

      {/* Info Box */}
      <div
        className={`w-[85%] ${bgTheme} ${borderTheme} border shadow-xl   shadow-gray-300 rounded-xl flex bg-white flex-col gap-2 relative h-[7cm] mx-auto mt-3`}
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
              <li className="text-left">{ userData.name}</li>
              <li className="text-left">{userData.location}</li>
              <li className="text-left">User reference: DZ-19</li>
            </ul>
          </div>
        </div>

        <div className="flex relative w-full h-full flex-col gap-4 flex-1">
          <div className="grid w-full ml-4 grid-cols-2 gap-5">
            <span className="flex flex-row gap-2">
              email: <p>{userData?.email || "Unknown"}</p>
            </span>
          </div>

          <div className="w-full ml-4">
            <span className="flex-row flex">
              Pharm agreement number: <p></p>
            </span>
          </div>

          <div className="grid ml-4 w-full grid-cols-2">
            <span className="flex flex-row">
              Phone number: <p>{ userData.phone}</p>
            </span>
            <span className="flex flex-row">
              FAX: <p>value to fetch</p>
            </span>
          </div>
        </div>
      </div>

      {/* Info Prompt */}
      <div className="w-[85%] rounded-xl h-[3cm] flex flex-col border shadow-lg  bg-white gap-3 justify-center mx-auto mt-3">
        <span className={`text-2xl mx-2 font-bold ${textTheme}`}>
          Improve your website
        </span>
        <p className="mx-3">
          Adding a new medicament or information will improve your website so do
          not miss it. and enjoy
        </p>
      </div>

      {/* CTA Button (red kept as requested) */}
      <div className="w-[85%] rounded-xl relative justify-center items-center h-[1cm] mx-auto">
        <button className="w-[65%] flex text-slate-700         bg-green-200 shadow-lg  p-5  items-center content-center text-center  mx-auto justify-center  h-full rounded-xl font-bold text-1xl  mt-2 hover:bg-green-400">
          <span className="mr-10">
            {" "}
            <Image
              src={"add-icon-svgrepo-com.svg"}
              width={20}
              height={20}
              alt=" 4d"
            ></Image>{" "}
          </span>{" "}
          Add information about your medicament
        </button>
      </div>
    </div>
  );
};
