import React from 'react';
import Side_bar from '@/app/components/medicine/mainpage/sidebar';
import Layout from '@/app/components/medcine_layout/layout';

import Image from 'next/image';
import Link from 'next/link';

// In Next.js App Router, page files should export a React component as default
// The component name doesn't matter, but it must be a valid React component
export default async function MedicineDetailPage({ params }) {
  const { id } = params;
  
  // Fetch all medicines
  
    const medicineRes = await fetch("http://localhost:3001/api/medicines/getAllMedicines", {
      cache: 'no-store' // Ensures fresh data on each request
    });
    
    
    
    const allMedicines = await medicineRes.json();
    const medicinesList = allMedicines.data.data;
    
    // Find the medicine with matching ID
    const foundMedicine = medicinesList.find(medicine => 
      medicine.id.toString() === id.toString()
    );
    
  
return(
// ...existing code...
<Layout>
  <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]">
    <Side_bar />
    <div className="flex p-8 min-h-screen w-full relative flex-col gap-10 px-4 sm:px-20">
      <div className="p-4">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-2">
          {foundMedicine.brandName} <span className="text-gray-700">Medicament</span>
        </h1>
        <p className="text-gray-500 text-lg">Detailed information and specifications</p>
      </div>
      <div className="rounded-2xl shadow-2xl border bg-white border-gray-200 p-8 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-2 rounded-xl shadow">
              <Image
                height={100}
                width={100}
                src={"/doliprane.jpg"}
                alt={foundMedicine.brandName}
                className="w-24 h-24 object-contain rounded-lg border border-blue-200"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{foundMedicine.brandName}</h2>
              <Link href={`./${id}/${foundMedicine.genericName}`}>
                <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition">
                  {foundMedicine.genericName}
                </span>
              </Link>
            </div>
          </div>
          <Link href={`./${id}/${foundMedicine.genericName}`}>
            <button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
              Show other with the same family
            </button>
          </Link>
        </div>
        <div className="border-t-4 border-blue-400 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <span className="font-semibold text-gray-700">Form:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.form}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <span className="font-semibold text-gray-700">Measurement Unit:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.measurementUnit}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <span className="font-semibold text-gray-700">ID:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.id}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <span className="font-semibold text-gray-700">Description:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.description}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>
// ...existing code...
  );
}