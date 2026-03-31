import { useState } from 'react';
import { prods } from '../data';

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null, errors: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus.error) setFormStatus({ ...formStatus, error: null, errors: [] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null, errors: [] });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setFormStatus({
          loading: false,
          success: false,
          error: data.message || 'Failed to submit form',
          errors: data.errors || []
        });
        return;
      }

      setFormStatus({
        loading: false,
        success: true,
        error: null,
        errors: []
      });

      setFormData({ name: '', company: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: null, errors: [] });
      }, 3000);
    } catch (err) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'Network error. Please try again or call us directly at +91 9003249933',
        errors: []
      });
    }
  };

  const featuredProds = prods.slice(0, 4);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-container">
          <div>
            <h1>Next-Gen Media Broadcasting Platform</h1>
            <p>Cutting-edge technology meets professional broadcasting. Empower your content with AI-driven tools, cloud infrastructure, and enterprise-grade broadcasting solutions.</p>
            <div className="hero-btns">
              <a href="#featured" className="btn-white">Get Started</a>
              <a href="#contact" className="btn-outline">Contact Us</a>
            </div>
          </div>
          <div className="hero-img">
            <div className="img-placeholder">📡</div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-section" id="services">
        <div className="container">
          <div className="sec-title">
            <h2>Our Core Services</h2>
            <p>End-to-end solutions for all your broadcasting and media production needs.</p>
          </div>
          <div className="services-grid">
            <div className="srv-card">
              <div className="srv-icon">🛒</div>
              <h3>Equipment Sales</h3>
              <p>Genuine, certified broadcast hardware, components, and spares from top brands.</p>
            </div>
            <div className="srv-card">
              <div className="srv-icon">🔧</div>
              <h3>Installation</h3>
              <p>Professional studio setup, transmitter configuration, and integration by certified engineers.</p>
            </div>
            <div className="srv-card">
              <div className="srv-icon">⚙️</div>
              <h3>Repair & Maintenance</h3>
              <p>24/7 technical support, AMC contracts, and rapid hardware troubleshooting.</p>
            </div>
            <div className="srv-card">
              <div className="srv-icon">💡</div>
              <h3>Consulting</h3>
              <p>Acoustic design, workflow optimisation, and regulatory compliance consulting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="prods py-section" id="featured">
        <div className="container">
          <div className="sec-title">
            <h2>Featured Products</h2>
            <p>Industry-standard equipment available for immediate dispatch across India.</p>
          </div>
          <div className="prod-grid">
            {featuredProds.map(p => (
              <div className="prod-card" key={p.id}>
                <div className="prod-img" style={{ overflow: 'hidden', background: p.bg }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='72'%3E${p.em}%3C/text%3E%3C/svg%3E`} />
                </div>
                <div className="prod-body">
                  <div className="prod-cat">{p.cat}</div>
                  <h4 className="prod-name">{p.name}</h4>
                  <p className="prod-desc">{p.desc}</p>
                  <button className="prod-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-section" id="why-us">
        <div className="container why-container">
          <div className="why-img">
            <div className="why-img-content">🎙️</div>
          </div>
          <div>
            <h2 className="why-h2">Why Choose Broadcastix?</h2>
            <p className="why-sub">We combine technical expertise with premium equipment to deliver reliable, high-performance broadcast setups.</p>
            <ul className="why-list">
              <li className="why-item">
                <div className="why-icon">✔</div>
                <div>
                  <h4>Certified Engineers</h4>
                  <p>Our team holds certifications from top OEM manufacturers.</p>
                </div>
              </li>
              <li className="why-item">
                <div className="why-icon">✔</div>
                <div>
                  <h4>Fast Installation</h4>
                  <p>We deploy standard studios in under 48 hours.</p>
                </div>
              </li>
              <li className="why-item">
                <div className="why-icon">✔</div>
                <div>
                  <h4>Affordable Pricing</h4>
                  <p>Direct industry partnerships mean lower costs for you.</p>
                </div>
              </li>
              <li className="why-item">
                <div className="why-icon">✔</div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Broadcasts never stop, and neither do we.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi py-section">
        <div className="container">
          <div className="sec-title">
            <h2>Client Success Stories</h2>
            <p>See why top broadcasters trust us with their critical infrastructure.</p>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <p className="testi-text">"Great service and fast installation! They set up our entire regional studio within a weekend without interrupting our schedule."</p>
              <div className="testi-auth">
                <div className="testi-av">R</div>
                <div>
                  <div className="testi-n">Rajesh Kumar</div>
                  <div className="testi-r">Technical Director, City FM</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-text">"The best equipment sourcing partner in India. Their knowledge of RF architecture saved us significant money on our new transmitter."</p>
              <div className="testi-auth">
                <div className="testi-av">A</div>
                <div>
                  <div className="testi-n">Ananya Sharma</div>
                  <div className="testi-r">Operations Head, NewsNow</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-text">"Reliable AMC support. Their engineers are available 24/7 and resolved our downtime issues within hours."</p>
              <div className="testi-auth">
                <div className="testi-av">V</div>
                <div>
                  <div className="testi-n">Vikram Patel</div>
                  <div className="testi-r">Chief Engineer, Vision Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <div className="container cta-container">
          <h2>Ready to upgrade your broadcasting setup?</h2>
          <p>Get a comprehensive quote tailored to your specific station requirements.</p>
          <a href="#contact" className="cta-btn">Get Quote Now</a>
        </div>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="contact py-section" id="contact">
        <div className="container contact-grid">
          <div className="c-info-card">
            <h3>Get in Touch</h3>
            <p>Our experts are ready to assist you with sales, installation, or technical support.</p>

            <div className="c-item">
              <div className="c-item-icon">📍</div>
              <div className="c-item-text">
                <h4>Office Location</h4>
                <p>No.14, Anna Salai,<br />Chennai – 600002, TN, India</p>
              </div>
            </div>

            <div className="c-item">
              <div className="c-item-icon">✉️</div>
              <div className="c-item-text">
                <h4>Email Us</h4>
                <p>sales@broadcastix.in<br />support@broadcastix.in</p>
              </div>
            </div>

            <div className="c-item">
              <div className="c-item-icon">📞</div>
              <div className="c-item-text">
                <h4>Call Us</h4>
                <p>+91 9003249933<br />Mon-Sat: 9am - 6:30pm</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Request a Quote</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fill out the form below and we'll get back to you within 24 hours.</p>

            {formStatus.success && (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #6ee7b7' }}>
                <strong>✓ Success!</strong> Your message has been sent. We'll contact you within 24 hours.
              </div>
            )}

            {formStatus.error && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
                <strong>✗ Error:</strong> {formStatus.error}
                {formStatus.errors.length > 0 && (
                  <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                    {formStatus.errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <form className="c-form" onSubmit={handleFormSubmit}>
              <div className="fc">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength="2"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company / Station"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="fc">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10+ digits) *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us about your requirements... *"
                value={formData.message}
                onChange={handleInputChange}
                required
                minLength="10"
              ></textarea>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '16px 32px', fontSize: '1.1rem', width: '100%' }}
                disabled={formStatus.loading}
              >
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="ft-grid">
            <div>
              <div className="logo ft-logo">
                <div style={{ background: 'var(--primary)', color: '#fff', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontSize: '1.2rem' }}>B</div>
                <div>Broad<span>castix</span></div>
              </div>
              <p className="ft-desc">India's trusted partner for modern broadcasting equipment, system integration, and uninterrupted media services.</p>
              <div className="ft-socials">
                <a href="#" className="ft-so">FB</a>
                <a href="#" className="ft-so">TW</a>
                <a href="#" className="ft-so">IN</a>
                <a href="#" className="ft-so">YT</a>
              </div>
            </div>

            <div className="ft-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#featured">Products</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="ft-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#">Warranty Info</a></li>
                <li><a href="#">AMC Portal</a></li>
              </ul>
            </div>

            <div className="ft-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Return Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="ft-bot">
            &copy; {new Date().getFullYear()} Broadcastix Solutions. All Rights Reserved. Designed for Professionals.
          </div>
        </div>
      </footer>
    </>
  );
}
