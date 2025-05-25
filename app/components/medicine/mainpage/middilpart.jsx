"use client";
import React from "react";
import Image from "next/image";
import { Search, MapPin, Phone, Mail, FileText, Plus, Stethoscope, ClipboardList } from "lucide-react";

export const Middle_part = ({ themeColor = "blue", userData }) => {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Modern Search Box */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-blue-500/10 p-1">
          <div className="flex items-center space-x-4 px-4 py-3">
            <Search className="text-blue-500 flex-shrink-0" size={20} />
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-lg"
              placeholder="Search for patients or conditions..."
            />
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 cursor-pointer">
              Search
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Doctor Info Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-blue-500/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <div className="p-8">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/surgeon-doctor-svgrepo-com.svg"
                  width={96}
                  height={96}
                  alt="Doctor Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Dr. {userData?.Firstname || "First"} {userData?.Lastname || "Last"}
                  </h2>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    MD
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Stethoscope size={16} />
                  <span>{userData?.specialization || "General Practitioner"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                  <Mail className="text-blue-500" size={18} />
                  <span className="text-gray-700">{userData?.email || "doctor@example.com"}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                  <Phone className="text-blue-500" size={18} />
                  <span className="text-gray-700">{userData?.phone || "+1234567890"}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                  <ClipboardList className="text-blue-500" size={18} />
                  <span className="text-gray-700">License: MD-{userData?.licenseNumber || "12345"}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                  <FileText className="text-blue-500" size={18} />
                  <span className="text-gray-700">Hospital: {userData?.hospital || "City General"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Info Prompt */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
              <Stethoscope className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enhance Patient Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep your patient records updated for better diagnosis and treatment. 
                Timely documentation improves healthcare outcomes and patient satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Button */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <button className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] transform">
          <div className="flex items-center justify-center space-x-3">
            <Plus size={20} />
            <span className="text-lg">Add Patient Record</span>
          </div>
        </button>
      </div>
    </div>
  );
};