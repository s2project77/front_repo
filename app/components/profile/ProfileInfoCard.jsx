"use client";
import Image from "next/image";
import React from "react";

export default function ProfileInfoCard({ pharmacyData }) {
  if (!pharmacyData) {
    return (
      <div className="flex p-8 bg-green-200 rounded-lg shadow-lg animate-pulse">
        <div className="w-4/6 space-y-6">
          <div className="flex gap-8 items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
              <div className="h-4 w-56 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 w-64 bg-gray-300 rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 bg-green-200 rounded-lg shadow-lg">
      <div className="w-full md:w-4/6 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <Image
            src={pharmacyData.image || "/profile2.png"}
            alt="profile"
            width="150"
            height="150"
            className="bg-white"
          />
          <div className="space-y-2 text-lg text-center md:text-left">
            <h4 className="font-semibold text-xl">{pharmacyData.name}</h4>
            <p>{pharmacyData.location}</p>
            <p>User Reference ID: {pharmacyData.userId}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p>
            First Name : <span>{pharmacyData.owner?.firstName || "N/A"}</span>
          </p>
          <p>
            Last Name : <span>{pharmacyData.owner?.lastName || "N/A"}</span>
          </p>
        </div>
        <p>
          Pharm Agreement Number : <span>{pharmacyData.agreementNumber || "N/A"}</span>
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p>
            Phone number : <span>{pharmacyData.contact?.phone || "N/A"}</span>
          </p>
          <p>
            Fax : <span>{pharmacyData.contact?.fax || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}