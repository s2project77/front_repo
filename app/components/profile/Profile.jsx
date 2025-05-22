"use client";
import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { Bell, Pencil } from "lucide-react";
import Image from "next/image";
import EditProfile from "./EditProfile";

export default function Profile({ color = "green", userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(userData || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isDoctor = color === "blue";

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
        setDoctorData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let url = "";
      let body = {};

      if (isDoctor) {
        url = "http://192.168.103.88:3001/api/doctors/updateinfo";
        body = {
          Firstname: doctorData.Firstname,
          Lastname: doctorData.Lastname,
          email: doctorData.email,
        };
      } else {
        url = "http://192.168.103.88:3001/api/pharmacies/updateinfo";
        body = {
          name: doctorData.name,
          email: doctorData.email,
          location: doctorData.location,
          phone: doctorData.phone,
        };
      }

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await response.json();
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = isDoctor
        ? "http://192.168.103.88:3001/api/doctors/deleteDoctor"
        : "http://192.168.103.88:3001/api/pharmacies/deletePharmacie";

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      localStorage.removeItem("token");
      alert("Your profile has been deleted successfully.");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Main Content */}
      {isEditing ? (
        <EditProfile
          doctorData={doctorData}
          onClick={handleSaveChanges}
          onCancel={() => setIsEditing(false)}
          onChange={handleChange}
          onImageUpload={handleImageUpload}
          color={color}
          isLoading={isLoading}
          isDoctor={isDoctor}
        />
      ) : (
        <ProfileInfoCard color={color} userData={doctorData} />
      )}

      {/* Buttons */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={handleEditToggle}
            className={`${currentColor.button} py-2 px-6 rounded-lg shadow-lg text-gray-500 hover:text-white`}
          >
            <div className="flex gap-4 items-center">
              <p>Edit</p>
              <Pencil />
            </div>
          </button>

          <button
            onClick={handleDeleteProfile}
            disabled={isLoading}
            className="bg-red-100 hover:bg-red-500 py-2 px-6 rounded-lg shadow-lg text-red-600 hover:text-white disabled:opacity-50"
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
}
