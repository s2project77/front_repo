"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Layout from "@/app/components/medcine_layout/layout";
import Side_bar from "@/app/components/medicine/mainpage/sidebar";
import {
  Send,
  X,
  Plus,
  Loader2,
  Search,
  Phone,
  Mail,
  ClipboardList,
  User,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  Calendar,
  UserCheck,
  Pill
} from "lucide-react";

export default function MedicalPrescriptionPage() {
  const { id: patientId } = useParams();
  const [allMedicines, setAllMedicines] = useState([]);
  const [patient, setPatient] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token || !patientId) return;

      const [doctorRes, patientRes] = await Promise.all([
        fetch("http://localhost:3001/api/doctors/myinfo", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://localhost:3001/api/users/${patientId}`, {
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, token]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/medicines/getAllMedicines");
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

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchData();
  };

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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Prescription</h2>
              <p className="text-gray-600">Preparing prescription interface...</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Patient</h2>
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
          </div>
        </div>
      </div>
    </Layout>
  );

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;
  if (!patient) {
    return (
      <>
        <Head>
          <title>Patient Not Found</title>
        </Head>
        <Layout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Not Found</h2>
              <p className="text-gray-600">No patient data found for this ID.</p>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Patient Prescription | {patient?.Firstname || "Patient"}</title>
        <meta name="description" content="Create and manage patient prescriptions" />
      </Head>
      <Layout className="bg-gray-50 min-h-screen">
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[300px_1fr]">
          <Side_bar />
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">New Prescription</h1>
              <p className="text-gray-600">Create and manage patient prescriptions</p>
            </div>
            <PrescriptionInterface
              doctorId={doctorId}
              patient={patient}
              allMedicines={allMedicines}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

function PrescriptionInterface({ patient, doctorId, allMedicines }) {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMedicineSearch, setShowMedicineSearch] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { id: patientId } = useParams();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleAddMedicine = (medicine) => {
    if (!selectedMedicines.some((m) => m.id === medicine.id)) {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
    setMedicineSearch("");
    setShowMedicineSearch(false);
  };

  const removeMedicine = (id) => {
    setSelectedMedicines(selectedMedicines.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMedicines.length || !doctorId || !patientId) {
      alert("Please select at least one medicine");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:3001/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: doctorId,
          user: patientId,
          medicines: selectedMedicines.map((m) => m.id),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit prescription");

      setSubmitSuccess(true);
      setSelectedMedicines([]);

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMedicines = allMedicines.filter((medicine) =>
    medicine.brandName.toLowerCase().includes(medicineSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-green-800 font-semibold">Prescription Submitted Successfully!</h3>
            <p className="text-green-700 text-sm">The prescription has been added to the patient's record.</p>
          </div>
        </div>
      )}

      {/* Patient Information Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full h-16 w-16 flex items-center justify-center">
              {patient?.profilePicture ? (
                <img
                  src={patient.profilePicture}
                  alt="Patient"
                  className="rounded-full h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {patient?.Firstname} {patient?.Lastname}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{patient?.phone || 'No phone provided'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{patient?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Patient ID: {patient?._id?.slice(-8)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Today's Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Pill className="h-5 w-5 mr-2 text-blue-600" />
            Create Prescription
          </h3>

          {/* Medicine Search Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={medicineSearch}
                  onChange={(e) => {
                    setMedicineSearch(e.target.value);
                    setShowMedicineSearch(e.target.value.length > 0);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search for medicines..."
                  onFocus={() => setShowMedicineSearch(medicineSearch.length > 0)}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowMedicineSearch(!showMedicineSearch)}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Medicine</span>
              </button>
            </div>

            {/* Medicine Search Results */}
            {showMedicineSearch && medicineSearch && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-h-60 overflow-y-auto bg-white">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.slice(0, 10).map((medicine) => (
                    <button
                      type="button"
                      key={medicine.id}
                      className="w-full text-left p-4 hover:bg-blue-50 border-b border-gray-100 flex items-center justify-between transition-colors"
                      onClick={() => handleAddMedicine(medicine)}
                    >
                      <div className="flex items-center space-x-3">
                        <Pill className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-gray-900">{medicine.brandName}</span>
                      </div>
                      <Plus className="h-4 w-4 text-blue-500" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No medicines found matching "{medicineSearch}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Medicines List */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-2">Selected Medicines:</h4>
            {selectedMedicines.length === 0 ? (
              <p className="text-gray-500">No medicines selected yet.</p>
            ) : (
              <ul className="space-y-2">
                {selectedMedicines.map((med) => (
                  <li
                    key={med.id}
                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                  >
                    <span>{med.brandName}</span>
                    <button
                      onClick={() => removeMedicine(med.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedMedicines.length === 0}
              className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-all duration-300 ${
                isSubmitting || selectedMedicines.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>
                {isSubmitting ? 'Submitting...' : 'Submit Prescription'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}