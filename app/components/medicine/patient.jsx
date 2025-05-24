"use client";
import Image from 'next/image';
import { useState } from 'react';
import { MessageSquare, FileText, User } from 'lucide-react';

const PatientCard = ({ patient }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default patient data if none provided
  const defaultPatient = {
    name: "Patient Name",
    username: "username",
    bio: "No bio available for this patient.",
    avatar: null,
  };
  
  // Use provided patient data or fallback to default
  const { name, username, bio, avatar } = patient || defaultPatient;
  
  // Status indicator colors
  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    urgent: "bg-red-500",
    new: "bg-blue-500"
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md border border-gray-100 hover:border-blue-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Patient card for ${name}`}
    >
      {/* Header with status indicator */}
      <div className="flex items-center justify-end p-2">
        <span 
          className={`w-3 h-3 rounded-full ${statusColors[status] || statusColors.inactive}`}
          aria-label={`Status: ${status}`}
          title={`Status: ${status}`}
        />
      </div>

      {/* Main content */}
      <div className="p-5 flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
            {avatar ? (
              <Image 
                src={"/profile.png"} // Replace with avatar URL
                alt={`${name}'s avatar`}
                fill
                className="object-cover"
                sizes="(max-width: 64px) 100vw"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>
        
        {/* Patient info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="truncate">
              <h3 className="text-lg font-semibold text-gray-900 truncate" title={name}>
                {name}
              </h3>
              <p className="text-sm text-gray-500 truncate" title={`@${username}`}>
                @{username}
              </p>
            </div>
            <div 
              className={`px-2 py-1 rounded-full text-xs font-medium transition-opacity ${
                isHovered 
                  ? 'opacity-100 bg-blue-100 text-blue-700' 
                  : 'opacity-0'
              }`}
            >
              View
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-3">
            <p 
              className="text-sm text-gray-600 line-clamp-3" 
              title={bio}
              aria-label={`Bio: ${bio}`}
            >
              {bio}
            </p>
          </div>

        </div>
      </div>
      
      {/* Action buttons */}
      <div className={`bg-gray-50 p-3 flex justify-between items-center border-t border-gray-100 transition-colors ${isHovered ? 'bg-blue-50' : ''}`}>
        <button 
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
          aria-label={`Send message to ${name}`}
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
        <button 
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
          aria-label={`View medical history for ${name}`}
        >
          <FileText className="w-4 h-4" />
          History
        </button>
      </div>
    </div>
  );
};

export default PatientCard;