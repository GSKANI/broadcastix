import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import FAQPage from './pages/FAQPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import NotFoundPage from './pages/NotFoundPage';

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo">
            <div style={{ background: 'var(--primary)', color: '#fff', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>B</div>
            <div>Broad<span>castix</span></div>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="hd">
            <Link to="/cart" style={{ position: 'relative' }}>🛒</Link>
            <Link to="/auth" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Login</Link>
          </div>
          <button className="mob-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* FLOATING ACTION BUTTONS */}
      <a href="https://wa.me/919003249933" target="_blank" rel="noreferrer" className="wa-float" title="Contact on WhatsApp">
        ✆
      </a>

      {/* MOBILE CALL BUTTON */}
      <a href="tel:+91 9003249933" className="call-float-mob">
        <span>📞</span> Call Us Now
      </a>

      {/* MOBILE MENU DRAWER */}
      <div className={`mob-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mob-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mob-header">
          <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div style={{ background: 'var(--primary)', color: '#fff', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>B</div>
            <div>Broad<span>castix</span></div>
          </Link>
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>
        <div className="mob-links">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
        </div>
      </div>
    </>
  );
}

// Main App Component
function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

// Router Wrapper
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
