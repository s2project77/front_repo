
// pages/api/messages.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { message, patientId, timestamp } = req.body;
      
      // Validate input
      if (!message || !patientId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Here, you would typically:
      // 1. Connect to your database
      // 2. Save the message
      // 3. Associate it with the patient
      
      // For this example, we'll simulate a successful response
      const savedMessage = {
        id: Date.now(),
        content: message,
        patientId: patientId,
        timestamp: timestamp,
        read: false
      };
      
      // Return the saved message
      return res.status(201).json(savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }