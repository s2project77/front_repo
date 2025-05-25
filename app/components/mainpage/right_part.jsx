// Enhanced Right Part Component
import React from 'react';
import Image from 'next/image';
import { Heart, Users, Clock, Award } from 'lucide-react';


export const Right_part = () => {
  const stats = [
    { icon: Users, label: "Patients Served", value: "1,200+" },
    { icon: Heart, label: "Medications", value: "850+" },
    { icon: Clock, label: "Years Experience", value: "15+" },
    { icon: Award, label: "Certifications", value: "12" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="max-w-lg mx-auto space-y-8">
        
        {/* Hero Image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-emerald-500/10 overflow-hidden">
            <div className="relative h-80">
              <Image
                src="/zzino-logo.svg"
                width={400}
                height={320}
                alt="Pharmacy"
                className="w-full h-full object-cover"
                content="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Modern Healthcare</h3>
                <p className="text-white/90">Your trusted pharmacy partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-emerald-500/5 p-6 text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-purple-500/10 p-6 text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Need Assistance?</h4>
            <p className="text-gray-600 mb-4">Our team is here to help you 24/7</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};