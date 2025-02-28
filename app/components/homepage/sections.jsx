
// components/ServicesSection.jsx
import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-xl p-8 text-center transition transform hover:-translate-y-2">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id='section' className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Easily access pharmaceutical care with our range of convenient services designed to help you stay healthy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            title="Find Pharmacies"
            description="Locate the nearest pharmacies based on your location with real-time availability."
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            title="Medication Information"
            description="Access detailed information about medications including usage, side effects, and interactions."
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            title="Prescription Management"
            description="Keep track of your prescriptions and set up reminders for refills and medications."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
