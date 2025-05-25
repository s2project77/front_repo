"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const TableStock = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isDeletingMedicine, setIsDeletingMedicine] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/pharmacies/medicineStock", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("There is an error");
        }
        const data = await response.json();
        // The stock array is at data.data.stock
        const stock = data.data?.stock || [];
        setFetchedData(stock);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteMedicine = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!window.confirm("Are you sure you want to delete this medicine?")) {
      return;
    }

    setIsDeletingMedicine(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch("http://localhost:3001/api/pharmacies/medicineStock", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ medicineId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete medicine");
      }

      // Remove from local state
      setFetchedData(prev => prev.filter(item => item.medicine?._id !== id));
      console.log("Medicine deleted successfully");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Failed to delete medicine. Please try again.");
    } finally {
      setIsDeletingMedicine(prev => ({ ...prev, [id]: false }));
    }
  }

  const table_data = [
    { id: 1, name: "Medicament ID" },
    { id: 2, name: "Generic Name" },
    { id: 3, name: "Brand Name" },
    { id: 4, name: "Form" },
    { id: 5, name: "Action" }
  ];

  return (
    <Table>
      <TableCaption>Medicines selected and added to your stock from the medicine documentation page.</TableCaption>
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
        {fetchedData.map((item, idx) => (
          <TableRow key={item.medicine?._id || idx}>
            <TableCell className="font-medium">{item.medicine?._id}</TableCell>
            <TableCell>{item.medicine?.genericName}</TableCell>
            <TableCell>{item.medicine?.brandName}</TableCell>
            <TableCell>{item.medicine?.form}</TableCell>
          
         
            <TableCell>
              <button
                onClick={() => deleteMedicine(item.medicine?._id)}
                disabled={isDeletingMedicine[item.medicine?._id]}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeletingMedicine[item.medicine?._id] ? "Deleting..." : "Delete"}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableStock;