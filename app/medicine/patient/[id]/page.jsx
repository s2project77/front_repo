"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "@/app/components/medicine/mainpage/sidebar";
import Head from "next/head";

export default function MedicalChatPage() {
  const { id: patientId } = useParams();
  const [allMedicines, setAllMedicines] = useState([]);
  const [patient, setPatient] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !patientId) return;

        const [doctorRes, patientRes] = await Promise.all([
          fetch("http://192.168.103.88:3001/api/doctors/myinfo", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://192.168.103.88:3001/api/users/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!doctorRes.ok || !patientRes.ok)
          throw new Error("Failed to fetch data");

        const doctorData = await doctorRes.json();
        const patientData = await patientRes.json();
        setDoctorId(doctorData.data.data._id);
        setPatient(patientData.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId, token]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch(
          "http://192.168.103.88:3001/api/medicines/getAllMedicines"
        );
        if (!res.ok) throw new Error("Failed to fetch medicines");

        const data = await res.json();
        const simplified = data.data.data.map((med) => ({
          id: med._id,
          brandName: med.brandName,
        }));
        setAllMedicines(simplified);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) return <div className="p-10">Loading patient data...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;
  if (!patient) return <div className="p-10">No patient data found.</div>;

  return (
    <Layout className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.3fr_4fr]">
        <Side_bar />
        <Head>
          <title>Patient Chat Interface</title>
          <meta name="description" content="Medical chat interface" />
        </Head>
        <ChatUI
          doctorId={doctorId}
          patient={patient}
          allMedicines={allMedicines}
        />
      </div>
    </Layout>
  );
}

function ChatUI({ patient, doctorId, allMedicines }) {
  const [message, setMessage] = useState("");
  const [medicineInput, setMedicineInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]); // Array of objects {id, brandName}
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: patientId } = useParams();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleTextChange = (e) => {
    const text = e.target.value;
    setMessage(text);

    if (text.includes("/")) {
      setShowInput(true);
      setMessage("");
    }
  };

  const handleSelectMedicine = (brandName) => {
    const selected = allMedicines.find((med) => med.brandName === brandName);
    if (selected && !selectedMedicines.some(m => m.id === selected.id)) {
      setSelectedMedicines([...selectedMedicines, {
        id: selected.id,
        brandName: selected.brandName
      }]);
    }
    setMedicineInput("");
    setShowInput(false);
  };

  const removeMedicine = (medicineId) => {
    setSelectedMedicines(selectedMedicines.filter(m => m.id !== medicineId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showInput && medicineInput.trim()) {
      handleSelectMedicine(medicineInput.trim());
      return;
    }

    if (!selectedMedicines.length || !doctorId || !patientId) {
      alert("Please select at least one medicine");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("http://192.168.103.88:3001/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: doctorId,
          user: patientId,
          medicines: selectedMedicines.map(m => m.id), // Send only the IDs
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send prescription");
      }

      alert("Prescription sent successfully!");
      setSelectedMedicines([]);
    } catch (err) {
      console.error("Error submitting prescription:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-slate-200 my-[1cm] rounded-lg shadow-lg h-[80%] w-full max-w-md p-4">
      <div className="flex items-center border-b pb-4 mb-4">
        <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center mr-3"></div>
        <div>
          <h2 className="font-medium text-gray-800">{patient.Firstname}</h2>
          <p className="text-xs text-gray-500">{patient.Lastname}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg p-3 space-y-4">
          {!showInput ? (
            <textarea
              value={message}
              onChange={handleTextChange}
              className="w-full h-24 resize-none outline-none p-2"
              placeholder="Type message...\nType '/' to prescribe medicine"
            ></textarea>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">
                Search Medicine:
              </label>
              <input
                type="text"
                value={medicineInput}
                onChange={(e) => setMedicineInput(e.target.value)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start typing medicine name..."
                autoFocus
              />
              {medicineInput && (
                <div className="mt-1 max-h-60 overflow-y-auto border bg-white rounded shadow">
                  {allMedicines
                    .filter((m) =>
                      m.brandName.toLowerCase().includes(medicineInput.toLowerCase())
                    )
                    .slice(0, 10) // Limit to 10 results
                    .map((med) => (
                      <div
                        key={med.id}
                        className="p-2 cursor-pointer hover:bg-blue-50 border-b"
                        onClick={() => handleSelectMedicine(med.brandName)}
                      >
                        <div className="font-medium">{med.brandName}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {selectedMedicines.length > 0 && (
            <div className="bg-blue-50 border p-2 rounded">
              <div className="text-sm font-medium mb-2">Selected Medicines:</div>
              {selectedMedicines.map((med) => (
                <div key={med.id} className="flex justify-between items-center py-1 border-b">
                  <span className="text-sm">{med.brandName}</span>
                  <button
                    type="button"
                    onClick={() => removeMedicine(med.id)}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="text-xs">
            <span className="mr-3">{patient.phone}</span>
            <span>{patient.email}</span>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg flex items-center ${
              isSubmitting || selectedMedicines.length === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
            disabled={isSubmitting || selectedMedicines.length === 0}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Prescription
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
