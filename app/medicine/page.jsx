// pages/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, ExternalLink, Search, Heart, Activity, User, Settings } from 'lucide-react';
import Navbar from '../components/medicine/navabr';
import Layout from '../components/medcine_layout/layout';
export default function MedicineHomePage() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>MediFind - Your Health, Your Doctor, Your Choice</title>
        <meta name="description" content="Find medications, locate doctors, and manage your healthcare with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     

      {/* Emergency Banner */}
      <div className="bg-blue-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-red-500 text-sm">Emergency Doctor Finder</span>
            <span className="text-gray-400 text-xs ml-2">(CLICK-access button for 24/7 Doctors)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Auth Section */}
          <div className="bg-gray-50 rounded-lg p-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full opacity-50" aria-hidden="true"></div>
            <div className="absolute -top-20 -right-16 w-40 h-40 bg-blue-100 rounded-full opacity-30" aria-hidden="true"></div>
            
            <div className="relative z-10">
              <div className="mb-10">
                <h2 className="text-lg font-medium mb-2">New here? <Link href={"./medicine/regestration"}>  <span className="font-bold">Register</span> </Link> for easy access to pharmacy details and more.</h2>
                <Link href="./medicine/regestration" className="block w-full bg-blue-400 text-white py-3 rounded-md text-center font-medium hover:bg-blue-200 transition-colors mt-4">
                  Register
                </Link>
              </div>
              
              <div className="pt-8 border-t border-gray-200">
                <h2 className="text-lg font-medium mb-2">Log in to manage your preferences and find pharmacies faster!</h2>
                <Link href="./medicine/login" className="block w-full bg-blue-400 text-white py-3 rounded-md text-center font-medium hover:bg-blue-200 transition-colors mt-4">
                  Log In
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Features */}
          <div className="flex flex-col justify-between">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-medium">
                Your <span className="text-blue-400">Health</span>, Your <span className="text-blue-500">Doctor</span>, Your <span className="text-blue-300">Choice</span>!
              </h1>
              
              <div className="flex justify-center my-8">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-10 h-10 text-red-400" />
                  </div>
                  
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path 
                      d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 Z" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Easily locate pharmacies, check medicine availability, and stay informed with reliable healthcare insights.
              </p>
              
              <Link href="./medicine/regestration" className="inline-flex items-center mt-8 px-6 py-3 bg-blue-400 text-white rounded-md font-medium hover:bg-blue-200 transition-colors">
                Get Started
                <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Cards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Find Medicine</h3>
              <p className="text-gray-600 text-sm">
                Search for medications with detailed information on usage, side effects, and alternatives.
              </p>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Doctor Consultation</h3>
              <p className="text-gray-600 text-sm">
                Connect with healthcare professionals for personalized medical advice and prescriptions.
              </p>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Health Monitoring</h3>
              <p className="text-gray-600 text-sm">
                Track your health metrics and medication schedules with smart reminders and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-4">Why Choose MediFind</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We're committed to making healthcare accessible, affordable, and convenient for everyone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Verified Doctors</h3>
              <p className="text-gray-500 text-sm">
                All healthcare professionals on our platform are verified and licensed.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Secure & Private</h3>
              <p className="text-gray-500 text-sm">
                Your health data is encrypted and protected with industry-standard security.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Fast Response</h3>
              <p className="text-gray-500 text-sm">
                Get quick access to medications and medical advice when you need it most.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Community Support</h3>
              <p className="text-gray-500 text-sm">
                Join health forums and connect with others sharing similar health experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your health?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MediFind for their healthcare needs. Sign up today and get access to our complete platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/medicine/regestration" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Create an Account
            </Link>
            <Link href="/learn-more" className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">MediFind</h3>
              <p className="text-gray-600 text-sm">
                Your trusted partner for all healthcare needs, providing access to medications, doctors, and health information.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/find-medicine" className="text-gray-600 hover:text-blue-500">Find Medicine</Link></li>
                <li><Link href="/doctor-consultation" className="text-gray-600 hover:text-blue-500">Doctor Consultation</Link></li>
                <li><Link href="/health-monitoring" className="text-gray-600 hover:text-blue-500">Health Monitoring</Link></li>
                <li><Link href="/emergency-services" className="text-gray-600 hover:text-blue-500">Emergency Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-500">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-blue-500">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-blue-500">Blog</Link></li>
                <li><Link href="/press" className="text-gray-600 hover:text-blue-500">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-500">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-500">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-blue-500">Cookie Policy</Link></li>
                <li><Link href="/compliance" className="text-gray-600 hover:text-blue-500">HIPAA Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 MediFind. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}