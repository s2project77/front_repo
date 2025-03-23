export default function EditProfile({
  pharmacyData,
  onChange,
  onImageUpload,
  onClick,
  onCancel,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes (e.g., call an API)
    console.log("Updated Data:", pharmacyData);
    onClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-8 bg-green-100 rounded-lg shadow-lg w-full mx-auto mt-4"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>

        <div className="flex items-center space-x-4">
          {/* Profile Image Preview */}
          {pharmacyData.image ? (
            <div className="relative">
              <img
                src={pharmacyData.image}
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
          <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
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
        value={pharmacyData?.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />

      <label htmlFor="location" className="block mb-2 font-medium">
        Location:
      </label>
      <input
        id="location"
        type="text"
        value={pharmacyData?.location || ""}
        onChange={(e) => onChange("location", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
      />

      <label htmlFor="firstName" className="block mb-2 font-medium">
        First Name:
      </label>
      <input
        id="firstName"
        type="text"
        value={pharmacyData?.owner?.firstName || ""}
        onChange={(e) => onChange("owner.firstName", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
      />

      <label htmlFor="lastName" className="block mb-2 font-medium">
        Last Name:
      </label>
      <input
        id="lastName"
        type="text"
        value={pharmacyData?.owner?.lastName || ""}
        onChange={(e) => onChange("owner.lastName", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
      />

      <label htmlFor="phone" className="block mb-2 font-medium">
        Phone Number:
      </label>
      <input
        id="phone"
        type="text"
        value={pharmacyData?.contact?.phone || ""}
        onChange={(e) => onChange("contact.phone", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
      />

      <label htmlFor="fax" className="block mb-2 font-medium">
        Fax:
      </label>
      <input
        id="fax"
        type="text"
        value={pharmacyData?.contact?.fax || ""}
        onChange={(e) => onChange("contact.fax", e.target.value)}
        className="p-2 border rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
