"use client"
import Image from 'next/image';
import { useState } from 'react';

const PatientCard = ({ patient }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default patient data if none provided
  const defaultPatient = {
    name: "Patient Name",
    username: "Username",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: null
  };
  
  // Use provided patient data or fallback to default
  const { name, username, bio, avatar } = patient || defaultPatient;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex items-start space-x-4">
        <div className="relative w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {avatar ? (
            <Image 
              src={avatar} 
              alt={`${name}'s avatar`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
              <p className="text-sm text-blue-700">{username}</p>
            </div>
            <div className={`px-2 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-600 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              View Profile
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 line-clamp-3">
              <span className="font-medium">Bio: </span>
              {bio}
            </p>
          </div>
        </div>
      </div>
      
      <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-3 flex justify-between items-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
        <button className="text-xs text-blue-700 hover:text-blue-900 font-medium">
          Send Message
        </button>
        <button className="text-xs text-blue-700 hover:text-blue-900 font-medium">
          View Medical History
        </button>
      </div>
    </div>
  );
};

export default PatientCard;