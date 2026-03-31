import { useState } from 'react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 1,
      title: 'Equipment Sales',
      icon: '📦',
      description: 'Wide range of professional broadcasting equipment',
      features: [
        'HD PTZ Cameras',
        'Professional Audio Mixers',
        'Video Switchers',
        'FM Transmitters',
        'Cable & Connectors',
        'Accessories'
      ]
    },
    {
      id: 2,
      title: 'Installation & Setup',
      icon: '🔧',
      description: 'Expert installation and configuration services',
      features: [
        'Site assessment and planning',
        'Professional installation',
        'System configuration',
        'Testing and calibration',
        'Staff training',
        'Troubleshooting'
      ]
    },
    {
      id: 3,
      title: 'Maintenance & Support',
      icon: '🛠️',
      description: '24/7 technical support for all equipment',
      features: [
        'Regular maintenance plans',
        '24/7 emergency support',
        'Spare parts supply',
        'Remote diagnostics',
        'On-site repairs',
        'Performance monitoring'
      ]
    },
    {
      id: 4,
      title: 'System Design',
      icon: '📐',
      description: 'Custom broadcasting solutions',
      features: [
        'Needs assessment',
        'System architecture',
        'Equipment selection',
        'Network design',
        'Scalability planning',
        'Cost optimization'
      ]
    },
    {
      id: 5,
      title: 'Staff Training',
      icon: '👨‍🏫',
      description: 'Professional training programs',
      features: [
        'Basic operation training',
        'Advanced technical courses',
        'Safety protocols',
        'Equipment-specific training',
        'Online courses available',
        'Certification programs'
      ]
    },
    {
      id: 6,
      title: 'Consultation',
      icon: '💼',
      description: 'Expert consulting for broadcasting projects',
      features: [
        'Industry expertise',
        'Technology recommendations',
        'Budget planning',
        'Timeline management',
        'Quality assurance',
        'Project delivery'
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', padding: 'clamp(40px, 10vh, 80px) 20px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px' }}>Our Services</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', opacity: 0.9 }}>Complete broadcasting solutions from equipment to expertise</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {services.map((service, idx) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(idx)}
              style={{
                background: '#fff',
                padding: '28px',
                borderRadius: '12px',
                border: '2px solid ' + (selectedService === idx ? 'var(--primary)' : 'var(--border)'),
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (selectedService !== idx) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedService !== idx) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{service.icon}</div>
              <h3 style={{ margin: '12px 0', fontWeight: 700 }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Service Details */}
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                {services[selectedService].icon}
              </div>
              <h2 style={{ marginBottom: '12px' }}>
                {services[selectedService].title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {services[selectedService].description}
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: '20px' }}>Key Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {services[selectedService].features.map((feature, idx) => (
                  <li key={idx} style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px' }}>
            <button className="btn-primary">Get Quote</button>
            <button style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: '8px', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Choose Broadcastix?</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px' }}>
            {[
              {
                icon: '⭐',
                title: 'Industry Experts',
                desc: '20+ years of broadcasting experience'
              },
              {
                icon: '🛡️',
                title: 'Trusted Quality',
                desc: 'Premium equipment from trusted brands'
              },
              {
                icon: '💰',
                title: 'Best Pricing',
                desc: 'Competitive rates with flexible payment options'
              },
              {
                icon: '📞',
                title: '24/7 Support',
                desc: 'Round-the-clock customer support'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                desc: 'Quick delivery and installation'
              },
              {
                icon: '✅',
                title: 'Warranties',
                desc: '2-year comprehensive warranty coverage'
              }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                <h4 style={{ marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Packages */}
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Service Packages</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                name: 'Starter',
                price: '₹5,000',
                period: '/month',
                features: ['Basic support', 'Monthly maintenance', 'Email support'],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹15,000',
                period: '/month',
                features: ['Priority support', 'Weekly maintenance', '24/7 phone support', 'System monitoring'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹50,000',
                period: '/month',
                features: ['Dedicated support', 'Daily maintenance', '24/7 access', 'Custom solutions'],
                popular: false
              }
            ].map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  background: pkg.popular ? 'linear-gradient(135deg, var(--primary), var(--accent))' : '#fff',
                  padding: '30px',
                  borderRadius: '12px',
                  border: pkg.popular ? 'none' : '1px solid var(--border)',
                  color: pkg.popular ? '#fff' : 'inherit',
                  position: 'relative'
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#fbbf24', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                    POPULAR
                  </div>
                )}

                <h3 style={{ marginBottom: '8px' }}>{pkg.name}</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>
                  {pkg.price}
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{pkg.period}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: '20px 0 20px 0' }}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✓</span> {feat}
                    </li>
                  ))}
                </ul>

                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: pkg.popular ? '#fff' : 'var(--primary)',
                  color: pkg.popular ? 'var(--primary)' : '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
