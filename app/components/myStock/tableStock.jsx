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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:80/api/pharmacies/medicineStock", {
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

  const table_data = [
    { id: 1, name: "Medicament ID" },
    { id: 2, name: "Generic Name" },
    { id: 3, name: "Brand Name" },
    { id: 4, name: "Form" },
    { id: 5, name: "Available" }
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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.Available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.Available ? "Yes" : "No"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableStock;