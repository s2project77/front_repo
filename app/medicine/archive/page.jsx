"use client";
import React, { useEffect, useState } from "react";
import PrescriptionTable from "@/app/components/medicine/PrescriptionTable";
import Layout from "@/app/components/medcine_layout/layout";
import Sidebar from "../../components/medicine/mainpage/sidebar";
import EditPrescriptionModal from "@/app/components/medicine/EditModel";
import {
  Loader2, AlertCircle, Wifi, WifiOff, RefreshCw,
  CheckCircle, XCircle, Edit, Plus
} from "lucide-react";

export default function PrescriptionArchive() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/doctors/myPrescriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch prescriptions");

      const data = await response.json();
      setPrescriptions(data.data.prescriptions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (prescriptionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/prescriptions/${prescriptionId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete prescription");

      setPrescriptions(prev => prev.filter(p => p._id !== prescriptionId));
      showNotification("Prescription deleted successfully", "success");
    } catch (error) {
      showNotification("Failed to delete prescription", "error");
    }
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
    setShowEditModal(true);
  };

  const handleUpdatePrescription = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/prescriptions/${editingPrescription._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update prescription");
      }

      const data = await response.json();

      setPrescriptions(prev =>
        prev.map(p =>
          p._id === editingPrescription._id ? { ...p, ...data.data } : p
        )
      );

      setShowEditModal(false);
      setEditingPrescription(null);
      showNotification("Prescription updated successfully", "success");

      // Optionally refresh data:
      // await fetchPrescriptions();

    } catch (error) {
      console.error('Update error:', error);
      showNotification(error.message || "Failed to update prescription", "error");
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchPrescriptions();
  };

  useEffect(() => {
    fetchPrescriptions();

    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const LoadingScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 animate-bounce">
                <Loader2 className="animate-spin" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Your Dashboard</h2>
              <p className="text-gray-600">Fetching your prescription information...</p>
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
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Connection Error</h2>
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
              <span>{retryCount > 0 ? `Retry (${retryCount})` : "Try Again"}</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg backdrop-blur-xl border ${
              notification.type === 'success'
                ? 'bg-green-50/90 border-green-200 text-green-800'
                : notification.type === 'error'
                ? 'bg-red-50/90 border-red-200 text-red-800'
                : 'bg-blue-50/90 border-blue-200 text-blue-800'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : notification.type === 'error' ? (
                <XCircle size={20} className="text-red-600" />
              ) : (
                <AlertCircle size={20} className="text-blue-600" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[300px_1fr] md:grid-cols-[250px_1fr] grid-cols-1 gap-6">
          <div className="lg:block hidden sticky top-6 h-fit">
            <Sidebar color="blue" />
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Prescription Archive</h1>
                <p className="text-gray-600">Manage and view all your prescriptions</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 px-4 py-2 rounded-xl">
                  <span className="text-sm font-medium text-blue-700">
                    {prescriptions.length} Prescription{prescriptions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <Plus size={18} />
                  <span>New Prescription</span>
                </button>
              </div>
            </div>
            <PrescriptionTable 
              prescriptions={prescriptions} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Edit Modal */}
        <EditPrescriptionModal
          prescription={editingPrescription}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingPrescription(null);
          }}
          onUpdate={handleUpdatePrescription}
          showNotification={showNotification}
        />
      </div>
    </Layout>
  );
}
