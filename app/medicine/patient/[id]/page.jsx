"use client"
import { useState } from 'react';
import Layout from '@/app/components/medcine_layout/layout';
import Head from 'next/head';
import { Side_bar } from '@/app/components/medicine/mainpage/sidebar';
export default function MedicalChat() {
  const [message, setMessage] = useState('');
  const [medications, setMedications] = useState([
   
  ]);
  const [showMedicineInput, setShowMedicineInput] = useState(false);
  const [medicineInput, setMedicineInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    
    // Check if the doctor is trying to add medicine (using "/" command)
    if (text.includes('/')) {
      setShowMedicineInput(true);
      setMessage(''); // Clear the main input
    }
  };
  
  const handleMedicineInputChange = (e) => {
    setMedicineInput(e.target.value);
  };
  
  const addMedicine = () => {
    if (!medicineInput.trim()) return;
    
    setIsSubmitting(true);
    
    // Create a new medicine object
    const newMedicine = {
      id: Date.now(),
      name: medicineInput
    };
    
    // Add it to our medications array
    setMedications([...medications, newMedicine]);
    
    // Reset states
    setMedicineInput('');
    setShowMedicineInput(false);
    setIsSubmitting(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (showMedicineInput) {
      addMedicine();
      return;
    }
    
    if (!message.trim()) return;
    
    // Here we would typically send the message, but for this example
    // we're just logging and clearing the input
    console.log("Message sent:", message);
    setMessage('');
  };
  
  const cancelMedicineInput = () => {
    setShowMedicineInput(false);
    setMedicineInput('');
  };

  return (
    <Layout className="bg-gray-100 min-h-screen flex items-center justify-center ">
    <div className="w-full  min-h-full grid grid-cols-1 sm:grid-cols-[1.3fr_4fr]">
            <Side_bar />
            
      <Head>
        <title>Patient Chat Interface</title>
        <meta name="description" content="Medical chat interface" />
      </Head>
      
      <div className=" mx-auto  bg-gray-50 my-[1cm] rounded-lg h-[80%]  shadow-lg shadow-gray-300 w-full max-w-md">
        {/* Patient Header */}
        <div className="flex items-center p-4 border-b">
          <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center mr-3"></div>
          <div>
            <h2 className="font-medium text-gray-800">Patient Name</h2>
            <p className="text-xs text-gray-500">Username</p>
          </div>
        </div>
        
        {/* Chat Content */}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="border rounded-lg p-3">
              {!showMedicineInput ? (
                <textarea 
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full h-24 outline-none resize-none"
                  placeholder="Here to type something....
Doctor should type '/' to add a medicine"
                ></textarea>
              ) : (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Medicine Name:
                  </label>
                  <input
                    type="text"
                    value={medicineInput}
                    onChange={handleMedicineInputChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter medicine name"
                    autoFocus
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={cancelMedicineInput}
                      className="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addMedicine}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      disabled={isSubmitting || !medicineInput.trim()}
                    >
                      Add Medicine
                    </button>
                  </div>
                </div>
              )}
              
              {/* Medications List */}
              <div className="bg-blue-100 rounded p-2 my-2">
                {medications.map(med => (
                  <div key={med.id} className="border-b border-blue-200 py-2">
                    {med.name}
                  </div>
                ))}
              </div>
              
              <div className="text-gray-500 text-sm">
                Here to type something....
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                <span className="mr-6">09787098887777</span>
                <span>patient@gmail.com</span>
              </div>
              <button 
                type="submit" 
                className="bg-blue-100 text-blue-800 px-4 py-1 rounded-lg flex items-center"
                disabled={showMedicineInput && !medicineInput.trim()}
              >
                Send
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
}