"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/medcine_layout/layout";
import Side_bar from "@/app/components/medicine/mainpage/sidebar";
import Head from "next/head";
import { MessageSquare, Send, X, Plus, Loader2, Search, Phone, Mail, ClipboardList, User } from "lucide-react";
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
  
  if (!patient) return (
    <div className="flex items-center justify-center min-h-screen">
      No patient data found.
    </div>
  );

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        <Side_bar />
        <Head>
          <title>Patient Chat | {patient?.Firstname || "Patient"}</title>
          <meta name="description" content="Medical chat interface" />
        </Head>
        <div className="p-4 md:p-8">
          <ChatUI
            doctorId={doctorId}
            patient={patient}
            allMedicines={allMedicines}
          />
        </div>
      </div>
    </Layout>
  );
}

function ChatUI({ patient, doctorId, allMedicines }) {
  const [message, setMessage] = useState("");
  const [medicineInput, setMedicineInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
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
          medicines: selectedMedicines.map(m => m.id),
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
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Patient Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full h-12 w-12 flex items-center justify-center">
            {patient?.profilePicture ? (
              <img 
                src={patient.profilePicture} 
                alt="Patient" 
                className="rounded-full h-full w-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {patient?.Firstname} {patient?.Lastname}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-blue-100">
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {patient?.phone}
              </span>
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {patient?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-6 space-y-6">
        {/* Medicine Selection Preview */}
        {selectedMedicines.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              Prescription Summary
            </h3>
            <div className="space-y-2">
              {selectedMedicines.map((med) => (
                <div
                  key={med.id}
                  className="flex justify-between items-center bg-white p-3 rounded border border-blue-100"
                >
                  <span className="font-medium text-blue-900">
                    {med.brandName}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMedicine(med.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {showInput ? (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={medicineInput}
                  onChange={(e) => setMedicineInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search medicine..."
                  autoFocus
                />
              </div>

              {medicineInput && (
                <div className="border rounded-lg overflow-hidden shadow-sm max-h-60 overflow-y-auto">
                  {allMedicines
                    .filter((m) =>
                      m.brandName
                        .toLowerCase()
                        .includes(medicineInput.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((med) => (
                      <button
                        type="button"
                        key={med.id}
                        className="w-full text-left p-3 hover:bg-blue-50 border-b flex items-center"
                        onClick={() => handleSelectMedicine(med.brandName)}
                      >
                        <Plus className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{med.brandName}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <textarea
                value={message}
                onChange={handleTextChange}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                placeholder={`Type your message to ${patient?.Firstname}...\nType "/" to prescribe medicine`}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Press '/' for medicines
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || selectedMedicines.length === 0}
              className={`flex items-center px-6 py-3 rounded-lg shadow-sm transition-all ${
                isSubmitting || selectedMedicines.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Prescription
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}