require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

// Routes
// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running!' });
});

// Contact form submission route with validation
app.post('/api/contact', (req, res) => {
  const { name, company, email, phone, message } = req.body;

  // Validation
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email address is required');
  }

  if (!phone || !validatePhone(phone)) {
    errors.push('Valid phone number is required (10+ digits)');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  // Return validation errors
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors
    });
  }

  console.log('--- New Contact Request ---');
  console.log(`Name: ${name}`);
  console.log(`Company: ${company || 'N/A'}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);
  console.log('Timestamp: ${new Date().toISOString()}');
  console.log('---------------------------');

  // In a production environment, you would use a service like Nodemailer 
  // to send an actual email to your support teams here.

  // Simulate database or email service call
  setTimeout(() => {
    res.status(201).json({
      status: 'success',
      message: 'Your request has been received. Our team will contact you within 24 hours.',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        receivedAt: new Date().toISOString()
      }
    });
  }, 800);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Broadcastix Backend running on http://localhost:${PORT}`);
});
