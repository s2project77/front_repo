
// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-slate-200  mt-3 mr-3 ml-3 shadow-lg backdrop-blur-3xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        <Link  href={"/medicine"}>  <span className="text-xl font-bold text-slate-800">MediFind</span></Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="#regester" className="text-gray-700 hover:text-slate-600 transition">Help</Link>
          <Link href="#footer" className="text-gray-700 hover:text-slate-600 transition">Contact</Link>
          <Link href="../mainpage" className="text-gray-700 hover:text-slate-600 transition">Get started</Link>
          <Link href="#" className="text-gray-700 hover:text-slate-600 transition">about Us</Link>
          <Link href="#section" className="text-gray-700 hover:text-slate-600 transition"> Services</Link>
        </nav>
        
        <div className="flex space-x-4 items-center">
          <Link href={"/profile"} className='flex items-center justify-center' >  profile  </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;