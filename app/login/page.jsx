"use client"
import { FaArrowLeft, FaEye, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setFormData({...formData, [name]: type === "checkbox" ? checked : value})
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      const response = await fetch("http://192.168.1.8:4001/api/pharmacies/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Server response:", data);
      setCurrentStep(3); // Move to success page after successful login
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Failed to login: ${error.message}`);
    }
  };

  return (
    <section className='flex min-h-screen overflow-hidden'>
      <div className='md:w-2/5 text-black p-5 flex-col min-h-screen h-full md:flex hidden bg-gradient-to-b from-green-900 to-green-800'>
        <div className='flex flex-col p-1'>
          <h1 className='flex font-bold text-white'>PHARMANET</h1>
          <div className='text-white'>
            <Link href="/registration" className='gap-4 font-bold inline-flex items-center'>
              <FaArrowLeft/>back to web site
            </Link>
          </div>
        </div>
        
        <div className='flex mb-10 flex-col flex-1 items-center justify-center'>
          <div className='text-center flex flex-col'>
            <div className='text-green-400 text-9xl mb-9 mx-auto items-center justify-center'>
              <FaPlus className='drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]'/>
            </div>
            <h2 className="text-3xl text-white font-bold text-center mt-6">Join Our</h2>
            <h2 className="text-3xl text-white font-bold text-center">Pharmacy Network</h2>
            <p className="text-green-200 text-lg text-center mt-4 max-w-xs">
              Access your prescriptions, manage medications, and connect with healthcare professionals
            </p>
          </div>
        </div>
        
        <div className='text-white'>
          © 2025 PharmaNet. All rights reserved.
        </div>
      </div>

      <div className='flex items-center md:w-3/5 w-full flex-col'>
        {currentStep === 1 && (
          <div className="w-full max-w-lg m-auto p-4">
            <div className='flex flex-col mb-9 m-auto gap-2'>
              <h1 className="text-3xl font-bold text-green-800 mb-2">WELCOME BACK</h1>
              <p className="text-gray-600">Please enter your details to access your account</p>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type='email' 
                    id="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required  
                    placeholder='Enter your email' 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div> 
                
                <div>
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                  <div className='relative'>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password"  
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='Enter your password'  
                      required 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"   
                    />
                    <FaEye 
                      className='absolute right-3 top-4 cursor-pointer' 
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <p className='text-right text-green-600 mt-1 hover:underline cursor-pointer'>
                    Forgot password?
                  </p>
                </div>
                
                <div className='mt-6'>
                  <button 
                    type='submit' 
                    className='w-full h-12 text-white font-bold bg-green-600 rounded-[10px] hover:bg-green-700 transition-colors'
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center m-auto py-8 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful!</h2>
            <p className="text-gray-600 mb-8">
              You can now access all our pharmacy services.
            </p>
            
            <Link 
              href="/mainpage" 
              className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Go to Main page
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}