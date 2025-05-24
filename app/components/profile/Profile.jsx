"use client";
import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { Bell, Pencil, Trash2, User, Shield } from "lucide-react";
import Image from "next/image";
import EditProfile from "./EditProfile";

export default function Profile({ color = "green", userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(userData || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isDoctor = color === "blue";

  // Static data for demonstration
  const staticStats = {
    doctor: {
      totalPatients: 1247,
      appointmentsToday: 8,
      reviewsCount: 156,
      rating: 4.8
    },
    pharmacy: {
      totalOrders: 2156,
      pendingOrders: 12,
      stockItems: 890,
      rating: 4.6
    }
  };

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
      gradient: "from-blue-50 to-indigo-100",
      accent: "from-blue-500 to-indigo-600",
      button: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      icon: "text-blue-600",
      ring: "ring-blue-500/20",
      shadow: "shadow-blue-500/25",
    },
    green: {
      gradient: "from-emerald-50 to-green-100",
      accent: "from-emerald-500 to-green-600",
      button: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      icon: "text-emerald-600",
      ring: "ring-emerald-500/20",
      shadow: "shadow-emerald-500/25",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.green;
  const stats = isDoctor ? staticStats.doctor : staticStats.pharmacy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${currentColor.accent} shadow-lg ${currentColor.shadow}`}>
              {isDoctor ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Shield className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? "Edit Profile" : "Profile Dashboard"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isDoctor ? "Manage your medical practice" : "Manage your pharmacy"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className={`relative p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 group`}>
              <Bell className={`w-6 h-6 ${currentColor.icon} group-hover:scale-110 transition-transform`} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, value], index) => (
            <div key={key} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof value === 'number' && key.includes('rating') ? value.toFixed(1) : value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${currentColor.accent} shadow-lg ${currentColor.shadow}`}>
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
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
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              onClick={handleEditToggle}
              className={`group px-8 py-4 ${currentColor.button} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-center space-x-3">
                <Pencil className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Edit Profile</span>
              </div>
            </button>

            <button
              onClick={handleDeleteProfile}
              disabled={isLoading}
              className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center space-x-3">
                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Delete Profile</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}