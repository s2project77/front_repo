"use client";
import { useState } from "react";
import UploadSection from "../../components/verificationEmail/UploadSection";
import ProgressBar from "../../components/verificationEmail/ProgressBare";
import Descreption from "../../components/verificationEmail/Descreption";
import PhoneNumber from "../../components/verificationEmail/PhoneNumber";
import SaveButton from "../../components/verificationEmail/SaveButton";

export default function VerificationPage({clolor = "blue"}) {
  const [uploadSections, setUploadSections] = useState([
    {
      title: "ID card",
      description: "Take a photo of your ID card",
      uploadBoxes: [
        { label: "Front side", uploaded: false },
        { label: "Back side", uploaded: false },
      ],
    },
    {
      title: "Pharm agreement",
      description: "Scan your Pharm agreement",
      uploadBoxes: [{ label: "size of 500 ko max", uploaded: false }],
    },
    {
      title: "Your Face",
      description: "Take a photo of your face",
      uploadBoxes: [{ label: "size of 500 ko max", uploaded: false }],
    },
    {
      title: "Pharm Picture",
      description: "Take a picture of your Pharm",
      uploadBoxes: [
        { label: "Inside", uploaded: false },
        { label: "Outside", uploaded: false },
      ],
    },
  ]);

  const [color, setColor] = useState("green"); // Dynamic color state

  const handleFileUpload = (sectionIndex, boxIndex, file) => {
    console.log("Uploading file for:", { sectionIndex, boxIndex, file });

    setUploadSections((prevSections) =>
      prevSections.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;

        return {
          ...section,
          uploadBoxes: section.uploadBoxes.map((box, bIndex) => {
            if (bIndex !== boxIndex) return box;
            return { ...box, uploaded: true };
          }),
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ProgressBar currentStep={1} color={'blue'} /> {/* Pass color */}
      <div className="container flex justify-center space-x-8 mt-8">
        <Descreption color={"blue"} /> {/* Pass color */}
        <div className="w-[2px] h-auto bg-gray-400"></div>
        <div id="files">
          {uploadSections.map((section, sectionIndex) => (
            <UploadSection
              key={sectionIndex}
              title={section.title}
              description={section.description}
              uploadBoxes={section.uploadBoxes}
              sectionIndex={sectionIndex}
              onFileUpload={handleFileUpload}
              color={'blue'}
            />
          ))}
          <PhoneNumber color={color} /> {/* Pass color */}
          <div className="flex justify-end mt-6">
            <SaveButton color={'blue'} className="bg-green-100 text-green-900 px-6 py-2 rounded-md hover:bg-green-200 transition">
              Save
            </SaveButton> {/* Pass color */}
          </div>
        </div>
      </div>
    </div>
  );
}
