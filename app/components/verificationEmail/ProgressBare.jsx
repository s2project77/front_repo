import React from "react";

const ProgressBar = ({ currentStep }) => {
    const steps = ["Get Started", "Verify", "Finish Registration"];

    return (
        <div className="w-full md:w-5/6 sm:w-3/4 mx-auto flex items-center justify-between relative">
            {steps.map((step, index) => (
                <div key={index} className="relative flex flex-1 flex-col items-center">
                    
                    {/* Progress Line Before Step */}
                    {index > 0 && (
                        <div className={`absolute top-5 left-[-50%] w-full h-2 transition-all duration-300
                            ${index <= currentStep ? "bg-green-600" : "bg-gray-300"}`}>
                        </div>
                    )}

                    {/* Step Circle */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full text-white text-base font-bold
                        ${index <= currentStep ? "bg-green-500" : "bg-gray-300"}`}>
                        {index + 1}
                    </div>

                    {/* Step Label Below - Dim Before Active, Bold for Active */}
                    <div className={`mt-2 text-sm text-center transition-all duration-300 
                        ${index > currentStep ? "text-gray-400" : ""} 
                        ${index <= currentStep ? "font-bold text-black" : "text-gray-500"}`}>
                        {step}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
