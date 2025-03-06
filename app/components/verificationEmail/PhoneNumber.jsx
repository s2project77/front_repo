"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Phone } from "lucide-react"; // Import Lucide Phone Icon

export default function PhoneNumber() {
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-2 w-full max-w-sm">
      {/* Title */}
      <h2 className="text-xl font-bold">Phone Number</h2>
      <p className="text-gray-600">Enter your phone number</p>

      {/* Phone Input Box */}
      <div className="relative border border-gray-300 rounded-lg flex items-center px-3 py-2 bg-gray-100">
        {/* Phone Input Component */}
        <PhoneInput
          country={"us"} // Default country
          value={phone}
          onChange={setPhone} // Updates phone state
          inputClass="!pl-14 !pr-10 !py-1 !w-full !border-none !outline-none !bg-gray-200 text-gray-700 text-lg"
          containerClass="!w-full"
          buttonClass="!border-none"
        />

        {/* Lucide Phone Icon (Right Side) */}
        <Phone className="absolute right-3 text-gray-500 w-5 h-5" />
      </div>
    </div>
  );
}
