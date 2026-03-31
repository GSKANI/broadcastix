import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    if (isLogin) {
      // Login logic
      if (!formData.email || !formData.password) {
        setErrors(['Email and password are required']);
        return;
      }
      // Save to localStorage (demo)
      localStorage.setItem('broadcastix_user', JSON.stringify({ email: formData.email, name: 'User' }));
      setSuccess(true);
      setTimeout(() => window.location.href = '/', 1500);
    } else {
      // Signup logic
      const newErrors = [];
      if (!formData.name || formData.name.length < 2) newErrors.push('Name must be at least 2 characters');
      if (!formData.email) newErrors.push('Email is required');
      if (!formData.password || formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
      if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      // Save to localStorage (demo)
      localStorage.setItem('broadcastix_user', JSON.stringify({ email: formData.email, name: formData.name }));
      setSuccess(true);
      setTimeout(() => window.location.href = '/', 1500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', maxWidth: '500px', width: '90%', padding: '40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>

        {success && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #6ee7b7' }}>
            ✓ {isLogin ? 'Login successful!' : 'Account created!'} Redirecting...
          </div>
        )}

        {errors.length > 0 && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
            <strong>Errors:</strong>
            <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
              />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors([]);
              setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <strong>Demo Credentials:</strong>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
          <p style={{ marginTop: '12px', color: '#f59e0b' }}>💡 This is a demo. Data is stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
}
