import { useState, useMemo } from 'react';
import { prods } from '../data';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['all', ...new Set(prods.map(p => p.cat))];

  const filteredProducts = useMemo(() => {
    let result = prods;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.cat === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rat - a.rat);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '30px', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>All Products</h1>

        {/* Search and Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem' }}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (Highest)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        {/* Products Grid */}
        <div className="prod-grid">
          {filteredProducts.map(p => (
            <div key={p.id} className="prod-card" onClick={() => setSelectedProduct(p)}>
              <div className="prod-img" style={{ overflow: 'hidden', background: p.bg }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'%3E${p.em}%3C/text%3E%3C/svg%3E`} />
              </div>
              <div className="prod-body">
                <div className="prod-cat">{p.cat}</div>
                <h4 className="prod-name">{p.name}</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '8px' }}>₹{p.price.toLocaleString('en-IN')}</div>
                {p.orig && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{p.orig.toLocaleString('en-IN')}</div>}
                <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '8px' }}>⭐ {p.rat}</div>
                <p className="prod-desc">{p.desc}</p>
                <button className="prod-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            No products found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedProduct(null)}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '40px', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <h2>{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', background: selectedProduct.bg }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; const fallback = document.createElement('div'); fallback.style.fontSize = '3rem'; fallback.innerHTML = selectedProduct.em; e.target.parentNode.appendChild(fallback); }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}>₹{selectedProduct.price.toLocaleString('en-IN')}</div>
              {selectedProduct.orig && <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{selectedProduct.orig.toLocaleString('en-IN')}</div>}
            </div>

            <div style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
              ⭐ {selectedProduct.rat} | Stock: {selectedProduct.stock ? '✓ Available' : '✗ Out of Stock'}
            </div>

            <p style={{ marginBottom: '20px', lineHeight: '1.6', color: 'var(--text-main)' }}>{selectedProduct.desc}</p>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '12px' }}>Specifications:</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {selectedProduct.specs.map((spec, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '8px', fontWeight: 600, width: '40%' }}>{spec[0]}</td>
                      <td style={{ padding: '8px', color: 'var(--text-muted)' }}>{spec[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn-primary" style={{ width: '100%' }} disabled={!selectedProduct.stock}>
              {selectedProduct.stock ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
