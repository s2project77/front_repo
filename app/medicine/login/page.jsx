"use client";
import { FaArrowLeft, FaEye, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint when available
      const apiUrl = "http://localhost:3001/api/doctors/login"; // This will be replaced later
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // If login successful
      console.log("Login successful:", data);
      
      // Store token or user info if needed
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      // Move to success step
      setCurrentStep(3);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen overflow-hidden">
      <div className="md:w-2/5 text-black p-5 flex-col min-h-screen h-full md:flex hidden bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="flex flex-col p-1">
          <h1 className="flex font-bold text-white">PHARMANET</h1>
          <div className="text-white">
            <Link
              href="/regestration"
              className="gap-4 font-bold inline-flex items-center"
            >
              <FaArrowLeft />
              back to web site
            </Link>
          </div>
        </div>
        <div className="flex mb-10 flex-col flex-1 items-center justify-center">
          <div className="text-center flex flex-col">
            <div className="text-blue-400 text-9xl mb-9 mx-auto items-center justify-center">
              <FaPlus className="drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]" />
            </div>

            <h2 className="text-3xl text-white font-bold text-center mt-6">
              Join Our
            </h2>
            <h2 className="text-3xl text-white font-bold text-center">
              Pharmacy Network
            </h2>
            <p className="text-blue-200 text-lg text-center mt-4 max-w-xs">
              Access your prescriptions, manage medications, and connect with
              healthcare professionals
            </p>
          </div>
        </div>
        <div className="text-white">
          © 2025 PharmaNet. All rights reserved.
        </div>
      </div>

      <div className="flex items-center md:w-3/5 w-full flex-col">
        {currentStep === 1 && (
          <div className="w-full max-w-lg m-auto p-6">
            <div className="flex flex-col mb-9 m-auto gap-2">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                WELCOME BACK
              </h1>
              <p className="text-gray-600">
                Please enter your details to access your account
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-4"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-4 text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <FaEye />
                    </button>
                  </div>
                  <p className="text-right text-blue-600 mt-2 cursor-pointer">
                    Forgot password?
                  </p>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 text-white font-bold bg-blue-600 rounded-[10px] hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/regestration" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center m-auto py-8 p-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Login Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              You are now logged in. You can access all our pharmacy services.
            </p>

            <Link
              href="./mainpage"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Main Page
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}