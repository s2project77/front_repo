"use client";
import React from 'react';
import Image from 'next/image';
import { HeartPulse, Stethoscope, Clock, Award, CalendarCheck } from 'lucide-react';

export const Right_part = () => {
  const stats = [
    { icon: Stethoscope, label: "Patients Treated", value: "2,500+" },
    { icon: HeartPulse, label: "Successful Cases", value: "98%" },
    { icon: Clock, label: "Years Experience", value: "10+" },
    { icon: Award, label: "Specializations", value: "5" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-lg mx-auto space-y-8">
        
        {/* Hero Image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-blue-500/10 overflow-hidden">
            <div className="relative h-80">
              <Image
                src="/DOCTOR.svg" // Changed to doctor-themed image
                width={400}
                height={320}
                alt="Doctor's Office"
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Quality Healthcare</h3>
                <p className="text-white/90">Your trusted medical partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-blue-500/5 p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointments Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center text-white">
                <CalendarCheck size={20} />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Today's Appointments</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-600">10:30 AM - Routine Checkup</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmed</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">2:15 PM - Follow-up</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmed</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};