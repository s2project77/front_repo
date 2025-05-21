"use client";
import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { Bell, Pencil } from "lucide-react";
import Image from "next/image";
import EditProfile from "./EditProfile";

export default function Profile({ color = "green", userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(userData || {});

  // Handle nested property updates safely
  const handleChange = (propertyPath, value) => {
    setDoctorData(prev => {
      const keys = propertyPath.split(".");
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPharmacyData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const colorClasses = {
    blue: {
      text: "text-blue-800",
      button: "bg-blue-100 hover:bg-blue-500",
      icon: "text-blue-800",
    },
    green: {
      text: "text-green-800",
      button: "bg-green-100 hover:bg-green-500",
      icon: "text-green-800",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="flex flex-col p-8 gap-8">
      {/* Notification Bell */}
      <button className="self-end">
        <Bell color={color} size="36" />
      </button>

      {/* Header */}
      <div className="flex gap-2 items-center">
        <Image src="/profile2.svg" alt="profile" width="30" height="30" />
        <h3 className={`${currentColor.text} text-xl font-semibold`}>
          {isEditing ? "Edit Profile" : "Profile Information"}
        </h3>
      </div>

      {/* Main Content */}
      {isEditing ? (
        <EditProfile
          doctorData={doctorData}
          onClick={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
          onChange={handleChange}
          onImageUpload={handleImageUpload}
          color={color}
        />
      ) : (
        <ProfileInfoCard color={color} userData={doctorData} />
      )}

      {/* Edit Button */}
      <button
        onClick={handleEditToggle}
        className={`${currentColor.button} w-fit py-2 px-6 rounded-lg shadow-lg text-gray-500 self-end hover:text-white`}
      >
        <div className="flex gap-4 items-center">
          <p>Edit</p>
          <Pencil />
        </div>
      </button>
    </div>
  );
}
