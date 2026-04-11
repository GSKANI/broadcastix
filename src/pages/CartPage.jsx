import { useState, useEffect } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('broadcastix_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('broadcastix_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, qty) => {
    if (qty < 1) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode === 'BROADCAST10') {
      setDiscount(0.1);
    } else if (couponCode === 'PRO20') {
      setDiscount(0.2);
    } else {
      alert('Coupon code not valid');
      setCouponCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.18;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + tax;

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h1 style={{ marginBottom: '12px' }}>Your cart is empty</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Browse our products and add them to your cart to get started</p>
          <a href="/products" className="btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
          {/* Cart Items */}
          <div>
            {cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 80px',
                  gap: '20px',
                  alignItems: 'center',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '2rem', textAlign: 'center' }}>{item.em}</div>

                <div>
                  <h3 style={{ marginBottom: '4px', fontSize: '1rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.cat}</p>
                  <p style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{item.price.toLocaleString('en-IN')}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    style={{ width: '100%', padding: '6px', border: '1px solid var(--border)', borderRadius: '4px', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Order Summary</h2>

            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--accent)', fontWeight: 600 }}>
                  <span>Discount ({Math.round(discount * 100)}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px' }}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Coupon Code</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="BROADCAST10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  style={{ flex: 1, padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}
                />
                <button
                  onClick={applyCoupon}
                  style={{ background: 'var(--secondary)', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Apply
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Try: BROADCAST10 (10% off) or PRO20 (20% off)
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginBottom: '12px' }}>Proceed to Checkout</button>
            <a href="/products" style={{ display: 'block', textAlign: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
