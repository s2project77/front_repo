import UploadBox from "./UploadBox";

function UploadSection({ title, description, uploadBoxes, sectionIndex, onFileUpload ,color }) {
  return (
    <div className="space-y-1 mb-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="flex space-x-4">
        {uploadBoxes.map((box, boxIndex) => (
          <UploadBox
            key={boxIndex}
            label={box.label}
            uploaded={box.uploaded}
            sectionIndex={sectionIndex}
            boxIndex={boxIndex}
            onFileUpload={onFileUpload} 
            color = {color} // Pass color prop to UploadBox
          />
        ))}
      </div>
    </div>
  );
}

export default UploadSection;
