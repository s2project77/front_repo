"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, ChevronDown } from 'lucide-react'

const Navbar_data = [
  {id: 1, name: "Home", link: "/"},
  {id: 2, name: "About", link: "/medicine"},
  {id: 3, name: "Documentation", link: "/medicine/Documentation"},
  {id: 4, name: "Help", link: "/medicine/#footer"},
  {id: 5, name: "Log out", link: "/login"}
]
<<<<<<< HEAD
const Navbar = ({userData}) => {
=======

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(1)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

>>>>>>> 9b55ceb (static data)
  return (
    <header className="sticky top-0 z-50">
      <div 
        className={`
          flex relative px-4 md:px-6 lg:px-8 flex-row h-16 md:h-20 items-center justify-between
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-gray-100 shadow-md'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center text-white 
                  transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              
              {/* Decorative pulse effect */}
              <span className="absolute top-0 right-0 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-300"></span>
              </span>
            </div>
            
            <Link href="/" className="ml-2">
              <span className="text-xl font-bold text-slate-700 transition-colors duration-300 hover:text-slate-500">
                MediFind
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-500 hover:text-slate-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex flex-row gap-1 lg:gap-4">
            {Navbar_data.map((item) => (
              <li key={item.id} className="relative">
                <Link 
                  href={item.link}
                  className={`
                    relative px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                    hover:text-blue-500 hover:bg-blue-50
                    ${activeItem === item.id 
                      ? 'text-blue-500 font-semibold' 
                      : 'text-slate-700'}
                  `}
                  onClick={() => setActiveItem(item.id)}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  {activeItem === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center">
            <Link 
              href="/medicine/mainpage"
              className="text-slate-700 hover:text-blue-500 font-medium flex items-center mr-2 transition-colors duration-200"
            >
              <User size={16} className="mr-1" />
              <span className="hidden lg:inline">your profile</span>
              <ChevronDown size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="relative group">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-md">
              <Image 
                src="/profile.png" 
                width={50} 
                height={50} 
                alt="User profile picture" 
                className="object-cover"
              />
            </div>
            
            {/* Status indicator */}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white"></span>
          </div>
        </div>
      </div>

<<<<<<< HEAD
)}
</ul>

 </nav>
        <div className='w-[6cm] justify-center items-center mx-auto text-center flex flex-row gap-4  ' ><Link href={"/medicine/profile"}>{userData.Firstname} { userData.Lastname}</Link>
 <div className='w-[66px] h-[66px]  rounded-[50px]  border-2 justify-center' ><Image  src={"/profile.png"} width={50} height={50} alt='' className='justify-center mx-auto mt-1'  ></Image> </div></div>

 </div>
=======
      {/* Mobile Navigation Menu - Slide Down Panel */}
      <div 
        className={`
          md:hidden absolute w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out origin-top
          ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
        `}
      >
        <nav className="px-4 pt-2 pb-4">
          <ul className="space-y-2">
            {Navbar_data.map((item) => (
              <li key={item.id}>
                <Link 
                  href={item.link}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    hover:bg-blue-50 hover:text-blue-500
                    ${activeItem === item.id ? 'text-blue-500 bg-blue-50' : 'text-slate-700'}
                  `}
                  onClick={() => {
                    setActiveItem(item.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
>>>>>>> 9b55ceb (static data)
    </header>
  )
}