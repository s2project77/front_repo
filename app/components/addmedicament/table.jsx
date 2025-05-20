"use client"
import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Trash2 } from "lucide-react";
import Searchbar from '../searchbar';

const MEDICAMENT_FIELDS = [
  { id: 1, name: "Medicament N", name_input: "Medicament_N" },
  { id: 2, name: "Medicament Name", name_input: "Medicament_Name" },
  { id: 3, name: "Medicament Family", name_input: "Medicament_Family" },
  { id: 4, name: "Medicament Label", name_input: "Medicament_Label" },
  { id: 5, name: "Medicament Status", name_input: "Medicament_Status" },
];

const INITIAL_FORM_STATE = {
  Medicament_N: "",
  Medicament_Name: "",
  Medicament_Family: "",
  Medicament_Label: "",
  Medicament_Status: ""
};

export const Table = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem("medicament_table");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [showForm, setShowForm] = useState(true);
  const [formError, setFormError] = useState("");
  
  // Save to localStorage whenever table data changes
  useEffect(() => {
    localStorage.setItem("medicament_table", JSON.stringify(tableData));
  }, [tableData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setFormError("");
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== "");
  };

  const handleAddToTable = () => {
    if (!validateForm()) {
      setFormError("Please fill in all fields before adding to the table");
      return;
    }

    // Check if record already exists
    const recordExists = tableData.some(item => 
      item.Medicament_N === formData.Medicament_N && 
      item.Medicament_Name === formData.Medicament_Name
    );

    if (recordExists) {
      setFormError("This medicament already exists in the table");
      return;
    }

    // Add new record with unique ID
    setTableData(prevData => [
      {
        id: Date.now(), // Add unique ID for easier manipulation
        ...formData
      },
      ...prevData
    ]);
    
    // Reset form
    setFormData(INITIAL_FORM_STATE);
    setFormError("");
  };

  const handleRemoveFromTable = (id) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
  };

  const toggleFormVisibility = () => {
    setShowForm(prevState => !prevState);
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Medicament Management</h1>
        
        <Searchbar data={tableData} />
        
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <button 
            onClick={toggleFormVisibility}
            className="flex items-center text-gray-800 font-medium mb-4 hover:text-red-600 transition-colors"
          >
            {showForm ? (
              <ChevronDown className="mr-2" size={20} />
            ) : (
              <ChevronRight className="mr-2" size={20} />
            )}
            <span>Add Medicament</span>
          </button>
          
          {showForm && (
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      {MEDICAMENT_FIELDS.map((field) => (
                        <th key={field.id} className="border border-gray-300 px-4 py-2 text-left">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {MEDICAMENT_FIELDS.map((field) => (
                        <td key={field.id} className="border border-gray-300">
                          <input
                            name={field.name_input}
                            value={formData[field.name_input]}
                            onChange={handleInputChange}
                            type="text"
                            placeholder={`Enter ${field.name}`}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {formError && (
                <div className="text-red-500 mt-2">{formError}</div>
              )}
              
              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={handleAddToTable}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  <Plus className="mr-2" size={16} />
                  Add to the list
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-medium mb-4">Medicament List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  {MEDICAMENT_FIELDS.map((field) => (
                    <th key={field.id} className="border border-gray-300 px-4 py-2 text-left">
                      {field.name}
                    </th>
                  ))}
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan={MEDICAMENT_FIELDS.length + 1} className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                      No medicaments added yet
                    </td>
                  </tr>
                ) : (
                  tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {MEDICAMENT_FIELDS.map((field) => (
                        <td key={`${row.id}-${field.id}`} className="border border-gray-300 px-4 py-2">
                          {row[field.name_input]}
                        </td>
                      ))}
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleRemoveFromTable(row.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;