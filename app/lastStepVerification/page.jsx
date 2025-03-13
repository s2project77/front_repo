"use client";
import { useState } from "react";
import DescriptionBox from "../components/verificationEmail/DescriptionBox";
import WorkHourBox from "../components/verificationEmail/WorkHourBox";
import ProgressBar from "../components/verificationEmail/ProgressBare";

export default function Page() {
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleDescriptionChange = (index, value) => {
    if (index === 1) {
      setDescription1(value);
    } else {
      setDescription2(value);
    }
  };

  const handleWorkHoursToggle = () => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setFromTime("");
      setToTime("");
    }
  };

  const handleTimeChange = (type, value) => {
    if (type === "from") {
      setFromTime(value);
    } else {
      setToTime(value);
    }
    console.log(`${type} time changed to:`, value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ProgressBar currentStep={2} />
      <h2 className="text-green-800 font-bold text-4xl text-center mt-24">
        Complete Your Profile
      </h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-12">
        <div className="w-full sm:w-auto">
          <DescriptionBox
            title="ADD DESCRIPTION"
            description={description1}
            setDescription={(value) => handleDescriptionChange(1, value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <WorkHourBox
            isChecked={isChecked}
            toggleChecked={handleWorkHoursToggle}
            fromTime={fromTime}
            setFromTime={(value) => handleTimeChange("from", value)}
            toTime={toTime}
            setToTime={(value) => handleTimeChange("to", value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <DescriptionBox
            title="ADD DESCRIPTION"
            description={description2}
            setDescription={(value) => handleDescriptionChange(2, value)}
          />
        </div>
          </div>
          <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-lg px-6 py-3 me-2 mb-2 mt-6 w-1/12 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>

    </div>
  );
}
