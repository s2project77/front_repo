"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export const Right_part = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Set loaded state after component mounts for animation
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex w-full justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full opacity-20 translate-x-1/3 translate-y-1/3 blur-xl"></div>
      
      <div className="w-full max-w-4xl px-4 py-8 mx-auto">
        <div 
          className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ${
            isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image container with aspect ratio */}
          <div className="relative w-full h-0 pb-[75%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            
            <Image 
              src="/pharmacie_imag.jpg" 
              layout="fill"
              objectFit="cover"
              quality={95}
              alt="Pharmacy showcase"
              className={`transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
              onLoadingComplete={() => setIsLoaded(true)}
            />
            
            {/* Overlay caption */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 text-white z-20 transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h3 className="text-2xl font-bold mb-2">Modern Pharmacy Solutions</h3>
              <p className="text-sm text-gray-200">Excellence in healthcare delivery and patient care</p>
            </div>
          </div>
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute rotate-45 bg-blue-500 text-white text-xs py-1 text-center w-24 top-3 -right-6">
              Featured
            </div>
          </div>
        </div>
        
        {/* Optional navigation dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(3)].map((_, i) => (
            <button 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-blue-500 w-4' : 'bg-gray-300'}`}
              aria-label={`View image ${i+1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}