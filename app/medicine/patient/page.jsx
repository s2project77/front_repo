"use client"; // Add this directive since we're using client-side features

import Link from "next/link";
import PatientCard from "@/app/components/medicine/patient";
import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "@/app/components/medicine/mainpage/sidebar";
import Searchbar from "@/app/components/searchbar";
import { useEffect, useState } from "react";

const PatientCardsGrid = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://192.168.103.88:3001/api/users", {
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

  if (loading) {
    return (
      <Layout className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
          <Side_bar />
          <div className="flex items-center justify-center">
            <p>Loading patients...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
          <Side_bar />
          <div className="flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </Layout>
    );
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