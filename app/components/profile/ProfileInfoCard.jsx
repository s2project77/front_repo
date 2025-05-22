"use client";
import Image from "next/image";
import React from "react";

export default function ProfileInfoCard({ userData, color }) {
  const bgColorMap = {
    blue: "bg-blue-100",
    green: "bg-green-200",
  };

  const background = bgColorMap[color] || "bg-green-200";

  const isDoctor = color === "blue";

  if (!userData) {
    return (
      <div className={`flex p-8 rounded-lg shadow-lg animate-pulse ${background}`}>
        <div className="w-full space-y-6">
          <div className="flex gap-8 items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row p-4 md:p-8 ${background} rounded-lg shadow-lg`}>
      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={userData.image || "/profile2.svg"}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left space-y-2">
            {isDoctor ? (
              <>
                <p className="text-lg font-semibold text-gray-800">
                  First Name:{" "}
                  <span className="font-normal text-gray-700">
                    {userData.Firstname || "N/A"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Last Name:{" "}
                  <span className="font-normal text-gray-700">
                    {userData.Lastname || "N/A"}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-800">
                Pharmacy Name:{" "}
                <span className="font-normal text-gray-700">
                  {userData.name || "N/A"}
                </span>
              </p>
            )}
            <p className="text-lg font-semibold text-gray-800">
              Email:{" "}
              <span className="font-normal text-gray-700">{userData.email || "N/A"}</span>
            </p>
          </div>
        </div>

        {!isDoctor && (
          <div className="space-y-2 text-gray-800">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              <span className="text-gray-700">{userData.location || "Unknown location"}</span>
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              <span className="text-gray-700">{userData.phone || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold">Pharm Agreement Number:</span>{" "}
              <span className="text-gray-700">{userData.agreementNumber || "N/A"}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
