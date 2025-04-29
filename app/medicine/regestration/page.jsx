// pages/register.js
"use client";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formDataRegistration, setFormDataRegistration] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const nextStep = () => {
    setCurrentStep((c) => c + 1);
  };

  const prevStep = () => {
    setCurrentStep((c) => c - 1);
  };

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setFormDataRegistration({
      ...formDataRegistration,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const response = await fetch('http://192.168.124.229:4000/api/doctors/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataRegistration),
        credentials: "include"
      });
      console.log(token)
      if (response.ok) {
        setCurrentStep(3); // Move to success page only after successful API call
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed. Please try again.');
        
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Join Our Medicine Network - Registration</title>
        <meta
          name="description"
          content="Create an account to join our pharmacy network and access exclusive benefits."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-blue-900 to-blue-700 flex-col justify-between p-8">
          <div>
            <div className="text-white text-2xl font-bold">MEDICNET</div>
            <Link
              href="/"
              className="inline-flex items-center text-white hover:text-blue-200 mt-4 text-sm transition-all"
            >
              <FaArrowLeft className="mr-2" /> Back to Website
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="text-blue-400 mb-8">
              <div className="text-9xl flex justify-center items-center">
                <FaPlus className="drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]" />
              </div>
            </div>
            <h2 className="text-3xl text-white font-bold text-center mt-6">
              Join Our
            </h2>
            <h2 className="text-3xl text-white font-bold text-center">
              Medicine Network
            </h2>
            <p className="text-blue-200 text-lg text-center mt-4 max-w-xs">
              Gain access to exclusive benefits and connect with healthcare
              professionals
            </p>
          </div>

          <div className="text-blue-200 text-sm">
            © 2025 MedicNet. All rights reserved.
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-3/5 bg-white p-6 md:p-12 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="./login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 p-4 mb-6 rounded-md border-l-4 border-red-500 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Progress Bar */}
            {currentStep < 3 && (
              <div className="flex mb-8">
                <div
                  className={`h-1 flex-1 ${
                    currentStep >= 1 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 ${
                    currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="Firstname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="Firstname"
                        name="Firstname"
                        required
                        value={formDataRegistration.Firstname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Lastname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="Lastname"
                        name="Lastname"
                        required
                        value={formDataRegistration.Lastname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formDataRegistration.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Account Setup */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    Account Setup
                  </h2>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        minLength="8"
                        value={formDataRegistration.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formDataRegistration.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500 text-sm text-gray-600 mt-6">
                    Your personal information is secure with us. We'll only use
                    your data in accordance with our privacy policy to provide
                    you with healthcare services.
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formDataRegistration.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        terms & conditions
                      </a>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="pt-4 flex space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/3 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {currentStep === 3 && (
                <div className="text-center py-8">
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
                    Registration Successful!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Your account has been created. You can now access all our
                    healthcare services.
                  </p>

                  <Link
                    href="./mainpage"
                    className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Go to Main Page
                  </Link>
                </div>
              )}
            </form>

            {/* Social Login */}
            {currentStep === 1 && (
              <div className="mt-8">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    type="button"
                    className="py-2.5 px-4 border border-gray-300 rounded-md flex justify-center items-center space-x-2 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className="py-2.5 px-4 border border-gray-300 rounded-md flex justify-center items-center space-x-2 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9 21.59 18.03 20.37 19.6 18.57C21.16 16.77 22.04 14.49 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}