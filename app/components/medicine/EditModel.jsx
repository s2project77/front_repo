import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Edit, Plus, Trash2, X, Save, Search, AlertCircle, Loader2
} from 'lucide-react';

const EditPrescriptionModal = ({
  prescription,
  isOpen,
  onClose,
  onUpdate,
  showNotification
}) => {
  const router = useRouter();

  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  useEffect(() => {
    if (prescription) {
      setMedicines(prescription.medicines || []);
    }
  }, [prescription]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/medicines/getAllMedicines");
        if (!res.ok) throw new Error("Failed to fetch medicines");
        const data = await res.json();
        const simplified = data.data.data.map((med) => ({
          _id: med._id,
          brandName: med.brandName,
          genericName: med.genericName,
          form: med.form,
        }));
        setAllMedicines(simplified);
      } catch (err) {
        console.error("Failed to load medicines:", err);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = allMedicines.filter((med) =>
    med.brandName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !medicines.some((m) => m._id === med._id)
  );

  const addMedicine = (medicine) => {
    setMedicines((prev) => [...prev, medicine]);
    setSearchTerm('');
    setShowAddMedicine(false);
    showNotification('Medicine added', 'success');
  };

  const removeMedicine = (medicineId) => {
    setMedicines((prev) => prev.filter((med) => med._id !== medicineId));
    showNotification('Medicine removed', 'success');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = {
        medicines: medicines.map((m) => m._id),
      };
      await onUpdate(updatedData);
      onClose();
      showNotification("Prescription updated", "success");
      router.refresh();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !prescription) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Edit className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Edit Prescription</h3>
              <p className="text-sm text-gray-600">
                Patient: {prescription.user?.Firstname} {prescription.user?.Lastname}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Add Medicine */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Medicines</h4>
              <button
                onClick={() => setShowAddMedicine(!showAddMedicine)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Medicine</span>
              </button>
            </div>

            {showAddMedicine && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {searchTerm && filteredMedicines.length > 0 && (
                  <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow">
                    {filteredMedicines.map((medicine) => (
                      <button
                        type="button"
                        key={medicine._id}
                        onClick={() => addMedicine(medicine)}
                        className="w-full text-left p-3 hover:bg-blue-50 border-b last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{medicine.brandName}</div>
                        <div className="text-sm text-gray-600">
                          {medicine.genericName} • {medicine.form}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Current Medicines */}
          {medicines.length === 0 ? (
            <div className="text-center py-10 text-gray-500 flex flex-col items-center">
              <AlertCircle size={32} className="text-gray-400 mb-2" />
              No medicines in this prescription
            </div>
          ) : (
            <div className="space-y-3">
              {medicines.map((medicine) => (
                <div
                  key={medicine._id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-3"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{medicine.brandName}</div>
                    <div className="text-sm text-gray-600">
                      {medicine.genericName} • {medicine.form}
                    </div>
                  </div>
                  <button
                    onClick={() => removeMedicine(medicine._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPrescriptionModal;
