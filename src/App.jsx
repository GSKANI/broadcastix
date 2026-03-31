import { useState, useEffect } from 'react';
import './index.css';
import { prods } from './data';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProds = prods.slice(0, 4);

  return (
    <>
      {/* 1. NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <div style={{ background: 'var(--primary)', color: '#fff', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>B</div>
            <div>Broad<span>castix</span></div>
          </a>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#why-us">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="btn-primary hd" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Get Quote
          </button>
          <button className="mob-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="container hero-container">
          <div>
            <h1>Broadcast Solutions That Power Your Business</h1>
            <p>We provide professional broadcasting equipment, installation, and maintenance services across India.</p>
            <div className="hero-btns">
              <button className="btn-white" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
              <button className="btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact Us</button>
            </div>
          </div>
          <div className="hero-img">
            <div className="img-placeholder">📡</div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
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

      {/* 4. PRODUCTS SECTION */}
      <section className="prods py-section" id="products">
        <div className="container">
          <div className="sec-title">
            <h2>Featured Products</h2>
            <p>Industry-standard equipment available for immediate dispatch across India.</p>
          </div>
          <div className="prod-grid">
            {featuredProds.map(p => (
              <div className="prod-card" key={p.id}>
                <div className="prod-img">{p.em}</div>
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

      {/* 5. WHY CHOOSE US */}
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

      {/* 6. TESTIMONIALS */}
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

      {/* 7. CALL TO ACTION */}
      <section className="cta">
        <div className="container cta-container">
          <h2>Ready to upgrade your broadcasting setup?</h2>
          <p>Get a comprehensive quote tailored to your specific station requirements.</p>
          <button className="cta-btn" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Get Quote Now</button>
        </div>
      </section>

      {/* CONTACT FORM & LOC */}
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
                <p>+91 98765 43210<br />Mon-Sat: 9am - 6:30pm</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Request a Quote</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fill out the form below and we'll get back to you within 24 hours.</p>

            <form className="c-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll contact you soon."); }}>
              <div className="fc">
                <input type="text" placeholder="Full Name *" required />
                <input type="text" placeholder="Company / Station" />
              </div>
              <div className="fc">
                <input type="email" placeholder="Email Address *" required />
                <input type="tel" placeholder="Phone Number *" required />
              </div>
              <textarea placeholder="Tell us about your requirements... *" required></textarea>
              <button type="submit" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
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
                <li><a href="#">About Us</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="ft-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#">Technical FAQs</a></li>
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

      {/* FLOATING ACTION BUTTONS */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="wa-float" title="Contact on WhatsApp">
        ✆
      </a>

      {/* MOBILE CALL BUTTON */}
      <a href="tel:+91 90940 24982" className="call-float-mob">
        <span>📞</span> Call Us Now
      </a>

      {/* MOBILE MENU DRAWER */}
      <div className={`mob-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mob-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mob-header">
          <div className="logo">
            <div style={{ background: 'var(--primary)', color: '#fff', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>B</div>
            <div>Broad<span>castix</span></div>
          </div>
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>
        <div className="mob-links">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
          <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <div className="mob-actions">
          <button className="btn-primary" style={{ width: '100%', marginBottom: '16px' }} onClick={() => { setIsMobileMenuOpen(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Get Quote</button>
        </div>
      </div>

    </>
  );
}

export default App;
