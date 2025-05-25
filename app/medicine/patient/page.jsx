"use client"; // Add this directive since we're using client-side features

import Link from "next/link";
import PatientCard from "@/app/components/medicine/patient";
import Layout from "@/app/components/medcine_layout/layout";
import Side_bar from "@/app/components/medicine/mainpage/sidebar";
import Searchbar from "@/app/components/searchbar";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Wifi, WifiOff, RefreshCw } from "lucide-react";
const PatientCardsGrid = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:80/api/users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        console.log(data.data.data);
        const apiPatients = data.data.data; // Access the nested data array

        // Transform API data
        const transformedPatients = apiPatients.map(patient => ({
          id: patient._id,
          name: `${patient.Firstname} ${patient.Lastname}`,
          username: patient.email.split('@')[0],
          bio: `Patient role: ${patient.role}`,
          avatar: patient.photo
        }));

        setPatients(transformedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Patient Page</h2>
            <p className="text-gray-600">Fetching your patient records...</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Medical Data Unavailable</h2>
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
    <Layout className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
        <Side_bar />
        <div className="flex flex-col gap-4 p-10">
          <div className="flex items-center justify-center">
            <Searchbar data={patients} />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Directory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <Link href={`/medicine/patient/${patient.id}`} key={patient.id}>
                  <PatientCard patient={patient} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientCardsGrid;