
// pages/api/medications.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { medicineName, patientId } = req.body;
      
      // Validate input
      if (!medicineName || !patientId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Here, you would typically:
      // 1. Connect to your database
      // 2. Insert the new medication record
      // 3. Associate it with the patient
      
      // For this example, we'll simulate a successful response
      const newMedicine = {
        id: Date.now(),
        name: medicineName,
        patientId: patientId,
        createdAt: new Date().toISOString()
      };
      
      // Return the created medication
      return res.status(201).json(newMedicine);
    } catch (error) {
      console.error('Error adding medication:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  