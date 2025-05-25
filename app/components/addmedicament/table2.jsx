"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Table2() {
    
const [fetchedData, setFetchedData] = useState([]);
const [visible, setVisible] = useState([]);
const [currentStep, setCurrentStep] = useState(0);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isDeletingAll, setIsDeletingAll] = useState(false);
const [isAddingToStock, setIsAddingToStock] = useState({});
const [isDeletingMedicine, setIsDeletingMedicine] = useState({});
const router = useRouter();

const itemsPerPage = 8;
const totalPages = Math.ceil(fetchedData.length / itemsPerPage);

const updateVisibleData = (step) => {
    const start = step * itemsPerPage;
    const end = start + itemsPerPage;
    setVisible(fetchedData.slice(start, end));
}

const nextPage = () => {
    if (currentStep < totalPages - 1) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        updateVisibleData(newStep);
    }
}

const previousPage = () => {
    if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        updateVisibleData(newStep);
    }
}

const table_data = [
    { id: 1, name: "Medicament ID", name_input: "Medicament_ID" },
    { id: 2, name: "Generic Name", name_input: "Generic_Name" },
    { id: 3, name: "Brand Name", name_input: "Brand_Name" },
    { id: 4, name: "Form", name_input: "Form" },
    { id: 5, name: "Actions", name_input: "Actions" }
];
  
useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMedicines = async () => {
        if (!token) {
            router.push("/login");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:3001/api/medicines/getAllMedicines", {
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch medicines");
            }
            
            const data = await response.json();
            setFetchedData(data.data.data);
            setVisible(data.data.data.slice(0, itemsPerPage));
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    }

    fetchMedicines();
}, [router]);

const postSingleMedicine = async (id) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        router.push("/login");
        return;
    }
    
    setIsAddingToStock(prev => ({ ...prev, [id]: true }));
    
    try {
        const response = await fetch("http://localhost:3001/api/pharmacies/medicineStock", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ medicineId: id }),
        });
       
        if (!response.ok) {
            throw new Error("Failed to add medicine to stock");
        }
        
        console.log("Medicine added to stock successfully");
    } catch (error) {
        console.error("Error adding medicine to stock:", error);
    } finally {
        setIsAddingToStock(prev => ({ ...prev, [id]: false }));
    }
}


return (
    <div>
        <div className='max-h-screen overflow-y-auto'>
            <Table>
                <TableCaption>Medicines List - Page {currentStep + 1} of {totalPages}</TableCaption>
                <TableHeader>
                    <TableRow>
                        {table_data.map((item) => (
                            <TableHead key={item.id} className="w-[100px]">
                                {item.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visible.map((item, index) => (
                        <TableRow className="h-[3.2cm]" key={item._id || index}>
                            <TableCell className="font-medium">{item._id}</TableCell>
                            <TableCell>{item.genericName}</TableCell>
                            <TableCell>{item.brandName}</TableCell>
                            <TableCell>{item.form}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => postSingleMedicine(item._id)} 
                                        disabled={isAddingToStock[item._id]}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        {isAddingToStock[item._id] ? "Adding..." : "Add to Stock"}
                                    </button>
                                   
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> 
            </Table>
            
            <div className="w-full flex justify-center mt-4 mx-auto bottom-4">
                <div className="flex gap-4 items-center">
                    <button   
                        className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'   
                        onClick={previousPage}
                        disabled={currentStep === 0}
                    > 
                        Previous 
                    </button>
                    
                    <span className="text-sm text-gray-600">
                        Page {currentStep + 1} of {totalPages}
                    </span>
                    
                    <button  
                        className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'  
                        onClick={nextPage}
                        disabled={currentStep >= totalPages - 1}
                    > 
                        Next 
                    </button>
                </div> 
            </div>
        </div>
    </div>
)
}