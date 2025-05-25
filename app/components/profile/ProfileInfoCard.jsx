"use client";
import Image from "next/image";
import React from "react";
import { MapPin, Phone, Mail, Award, Calendar, Star } from "lucide-react";

export default function ProfileInfoCard({ userData, color }) {
  const isDoctor = color === "blue";

  const colorClasses = {
    blue: {
      gradient: "from-blue-50 to-indigo-100",
      accent: "from-blue-500 to-indigo-600",
      ring: "ring-blue-500/20",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    green: {
      gradient: "from-emerald-50 to-green-100",
      accent: "from-emerald-500 to-green-600",
      ring: "ring-emerald-500/20",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.green;

  // Loading skeleton
  if (!userData) {
    return (
      <div className="p-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-48 bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="h-6 w-64 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image & Basic Info */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentColor.accent} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
            <Image
              src={"/surgeon-doctor-svgrepo-com.svg"}
              alt="Profile"
              width={160}
              height={160}
              className="relative rounded-full border-4 border-white shadow-2xl object-cover"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isDoctor 
                ? `Dr. ${userData.Firstname || 'John'} ${userData.Lastname || 'Doe'}`
                : userData.name || 'Medical Center Pharmacy'
              }
            </h2>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">
                  {isDoctor ? '4.8' : '4.6'} ({isDoctor ? '156' : '89'} reviews)
                </span>
              </div>
            </div>
            <div className={`inline-flex items-center px-4 py-2 ${currentColor.bg} ${currentColor.text} rounded-full text-sm font-medium`}>
              {isDoctor ? 'Medical Professional' : 'Licensed Pharmacy'}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="flex-1 space-y-6">
          {/* Contact Information */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gray-600" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${currentColor.bg} rounded-lg`}>
                  <Mail className={`w-4 h-4 ${currentColor.text}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium text-gray-900">{userData.email || "doctor@example.com"}</p>
                </div>
              </div>
              
              {!isDoctor && (
                <>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${currentColor.bg} rounded-lg`}>
                      <Phone className={`w-4 h-4 ${currentColor.text}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium text-gray-900">{userData.phone || "+1 (555) 123-4567"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${currentColor.bg} rounded-lg`}>
                      <MapPin className={`w-4 h-4 ${currentColor.text}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{userData.location || "123 Medical Street, Health City, HC 12345"}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-gray-600" />
              Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isDoctor ? (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Specialization</p>
                    <p className="font-medium text-gray-900">Internal Medicine</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">License Number</p>
                    <p className="font-medium text-gray-900">MD-12345678</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Years of Experience</p>
                    <p className="font-medium text-gray-900">12 Years</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Hospital Affiliation</p>
                    <p className="font-medium text-gray-900">City General Hospital</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Agreement Number</p>
                    <p className="font-medium text-gray-900">{userData.agreementNumber || "PH-2024-001234"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Operating Hours</p>
                    <p className="font-medium text-gray-900">8:00 AM - 10:00 PM</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Services Available</p>
                    <p className="font-medium text-gray-900">24/7 Emergency, Consultation</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Established</p>
                    <p className="font-medium text-gray-900">Since 2015</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isDoctor ? (
              <>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-gray-600">Patients Treated</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">2,156</p>
                  <p className="text-sm text-gray-600">Orders Fulfilled</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">890</p>
                  <p className="text-sm text-gray-600">Items in Stock</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}