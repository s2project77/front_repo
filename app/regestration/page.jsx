// pages/register.js
"use client"
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formDataRegistration, setFormDataRegistration] = useState({
    name: "",
    location: "",
    coordinates: { lat: 0, lng: 0 }, // Changed to match schema structure
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false
  });

  const nextStep = () => setCurrentStep(c => c + 1);
  const prevStep = () => setCurrentStep(c => c - 1);

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setFormDataRegistration(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormDataRegistration(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          alert("Location captured successfully!");
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to get location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formDataRegistration.password !== formDataRegistration.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (formDataRegistration.password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    if (!formDataRegistration.agreeToTerms) {
      alert("You must agree to the terms and conditions");
      return;
    }

    // Match payload to schema structure
    const payload = {
      name: formDataRegistration.name,
      location: formDataRegistration.location,
      coordinates: formDataRegistration.coordinates, // Now correctly structured as {lat, lng}
      email: formDataRegistration.email,
      password: formDataRegistration.password,
      confirmPassword: formDataRegistration.confirmPassword, // Added this as it's validated in the schema
      phone: formDataRegistration.phone
    };

    try {
      const response = await fetch("http://192.168.124.229:4000/api/pharmacies/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",

      });
       
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }
      const data = await response.json();
      console.log("Registration success:", data);
      setCurrentStep(3);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Registration failed: ${error.message}`);
    }
  };
  return (
    <>
      <Head>
        <title>Pharmacy Registration</title>
        <meta name="description" content="Register your pharmacy" />
      </Head>

      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-green-900 to-green-700 flex-col justify-between p-8">
          <div>
            <div className="text-white text-2xl font-bold">PHARMANET</div>
            <Link href="/" className="inline-flex items-center text-white hover:text-green-200 mt-4 text-sm">
              <FaArrowLeft className="mr-2" /> Back to Website
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="text-green-400 mb-8">
              <div className="text-9xl flex justify-center items-center">
                <FaPlus className="drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]" />
              </div>
            </div>
            <h2 className="text-3xl text-white font-bold text-center">Join Our Pharmacy Network</h2>
            <p className="text-green-200 text-lg text-center mt-4 max-w-xs">
              Access exclusive benefits and connect with healthcare professionals
            </p>
          </div>
          
          <div className="text-green-200 text-sm">
            © 2025 PharmaNet. All rights reserved.
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="w-full md:w-3/5 bg-white p-6 md:p-12 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Create Account</h1>
              <p className="text-gray-600">
                Already have an account? <Link href="/login" className="text-green-600 font-medium hover:underline">Log In</Link>
              </p>
            </div>
            
            {currentStep < 3 && (
              <div className="flex mb-8">
                <div className={`h-1 flex-1 ${currentStep >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
            )}

            <form onSubmit={handleSubmitForm}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-700 mb-3">Personal Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pharmacy Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formDataRegistration.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formDataRegistration.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formDataRegistration.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formDataRegistration.location}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      onClick={getCoordinates}
                      className="mt-2 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Get My Coordinates
                    </button>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Latitude <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.000001"
                          value={formDataRegistration.coordinates.lat}
                          onChange={(e) => {
                            setFormDataRegistration(prev => ({
                              ...prev, 
                              coordinates: {
                                ...prev.coordinates,
                                lat: parseFloat(e.target.value)
                              }
                            }));
                          }}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Longitude <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.000001"
                          value={formDataRegistration.coordinates.lng}
                          onChange={(e) => {
                            setFormDataRegistration(prev => ({
                              ...prev, 
                              coordinates: {
                                ...prev.coordinates,
                                lng: parseFloat(e.target.value)
                              }
                            }));
                          }}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 mt-4"
                  >
                    Continue
                  </button>
                </div>
              )}
              
              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-700 mb-3">Account Setup</h2>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formDataRegistration.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                      <button 
                        type="button" 
                        className="absolute inset-y-0 right-0 pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formDataRegistration.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                      <button 
                        type="button" 
                        className="absolute inset-y-0 right-0 pr-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border-l-4 border-green-500 text-sm">
                    Your information is secure with us.
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      required
                      checked={formDataRegistration.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-green-600 hover:underline">terms</a> <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/3 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                  <p className="text-gray-600 mb-8">
                    Your pharmacy account has been created.
                  </p>
                  
                  <Link href="/mainpage" className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}