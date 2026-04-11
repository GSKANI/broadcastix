require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log('---------------------------');

  // Send email to admin
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Contact Request from ${name}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Received at:</strong> ${new Date().toLocaleString('en-IN')}</p>
    `
  };

  // Also send confirmation email to user
  const confirmationMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We received your inquiry - Broadcastix',
    html: `
      <h2>Thank you for contacting Broadcastix!</h2>
      <p>Hi ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Your Message Details:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p>Best regards,<br>Broadcastix Team</p>
    `
  };

  // Send emails
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending admin email:', err);
    } else {
      console.log('Admin email sent:', info.response);
    }
  });

  transporter.sendMail(confirmationMail, (err, info) => {
    if (err) {
      console.error('Error sending confirmation email:', err);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });

  // Return success response
  res.status(201).json({
    status: 'success',
    message: 'Your request has been received and a confirmation email has been sent. Our team will contact you within 24 hours.',
    data: {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      receivedAt: new Date().toISOString()
    }
  });
});

// Test email route
app.post('/api/test-email', (req, res) => {
  const testMail = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Broadcastix Email Configuration Test',
    html: '<h2>Email Configuration Test</h2><p>If you received this email, the Nodemailer configuration is working correctly!</p><p>Timestamp: ' + new Date().toLocaleString('en-IN') + '</p>'
  };

  transporter.sendMail(testMail, (err, info) => {
    if (err) {
      console.error('Test email error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to send test email: ' + err.message });
    }
    res.json({ status: 'success', message: 'Test email sent successfully to ' + process.env.RECEIVER_EMAIL });
  });
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
