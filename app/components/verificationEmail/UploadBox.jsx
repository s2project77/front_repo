import NextImage from "next/image";

const UploadBox = ({ label, uploaded, sectionIndex, boxIndex, onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(sectionIndex, boxIndex, file); // تمرير القسم والصندوق الصحيحين
    }
  };

  return (
    <button
      className="w-64 h-40 border-2 border-dashed border-gray-400 bg-teal-50 rounded-lg flex flex-col items-center justify-center p-3 relative cursor-pointer"
      onClick={() => document.getElementById(`upload-${sectionIndex}-${boxIndex}`).click()}
    >
      <p className="text-gray-600 font-medium">{label}</p>

      {/* Input File (Hidden) */}
      <input
        type="file"
        className="hidden"
        id={`upload-${sectionIndex}-${boxIndex}`}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.pdf"
      />

      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg shadow-md ${
          uploaded ? "bg-green-200" : "bg-slate-200"
        }`}
      >
        {uploaded ? (
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        ) : (
          <NextImage src="/UploadIcon.png" alt="Upload Icon" width={24} height={24} />
        )}
      </div>

      <p className="text-gray-500 text-sm mt-2">Drop file here or upload</p>

      {/* File Type Tags */}
      <div className="flex space-x-2 mt-2">
        <span className="bg-white border px-2 py-1 text-xs rounded-md">PNG</span>
        <span className="bg-white border px-2 py-1 text-xs rounded-md">JPG</span>
        <span className="bg-white border px-2 py-1 text-xs rounded-md">PDF</span>
      </div>
    </button>
  );
};

export default UploadBox;
