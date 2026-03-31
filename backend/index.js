require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running!' });
});

// Contact form submission route
app.post('/api/contact', (req, res) => {
  const { name, company, email, phone, message } = req.body;

  console.log('--- New Contact Request ---');
  console.log(`Name: ${name}`);
  console.log(`Company: ${company || 'N/A'}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------');

  // In a production environment, you would use a service like Nodemailer 
  // to send an actual email to your support teams here.

  // Using a timeout to simulate a database or email service call
  setTimeout(() => {
    res.status(201).json({ 
      status: 'success', 
      message: 'Your request has been received. Our team will contact you shortly.' 
    });
  }, 1000);
});

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Broadcastix Backend running on http://localhost:${PORT}`);
});
