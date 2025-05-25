import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar_data = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About', link: '/medicine' },
  { id: 3, name: 'Documentation', link: '/medicine/Documentation' },
  { id: 4, name: 'Help', link: '/medicine/#footer' },
];

const Navbar = ({ userData = {} }) => {
  const firstName = userData?.Firstname ?? 'Doctor';
  const lastName = userData?.Lastname ?? '';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <Link href="/" className="text-2xl font-semibold text-slate-800 hover:text-blue-600">MediFind</Link>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex space-x-8">
            {Navbar_data.map((item) => (
              <Link key={item.id} href={item.link} className="text-gray-700 hover:text-blue-500 text-lg font-medium">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info */}
          <div className="flex items-center space-x-4">
            <Link href="/medicine/profile" className="text-gray-800 hover:text-blue-600 font-medium whitespace-nowrap">
              {firstName} {lastName}
            </Link>
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
              <Image
                src="/surgeon-doctor-svgrepo-com.svg"
                width={48}
                height={48}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
