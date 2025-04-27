"use client"
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';


const App=()=>{
  
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Head>
        <title>Choose Your Path</title>
        <meta name="description" content="Choose between Pharmacy or Medicine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-900">Make Your Choice</h1>
        <p className="mt-2 text-lg text-indigo-700">Select the service you need today</p>
      </header>      <main className="flex-grow flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
         
          <div 
            className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
              hoveredCard === 'pharmacy' ? 'scale-105 shadow-xl' : ''
            }`}
            onMouseEnter={() => setHoveredCard('pharmacy')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="h-64 bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy</h2>
              <p className="text-gray-600">Access medications, health products, and speak with pharmacists.</p>
              <Link href="/pharmacy" > <button className="mt-4 w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
                Choose Pharmacy
              </button></Link>
            </div>
          </div>

          
          <div 
            className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
              hoveredCard === 'medicine' ? 'scale-105 shadow-xl' : ''
            }`}
            onMouseEnter={() => setHoveredCard('medicine')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="h-64 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor</h2>
              <p className="text-gray-600">Consult with doctors, get diagnoses, and treatment plans.</p>
              <Link href="/medicine" ><button className="mt-4 w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors">
                Choose doctor
              </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-indigo-600">
        © {new Date().getFullYear()} Health Services | All Rights Reserved
      </footer>
    </div>
  )
}

export default App;

