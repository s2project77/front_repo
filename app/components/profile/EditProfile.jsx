"use client";
import React from "react";
import { Upload, X, Save, X as Cancel, Camera } from "lucide-react";

export default function EditProfile({
  doctorData,
  onChange,
  onImageUpload,
  onClick,
  onCancel,
  color,
  isLoading,
  isDoctor,
}) {
  const colorClasses = {
    blue: {
      gradient: "from-blue-50 to-indigo-100",
      accent: "from-blue-500 to-indigo-600",
      button:
        "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      focus: "focus:ring-blue-500/20 focus:border-blue-500",
      text: "text-blue-600",
    },
    green: {
      gradient: "from-emerald-50 to-green-100",
      accent: "from-emerald-500 to-green-600",
      button:
        "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      focus: "focus:ring-emerald-500/20 focus:border-emerald-500",
      text: "text-emerald-600",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.green;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Your Profile
          </h2>
          <p className="text-gray-600">
            Update your information to keep your profile current
          </p>
        </div>

        {/* Image Upload */}
        <div
          className={`bg-gradient-to-r ${currentColor.gradient} rounded-2xl p-8 border border-gray-200`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Profile Picture
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              {doctorData.image ? (
                <div className="relative">
                  <img
                    src={doctorData.image}
                    alt="Profile Preview"
                    className="w-40 h-40 object-cover rounded-2xl shadow-xl border-4 border-white"
                  />
                  <button
                    onClick={() => onChange("image", null)}
                    type="button"
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <label
                className={`flex items-center justify-center px-6 py-4 ${currentColor.button} text-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-600 text-center">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isDoctor ? (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={doctorData?.Firstname || ""}
                    onChange={(e) => onChange("Firstname", e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${currentColor.focus} transition-all duration-200 hover:border-gray-400`}
                    placeholder="Enter your first name"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={doctorData?.Lastname || ""}
                    onChange={(e) => onChange("Lastname", e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${currentColor.focus} transition-all duration-200 hover:border-gray-400`}
                    placeholder="Enter your last name"
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="pharmacyName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Pharmacy Name
                </label>
                <input
                  id="pharmacyName"
                  type="text"
                  value={doctorData?.name || ""}
                  onChange={(e) => onChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${currentColor.focus} transition-all duration-200 hover:border-gray-400`}
                  placeholder="Enter pharmacy name"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Email Field */}
            <div className={`space-y-2 ${isDoctor ? "" : "md:col-span-2"}`}>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={doctorData?.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${currentColor.focus} transition-all duration-200 hover:border-gray-400`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            {/* Phone Number */}
            <div className={`space-y-2 ${isDoctor ? "" : "md:col-span-2"}`}>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={doctorData?.phone || ""}
                onChange={(e) => onChange("phone", e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${currentColor.focus} transition-all duration-200 hover:border-gray-400`}
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            <Cancel className="w-4 h-4 mr-2" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 ${currentColor.button} text-white rounded-xl transition`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
