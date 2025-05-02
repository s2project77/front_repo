"use client";
import React from "react";

export default function EditProfile({
  doctorData,
  onChange,
  onImageUpload,
  onClick,
  onCancel,
  color, // Receiving color prop here
}) {
  // Define dynamic color classes
  const bgColorMap = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    // Add more colors as needed
  };

  const focusRingColorMap = {
    blue: "focus:ring-blue-500 focus:border-blue-500",
    green: "focus:ring-green-500 focus:border-green-500",
  };

  const buttonColorMap = {
    blue: "bg-blue-700 hover:bg-blue-800",
    green: "bg-green-700 hover:bg-green-800",
  };

  const background = bgColorMap[color] || "bg-gray-100"; // Default to gray if no color is passed
  const focusRingClasses = focusRingColorMap[color] || "focus:ring-green-500 focus:border-green-500"; // Default to green focus ring
  const buttonClasses = buttonColorMap[color] || "bg-green-700 hover:bg-green-800"; // Default to green button

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes (e.g., call an API)
    console.log("Updated Data:", doctorData);
    onClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col p-8 ${background} rounded-lg shadow-lg w-full mx-auto mt-4`}
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>

        <div className="flex items-center space-x-4">
          {/* Profile Image Preview */}
          {doctorData.image ? (
            <div className="relative">
              <img
                src={doctorData.image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md shadow-lg border border-gray-300"
              />
              {/* ❌ Remove Image Button */}
              <button
                onClick={() => onChange("image", null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {/* Custom File Input */}
          <label className={`cursor-pointer ${buttonClasses} text-white px-4 py-2 rounded-lg shadow-md`}>
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

      <label htmlFor="pharmacyName" className="block mb-2 font-medium">
        Pharmacy Name:
      </label>
      <input
        id="pharmacyName"
        type="text"
        value={doctorData?.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <label htmlFor="location" className="block mb-2 font-medium">
        Location:
      </label>
      <input
        id="location"
        type="text"
        value={doctorData?.location || ""}
        onChange={(e) => onChange("location", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <label htmlFor="firstName" className="block mb-2 font-medium">
        First Name:
      </label>
      <input
        id="firstName"
        type="text"
        value={doctorData?.FirstName || ""}
        onChange={(e) => onChange("owner.firstName", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <label htmlFor="lastName" className="block mb-2 font-medium">
        Last Name:
      </label>
      <input
        id="lastName"
        type="text"
        value={doctorData?.LastName || ""}
        onChange={(e) => onChange("owner.lastName", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <label htmlFor="phone" className="block mb-2 font-medium">
        Phone Number:
      </label>
      <input
        id="phone"
        type="text"
        value={doctorData?.phone || ""}
        onChange={(e) => onChange("contact.phone", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <label htmlFor="fax" className="block mb-2 font-medium">
        Fax:
      </label>
      <input
        id="fax"
        type="text"
        value={doctorData?.contact?.fax || ""}
        onChange={(e) => onChange("contact.fax", e.target.value)}
        className={`p-2 border rounded-md w-full mb-4 ${focusRingClasses} transition-all`}
      />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 ${buttonClasses} text-white rounded-md hover:bg-opacity-90 transition-all`}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
