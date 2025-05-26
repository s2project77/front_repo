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
  { id: 5, name: "Patients", link: "/medicine/patient", icon: Users }
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
    <div className="h-full w-full bg-white shadow-lg border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Doctor Hub</h2>
          <p className="text-sm text-gray-600">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {side_bar_data.map((item) => {
          const isActive = pathname.startsWith(item.link);
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600 border border-blue-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Add Prescription Section */}
    

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}