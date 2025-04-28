import React from 'react';
import { Side_bar } from '@/app/components/medicine/mainpage/sidebar';
import Layout from '@/app/components/medcine_layout/layout';
import Searchbar from '@/app/components/searchbar';
import Image from 'next/image';;
import Link from 'next/link';

// In Next.js App Router, page files should export a React component as default
// The component name doesn't matter, but it must be a valid React component
export default async function MedicineDetailPage({ params }) {
  const { id } = params;
  
  // Fetch all medicines
  
    const medicineRes = await fetch("http://192.168.15.102:4000/api/medicines/getAllMedicines", {
      cache: 'no-store' // Ensures fresh data on each request
    });
    
    
    
    const allMedicines = await medicineRes.json();
    const medicinesList = allMedicines.data.data;
    
    // Find the medicine with matching ID
    const foundMedicine = medicinesList.find(medicine => 
      medicine.id.toString() === id.toString()
    );
    
  
return(

<Layout>
  
<div className="w-full min-h-screen   grid grid-cols-1 sm:grid-cols-[1.1fr_4fr] justify-center items-center">
<Side_bar></Side_bar>

<div className="flex p-6 min-h-screen   w-full relative flex-col gap-10 px-4 sm:px-20">
          <div className='p-4'>
            <h1 className="text-2xl font-bold"> {foundMedicine.brandName}  Medicament
            </h1>
          </div>

 
          <div className=" rounded-lg shadow-lg border bg-gray-100 border-gray-200 p-6">
        <div className="flex items-center mb-6">
        <div className="mr-4">
        <Image  height={100} width={100}
              src={"/doliprane.jpg"} 
              alt={foundMedicine.brandName}
              className="w-24 h-24 object-contain rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{foundMedicine.brandName}</h2>
           <Link  href={"./"+id+"/"+foundMedicine.genericName} > <p className="text-gray-600">{foundMedicine.genericName}</p></Link>
          </div>
        </div>
        
        <div className="border-t-4 border-t-slate-500 border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
            <span className="font-medium text-gray-700">Form:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.form}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
            <span className="font-medium text-gray-700">Measurement Unit:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.measurementUnit}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
            <span className="font-medium text-gray-700">ID:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.id}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <span className="font-medium text-gray-700">Description:</span>
            <span className="col-span-2 text-gray-600">{foundMedicine.description}</span>
          </div>
        </div>
      </div>
</div>

</div>

</Layout>
)

}