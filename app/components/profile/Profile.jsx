"use client";
import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { Bell, Pencil } from "lucide-react";
import Image from "next/image";
import EditProfile from "./EditProfile";

export default function Profile({ color }) {
  const initialData = {
    name: "Green Life Pharmacy",
    location: "123 Main Street, Casablanca",
    userId: "PH-20240321",
    owner: {
      firstName: "Ahmed",
      lastName: "El Khattabi",
    },
    agreementNumber: "PH-AG-2024-987654",
    contact: {
      phone: "+212 600 123 456",
      fax: "+212 522 654",
    },
    image: null, // Add image field
  };

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(initialData);
  const [pharmacyData, setPharmacyData] = useState(initialData);

  const handleChange = (propertyPath, value) => {
    setPharmacyData((prevState) => {
      const updatedData = structuredClone(prevState); 
      const keys = propertyPath.split(".");
      let current = updatedData;

      keys.slice(0, -1).forEach((key) => {
        current = current[key];
      });

      current[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPharmacyData((prevState) => ({
          ...prevState,
          image: reader.result, // Store image as base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setPharmacyData(originalData); 
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (pharmacyData !== originalData) {
      setOriginalData(structuredClone(pharmacyData));
    }
    setIsEditing(true);
  };

  // Map color prop to background
  const bgColorMap = {
    blue: "bg-blue-200",
    green: "bg-green-200",
    red: "bg-red-200",
    // Add more colors as needed
  };



  return (
    <div className={`flex flex-col p-8 gap-8`}>
      <button className="self-end">
        <Bell color={color} size="36" />
      </button>
      <div className="flex gap-2 items-center">
        <Image src="/profile2.svg" alt="profile" width="30" height="30" />
        <h3 className={`text-${color}-800 text-xl font-semibold`}>
          {isEditing ? `Edit Profile (${color.charAt(0).toUpperCase() + color.slice(1)})` : `Profile (${color.charAt(0).toUpperCase() + color.slice(1)})`}
        </h3>
      </div>

      {isEditing ? (
        <EditProfile
          pharmacyData={pharmacyData}
          onClick={() => setIsEditing(false)}
          onCancel={handleCancel}
          onChange={handleChange}
          onImageUpload={handleImageUpload}
          color={color}
        />
      ) : (
        <ProfileInfoCard color={color} pharmacyData={pharmacyData} />
      )}

      <button 
        onClick={handleEdit} 
        className={`bg-${color}-100 w-fit py-2 px-6 rounded-lg shadow-lg text-gray-500 self-end hover:bg-${color}-500 hover:text-white`}>
        <div className="flex gap-4 items-center">
          <p>Edit</p>
          <Pencil />
        </div>
      </button>
    </div>
  );
}
