"use client";
import {
  Database,
  Archive,
  User,
  MapPin,
  PlusCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  Settings
} from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import ImageUploader from './input_file';

const side_bar_data = [
  { id: 1, name: "Dashboard", link: "/mainpage", icon: Home },
  { id: 2, name: "Medications", link: "/Documentation", icon: Database },
  { id: 3, name: "myStock", link: "/myStock", icon: Archive },
  { id: 4, name: "Profile", link: "/profile", icon: User },
];

export const Side_bar = ({ color = 'emerald' }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/pharmacy");
  };

  return (
    <div className="h-screen bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl shadow-emerald-500/5 flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white">
            <Database size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Pharmacy Hub</h2>
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
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Add Medication Section */}
      <div className="px-4 py-4 border-t border-gray-100">
        <Link
          href="/addmedicament"
          
          className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-emerald-50 transition-colors text-emerald-600"
        >
          <div className="flex items-center space-x-3">
            <PlusCircle size={20} />
            <span className="font-medium">Quick Add</span>
          </div>
        </Link>
      
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
};
