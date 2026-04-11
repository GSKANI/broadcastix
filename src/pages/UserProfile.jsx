import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '9003249933',
    address: '123 Broadcast Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipcode: '400001'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load user and orders from localStorage
    const savedUser = localStorage.getItem('broadcastix_user');
    const savedOrders = localStorage.getItem('broadcastix_orders');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setEditData(parsedUser);
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleSaveProfile = () => {
    setUser(editData);
    localStorage.setItem('broadcastix_user', JSON.stringify(editData));
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '30px' }}>My Profile</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Profile Card */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{ background: 'var(--primary)', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Full Name"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  placeholder="Email"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  placeholder="Phone"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  placeholder="Address"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  value={editData.city}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                  placeholder="City"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  value={editData.state}
                  onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                  placeholder="State"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  value={editData.zipcode}
                  onChange={(e) => setEditData({ ...editData, zipcode: e.target.value })}
                  placeholder="Zipcode"
                  style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}
                />
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Name</div>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Phone</div>
                  <div>{user.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Address</div>
                  <div>{user.address}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>City/State/Zip</div>
                  <div>{user.city}, {user.state} {user.zipcode}</div>
                </div>
              </div>
            )}
          </div>

          {/* Account Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Total Orders', value: orders.length, icon: '📦', color: '#3b82f6' },
              { label: 'Member Since', value: '2024', icon: '📅', color: '#10b981' },
              { label: 'Account Status', value: 'Active', icon: '✓', color: '#4ade80' }
            ].map((stat, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: stat.color }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div style={{ marginTop: '40px', background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: '20px' }}>Order History</h2>
          
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🛍️</div>
              <p>No orders yet. Start shopping!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Items</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px' }}>#{1000 + idx}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>₹{order.total}</td>
                      <td style={{ padding: '12px' }}>{order.cartCount} item(s)</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button style={{ padding: '16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
            🛒 Continue Shopping
          </button>
          <button style={{ padding: '16px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            ❤️ My Wishlist
          </button>
          <button style={{ padding: '16px', background: '#f3f4f6', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            ⚙️ Account Settings
          </button>
          <button style={{ padding: '16px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
