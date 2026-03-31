import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the warranty on broadcasting equipment?',
      a: 'All our products come with a minimum 1-year manufacturer\'s warranty. Extended warranty options (3-5 years) are available for most equipment.'
    },
    {
      q: 'Do you provide installation services?',
      a: 'Yes! We offer professional installation services for all major equipment. Our certified engineers will set up your complete broadcast studio within 48 hours.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 7-day return policy for unopened products and 14-day returns for installation/setup issues. All returns must include original packaging.'
    },
    {
      q: 'Can you help with technical consulting?',
      a: 'Absolutely! Our technical team provides free initial consultation for system design and optimization. Detailed consulting services are available on contract basis.'
    },
    {
      q: 'Do you offer payment plans?',
      a: 'Yes, we provide flexible payment plans through partner financial institutions. EMI options are available for purchases above ₹50,000.'
    },
    {
      q: 'What brands do you stock?',
      a: 'We carry authentic products from Harris, RVR, Nautel, Broadcast Electronics, Sony, Shure, and other leading broadcast equipment manufacturers.'
    },
    {
      q: 'Is 24/7 technical support available?',
      a: 'Yes! We provide 24/7 technical support via phone, email, and WhatsApp. Premium AMC customers get priority support.'
    },
    {
      q: 'Can I request custom setups?',
      a: 'We specialize in custom broadcast studio setups tailored to your specific requirements. Contact our team for a custom quote.'
    },
    {
      q: 'Do you ship across India?',
      a: 'Yes, we ship across India with door-step delivery. We partner with major logistics providers to ensure safe delivery.'
    },
    {
      q: 'What if equipment fails after purchase?',
      a: 'We have a rapid replacement program for defective units. Failed equipment is replaced within 24-48 hours during warranty period.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>Frequently Asked Questions</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
          Find answers to common questions about our products, services, and support.
        </p>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                marginBottom: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                boxShadow: openIndex === idx ? 'var(--shadow-md)' : 'none'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: openIndex === idx ? 'var(--bg-light)' : '#fff',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  transition: 'all 0.3s'
                }}
              >
                {faq.q}
                <span style={{ transition: 'transform 0.3s', transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
              </button>

              {openIndex === idx && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--border)', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: '12px', padding: '40px', marginTop: '60px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '12px' }}>Couldn't find your answer?</h2>
          <p style={{ marginBottom: '24px', opacity: 0.9 }}>Our support team is ready to help you 24/7</p>
          <a href="#contact" style={{ background: '#fff', color: 'var(--primary)', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
