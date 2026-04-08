import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, phone, subject, message } = formData;
    
    // Validate form
    if (!name || !email || !phone || !subject || !message) {
      alert('All fields are required');
      return;
    }

    const whatsappMessage = `*MISD Contact Form*%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0ASubject: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}`;

    window.location.href = `https://wa.me/9884106929?text=${whatsappMessage}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', padding: 'clamp(40px, 10vh, 80px) 20px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px' }}>Get in Touch</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', opacity: 0.9 }}>We're here to help with any questions or inquiries</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ marginBottom: '30px' }}>Contact Information</h2>

            {[
              {
                icon: '📞',
                title: 'Phone',
                details: ['Main: +91 9003249933', 'WhatsApp: +91 9003249933'],
                color: '#3b82f6'
              },
              {
                icon: '📧',
                title: 'Email',
                details: ['support@broadcastix.com', 'info@broadcastix.com'],
                color: '#10b981'
              },
              {
                icon: '📍',
                title: 'Address',
                details: ['123 Broadcast Street', 'Mumbai, Maharashtra 400001, India'],
                color: '#f59e0b'
              },
              {
                icon: '⏱️',
                title: 'Business Hours',
                details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
                color: '#8b5cf6'
              }
            ].map((item, idx) => (
              <div key={idx} style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                  <h3 style={{ margin: 0, color: item.color, fontWeight: 700 }}>{item.title}</h3>
                </div>
                {item.details.map((detail, i) => (
                  <p key={i} style={{ margin: '4px 0', color: 'var(--text-muted)', marginLeft: '36px' }}>
                    {detail}
                  </p>
                ))}
              </div>
            ))}

            {/* Social Links */}
            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '16px' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map((social, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--primary)';
                      e.target.style.color = '#fff';
                      e.target.style.border = 'none';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.color = 'inherit';
                      e.target.style.border = '1px solid var(--border)';
                    }}
                  >
                    {'📱🐦💼▶️'[idx]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '24px' }}>Send us a Message</h2>

            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', label: 'Full Name', type: 'text' },
                { name: 'email', label: 'Email Address', type: 'email' },
                { name: 'phone', label: 'Phone Number', type: 'tel' },
                { name: 'subject', label: 'Subject', type: 'text' }
              ].map(field => (
                <div key={field.name} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center', padding: '16px 32px', fontSize: '1.1rem' }}
              >
                <div style={{ fontSize: '1.4rem' }}>💬</div>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '2px solid var(--border)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              {
                q: 'What is your typical response time?',
                a: 'We aim to respond to all inquiries within 24 hours during business hours.'
              },
              {
                q: 'Do you provide technical support?',
                a: 'Yes, our technical support team is available 24/7 for emergency issues.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, bank transfers, and digital wallets.'
              },
              {
                q: 'Is there a warranty on products?',
                a: 'Yes, all products come with a 2-year comprehensive warranty.'
              },
              {
                q: 'Do you offer installation services?',
                a: 'Professional installation is available in Mumbai and can be arranged for other cities.'
              },
              {
                q: 'Can I return or exchange products?',
                a: 'Yes, we offer 30-day returns and exchanges on most products.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary)' }}>❓ {item.q}</h4>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
