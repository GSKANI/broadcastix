import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    cat: '',
    price: '',
    desc: ''
  });

  useEffect(() => {
    // Load data from localStorage
    const savedOrders = localStorage.getItem('broadcastix_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    // In a real app, this would go to backend
    alert('Product added (demo only)');
    setFormVisible(false);
    setNewProduct({ name: '', cat: '', price: '', desc: '' });
  };

  // Simulate stats
  const stats = {
    totalOrders: 245,
    totalRevenue: 2850000,
    totalCustomers: 189,
    pendingOrders: 12
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1>Admin Dashboard</h1>
          <button style={{ background: 'var(--primary)', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', borderBottom: '2px solid var(--border)' }}>
          {['Stats', 'Products', 'Orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.toLowerCase() ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.toLowerCase() ? '#fff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Total Orders', value: stats.totalOrders, icon: '📦' },
              { label: 'Total Revenue', value: '₹' + stats.totalRevenue.toLocaleString('en-IN'), icon: '💰' },
              { label: 'Total Customers', value: stats.totalCustomers, icon: '👥' },
              { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳' }
            ].map((stat, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{stat.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => setFormVisible(!formVisible)}
              style={{ background: 'var(--accent)', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', marginBottom: '20px' }}
            >
              + Add New Product
            </button>

            {formVisible && (
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                <form onSubmit={handleAddProduct}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.cat}
                      onChange={(e) => setNewProduct({ ...newProduct, cat: e.target.value })}
                      style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newProduct.desc}
                    onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', marginTop: '16px', height: '100px' }}
                    required
                  />
                  <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn-primary">Save Product</button>
                    <button type="button" onClick={() => setFormVisible(false)} style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: 'HD PTZ Camera', cat: 'Broadcasting', price: '₹128,000' },
                    { id: 2, name: 'FM Processor', cat: 'Broadcasting', price: '₹89,500' },
                    { id: 3, name: 'Audio Mixer', cat: 'Audio', price: '₹42,000' }
                  ].map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px' }}>{product.id}</td>
                      <td style={{ padding: '12px' }}>{product.name}</td>
                      <td style={{ padding: '12px' }}>{product.cat}</td>
                      <td style={{ padding: '12px' }}>{product.price}</td>
                      <td style={{ padding: '12px' }}>
                        <button style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '6px' }}>Edit</button>
                        <button style={{ background: '#fee2e2', color: '#991b1b', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            {orders.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No orders yet
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Customer</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px' }}>#{1000 + idx}</td>
                      <td style={{ padding: '12px' }}>{order.name}</td>
                      <td style={{ padding: '12px' }}>₹{order.total}</td>
                      <td style={{ padding: '12px' }}><span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>Pending</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
