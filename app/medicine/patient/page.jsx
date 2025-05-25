"use client";

import Link from "next/link";
import PatientCard from "@/app/components/medicine/patient";
import Layout from "@/app/components/medcine_layout/layout";
import Side_bar from "@/app/components/medicine/mainpage/sidebar";
import { useEffect, useState } from "react";
import { 
  Loader2, 
  AlertCircle, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Search,
  Users,
  Filter,
  X
} from "lucide-react";

const PatientCardsGrid = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      
      const response = await fetch("http://localhost:3001/api/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      const apiPatients = data.data.data;

      const transformedPatients = apiPatients.map(patient => ({
        id: patient._id,
        name: `${patient.Firstname} ${patient.Lastname}`,
        firstname: patient.Firstname,
        lastname: patient.Lastname,
        username: patient.email.split('@')[0],
        email: patient.email,
        phone: patient.phone,
        bio: `Patient role: ${patient.role}`,
        avatar: patient.photo,
        role: patient.role
      }));

      setPatients(transformedPatients);
      setFilteredPatients(transformedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.phone && patient.phone.includes(searchQuery))
      );
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchPatients();
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const LoadingScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-blue-500/10 p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 animate-bounce">
                <Loader2 className="animate-spin" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Patient Directory</h2>
              <p className="text-gray-600">Fetching patient records...</p>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  const ErrorScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-red-500/10 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Patients</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-gray-50 rounded-xl">
              {isOnline ? (
                <>
                  <Wifi className="text-green-500" size={20} />
                  <span className="text-green-600 font-medium">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="text-red-500" size={20} />
                  <span className="text-red-600 font-medium">Offline</span>
                </>
              )}
            </div>
            <button
              onClick={handleRetry}
              disabled={!isOnline}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <RefreshCw size={18} />
              <span>{retryCount > 0 ? `Retry (${retryCount})` : 'Try Again'}</span>
            </button>
            {retryCount > 2 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-sm">
                  Unable to connect to medical records system. Please check your connection or contact technical support.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        <Side_bar />
        
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Directory</h1>
                <p className="text-gray-600">Manage and view all registered patients</p>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">{filteredPatients.length} Patients</span>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Search Patients</h2>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search by name, email, username, or phone..."
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {searchQuery && (
                <div className="mt-3 text-sm text-gray-600">
                  Showing {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''} for "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No patients found' : 'No patients available'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? `No patients match your search for "${searchQuery}"`
                    : 'There are currently no patients in the system'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search to see all patients
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPatients.map((patient) => (
                  <Link href={`/medicine/patient/${patient.id}`} key={patient.id}>
                    <div className="transform transition-transform hover:scale-105">
                      <PatientCard patient={patient} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientCardsGrid;