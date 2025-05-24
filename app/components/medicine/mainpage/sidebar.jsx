"use client";

import {
  Database,
  Archive,
  Users,
  PlusCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  User
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ImageUploader from "../../mainpage/input_file";

const side_bar_data = [
  { id: 1, name: "Main Page", link: "/medicine/mainpage", icon: Home },
  { id: 2, name: "Medicament Documents", link: "/medicine/Documentation", icon: Database },
  { id: 3, name: "Archive", link: "/medicine/archive", icon: Archive },
  { id: 4, name: "Profile", link: "/medicine/profile", icon: User },
  { id: 5, name: "Patients", link: "/medicine/patient", icon: Users } // Changed from User to Users for better distinction
];

export default function Side_bar() {
  const [showUploader, setShowUploader] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="h-screen bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl shadow-blue-500/5 flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
            <Database size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Doctor Hub</h2>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {side_bar_data.map((item) => {
          const isActive = pathname.startsWith(item.link);
          return (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Add Prescription Section */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-blue-50 transition-colors text-blue-600"
        >
          <div className="flex items-center space-x-3">
            <PlusCircle size={20} />
            <span className="font-medium">Quick Add</span>
          </div>
          {showUploader ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        
        {showUploader && (
          <div className="mt-3 p-4 bg-gray-50 rounded-xl">
            <ImageUploader />
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
