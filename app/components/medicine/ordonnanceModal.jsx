// components/OrdonnanceModal.js
import { useState } from 'react';

export default function OrdonnanceModal({ patient, doctorId, onClose, onSave }) {
  const [medications, setMedications] = useState([
    { name: '', dosage: '', duration: '' }
  ]);
  const [notes, setNotes] = useState('');

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', duration: '' }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/ordonnances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: patient.id,
          doctorId,
          medications,
          notes
        })
      });
      
      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving ordonnance:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          New Prescription for {patient.name}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Medications</h3>
            {medications.map((med, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Medication name"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMedication}
              className="text-blue-500 text-sm mt-2"
            >
              + Add another medication
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block font-medium mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded w-full"
              rows="3"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}