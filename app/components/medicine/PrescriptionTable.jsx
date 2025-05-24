import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Mail,
  Pill,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function PrescriptionTable({ prescriptions, onEdit, onDelete }) {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPrescription) return;

    setDeletingId(selectedPrescription._id);
    try {
      await onDelete(selectedPrescription._id);
      setShowDeleteModal(false);
      setSelectedPrescription(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDetailsClick = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (prescriptions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Pill className="text-blue-500" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Prescriptions Found
        </h3>
        <p className="text-gray-600">
          You haven't created any prescriptions yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>Patient</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>Contact</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Pill size={16} />
                    <span>Medicines</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Date</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prescriptions.map((prescription, index) => (
                <tr
                  key={prescription._id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {prescription.user?.Firstname?.charAt(0)}
                        {prescription.user?.Lastname?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {prescription.user?.Firstname}{" "}
                          {prescription.user?.Lastname}
                        </div>
                        <div className="text-sm text-gray-500">
                          Patient #{index + 1}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {prescription.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {prescription.medicines.slice(0, 2).map((med) => (
                        <div
                          key={med._id}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            <span className="font-medium">{med.brandName}</span>
                            <span className="text-gray-500">
                              {" "}
                              ({med.genericName})
                            </span>
                          </span>
                        </div>
                      ))}
                      {prescription.medicines.length > 2 && (
                        <div className="text-xs text-blue-600 font-medium">
                          +{prescription.medicines.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(prescription.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleDetailsClick(prescription)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 hover:scale-105 transform"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(prescription)}
                        className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors duration-200 hover:scale-105 transform"
                        title="Edit Prescription"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(prescription)}
                        disabled={deletingId === prescription._id}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Prescription"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Prescription
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the prescription for{" "}
              <span className="font-semibold">
                {selectedPrescription.user?.Firstname}{" "}
                {selectedPrescription.user?.Lastname}
              </span>
              ?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Prescription Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <User size={18} className="text-blue-600" />
                  <span>Patient Info</span>
                </h4>
                <p className="text-sm text-gray-600">Name: {selectedPrescription.user?.Firstname} {selectedPrescription.user?.Lastname}</p>
                <p className="text-sm text-gray-600">Email: {selectedPrescription.user?.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <Pill size={18} className="text-green-600" />
                  <span>Medicines</span>
                </h4>
                {selectedPrescription.medicines.map((med, i) => (
                  <div key={med._id} className="mb-3">
                    <p className="text-sm text-gray-800 font-medium">{med.brandName} ({med.genericName})</p>
                    <p className="text-xs text-gray-500">Form: {med.form}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <Calendar size={18} className="text-purple-600" />
                  <span>Date</span>
                </h4>
                <p className="text-sm text-gray-700">{formatDate(selectedPrescription.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
