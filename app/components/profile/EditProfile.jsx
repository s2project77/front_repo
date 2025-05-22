"use client";
import React from "react";

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
  const bgColorMap = {
    blue: "bg-blue-100",
    green: "bg-green-100",
  };

  const focusRingColorMap = {
    blue: "focus:ring-blue-500 focus:border-blue-500",
    green: "focus:ring-green-500 focus:border-green-500",
  };

  const buttonColorMap = {
    blue: "bg-blue-700 hover:bg-blue-800",
    green: "bg-green-700 hover:bg-green-800",
  };

  const background = bgColorMap[color] || "bg-gray-100";
  const focusRingClasses =
    focusRingColorMap[color] || "focus:ring-green-500 focus:border-green-500";
  const buttonClasses = buttonColorMap[color] || "bg-green-700 hover:bg-green-800";

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col p-8 ${background} rounded-lg shadow-lg w-full mx-auto mt-4`}
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        <div className="flex items-center space-x-4">
          {doctorData.image ? (
            <div className="relative">
              <img
                src={doctorData.image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md shadow-lg border border-gray-300"
              />
              <button
                onClick={() => onChange("image", null)}
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <label
            className={`cursor-pointer ${buttonClasses} text-white px-4 py-2 rounded-lg shadow-md`}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Doctor fields */}
      {isDoctor && (
        <>
          <label htmlFor="firstName" className="block mb-2 font-medium">
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            value={doctorData?.Firstname || ""}
            onChange={(e) => onChange("Firstname", e.target.value)}
            className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses}`}
            disabled={isLoading}
          />

          <label htmlFor="lastName" className="block mb-2 font-medium">
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            value={doctorData?.Lastname || ""}
            onChange={(e) => onChange("Lastname", e.target.value)}
            className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses}`}
            disabled={isLoading}
          />
        </>
      )}

      {/* Pharmacy fields */}
      {!isDoctor && (
        <>
          <label htmlFor="pharmacyName" className="block mb-2 font-medium">
            Pharmacy Name:
          </label>
          <input
            id="pharmacyName"
            type="text"
            value={doctorData?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses}`}
            disabled={isLoading}
          />
        </>
      )}

      {/* Shared email field */}
      <label htmlFor="email" className="block mb-2 font-medium">
        Email:
      </label>
      <input
        id="email"
        type="email"
        value={doctorData?.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses}`}
        disabled={isLoading}
      />

      {/* Pharmacy readonly extra info */}
      {!isDoctor && (
        <>
          <label htmlFor="location" className="block mb-2 font-medium">
            Location:
          </label>
          <input
            id="location"
            type="text"
            value={doctorData?.location || ""}
            onChange={(e) => onChange("location", e.target.value)}
            className={`p-2 border rounded-md w-full mb-4 bg-gray-100`}
          />

          <label htmlFor="phone" className="block mb-2 font-medium">
            Phone Number:
          </label>
          <input
            id="phone"
            type="text"
            value={doctorData?.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`p-2 border rounded-md w-full mb-4 bg-gray-100`}
          />
        </>
      )}

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 ${buttonClasses} text-white rounded-md disabled:opacity-50`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
