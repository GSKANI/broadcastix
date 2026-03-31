import { useState, useEffect } from 'react';
import './index.css';
import { prods } from './data';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState('');
  const [modalProd, setModalProd] = useState(null);
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBtt(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const addToCart = (id, e) => {
    if (e) e.stopPropagation();
    let p;
    if (id === 99) {
      p = { id: 99, name: 'Pro Transmitter TX-9000', cat: 'Broadcasting', em: '📡', price: 485000, stock: true };
    } else {
      p = prods.find(x => x.id === id);
    }
    if (!p || !p.stock) return;

    setCart(prev => {
      const ex = prev.find(c => c.id === id);
      if (ex) {
        return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...p, qty: 1 }];
    });

    showToast(p.name + ' added to cart');
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, qty: c.qty + delta };
      }
      return c;
    }).filter(c => c.qty > 0));
  };

  const toggleWish = (id, e) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(x => x !== id));
    } else {
      setWishlist(prev => [...prev, id]);
      showToast('Added to Wishlist ♡');
    }
  };

  const openModal = (id) => {
    const p = prods.find(x => x.id === id);
    if (!p) return;
    setModalProd(p);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalProd(null);
    document.body.style.overflow = '';
  };

  const filteredProds = filter === 'all' ? prods : prods.filter(p => p.cat.includes(filter));

  const searchResults = searchQuery ? prods.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5) : [];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(e.target.value.trim().length > 0);
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-search')) setIsSearchOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="grid-bg"></div>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="tb-l">
          <span>📍 Chennai, Tamil Nadu</span>
          <span>📞 +91 98765 43210</span>
          <span>⏱ Mon–Sat 9am–6:30pm</span>
        </div>
        <div className="tb-r">
          <a href="#">Track Order</a>
          <a href="#">B2B Enquiry</a>
          <a href="#contact">Support</a>
        </div>
      </div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="logo-hex">B</div>
          <div className="logo-txt">Broad<span>castix</span></div>
        </a>
        <div className="nav-search" id="navSearch">
          <input
            type="text"
            className="ns-input"
            placeholder="Search products, parts, brands…"
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => { if (searchQuery) setIsSearchOpen(true) }}
          />
          <button className="ns-btn">🔍</button>
          <div className={`search-dd ${isSearchOpen && searchResults.length > 0 ? 'open' : ''}`}>
            {searchResults.map(p => (
              <div key={p.id} className="s-item" onClick={() => { openModal(p.id); setIsSearchOpen(false); setSearchQuery(''); }}>
                <div className="si-em">{p.em}</div>
                <div>
                  <div className="si-n">{p.name}</div>
                  <div className="si-c">{p.cat}</div>
                </div>
                <div className="si-p">₹{p.price.toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#cats">Categories</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#why">Why Us</a></li>
          <li><a href="#testimonials">Reviews</a></li>
        </ul>
        <div className="nav-icons">
          <button className="ib" onClick={() => setIsCartOpen(true)}>
            🛒<span className="nbadge">{cartCount}</span>
          </button>
          <button className="ib" onClick={() => { window.location.hash = '#products'; showToast('Scroll to products to see Wishlist'); }}>♡</button>
        </div>
      </nav>

      {/* BOTTOM NAV BAR (Mobile Only) */}
      <div className="bottom-nav">
        <a href="#" className="bn-item active">
          <span className="bn-icon">🏠</span>
          <span className="bn-lbl">Home</span>
        </a>
        <a href="#cats" className="bn-item">
          <span className="bn-icon">📑</span>
          <span className="bn-lbl">Categories</span>
        </a>
        <a href="#contact" className="bn-item">
          <span className="bn-icon">💬</span>
          <span className="bn-lbl">Contact</span>
        </a>
        <div className="bn-item" onClick={() => { window.location.hash = '#products'; showToast('Scroll to products to see Wishlist'); }}>
          <span className="bn-icon">♡</span>
          <span className="bn-lbl">Wishlist</span>
        </div>
        <div className="bn-item" onClick={() => setIsCartOpen(true)}>
          <span className="bn-icon">🛒</span>
          <span className="bn-lbl">Cart</span>
          {cartCount > 0 && <span className="nbadge" style={{ top: '-8px', right: '10px' }}>{cartCount}</span>}
        </div>
      </div>

      {/* WHATSAPP */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="wa-float">
        💬
      </a>

      {/* BTT */}
      <button className={`btt ${showBtt ? 'vis' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-l">
          <div className="h-tag">🔴 LIVE · Professional Broadcasting Store</div>
          <h1 className="h-title">
            <span className="ht1">FEELS LIKE a</span>
            <span className="ht2">Media-tech</span>
            <span className="ht3">platform.</span>
          </h1>
          <p className="h-sub">India's premier destination for professional broadcasting equipment, electronic components, and genuine spare parts. Trusted by studios, stations & engineers nationwide.</p>
          <div className="h-ctas">
            <button className="btn-b" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Shop Now →</button>
            <button className="btn-g" onClick={() => document.getElementById('cats').scrollIntoView({ behavior: 'smooth' })}>Browse Categories</button>
          </div>

        </div>
        <div className="hero-r">
          <div className="hv">
            <div className="hv-r1 hv-ring"></div>
            <div className="hv-r2 hv-ring"></div>
            <div className="hv-cx"></div><div className="hv-cy"></div>
            <div className="hv-center"><div className="hv-ci">📡</div></div>
            <div className="hv-nodes">
              <div className="hvn n1"><div className="hvn-i">📺</div><div className="hvn-l">Video</div></div>
              <div className="hvn n2"><div className="hvn-i">🎙</div><div className="hvn-l">Audio</div></div>
              <div className="hvn n3"><div className="hvn-i">⚡</div><div className="hvn-l">Power</div></div>
              <div className="hvn n4"><div className="hvn-i">🔧</div><div className="hvn-l">Parts</div></div>
            </div>
          </div>
        </div>
      </section>



      {/* CATEGORIES */}
      <section className="sec" id="cats">
        <div className="sec-hd reveal">
          <div><div className="ey">Explore Range</div><h2 className="st">Shop by <span className="c">Category</span></h2></div>
          <button className="va" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>All Categories →</button>
        </div>
        <div className="cat-grid reveal">
          <div className="cat-card" onClick={() => { setFilter('Broadcasting'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">📡</div>
            <div className="cc-body"><span className="cc-icon">📡</span><div className="cc-name">Broadcasting</div><div className="cc-cnt">1,240 products</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
          <div className="cat-card" onClick={() => { setFilter('Audio'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">🎙</div>
            <div className="cc-body"><span className="cc-icon">🎙</span><div className="cc-name">Audio & Mixers</div><div className="cc-cnt">876 products</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
          <div className="cat-card" onClick={() => { setFilter('Video'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">📺</div>
            <div className="cc-body"><span className="cc-icon">📺</span><div className="cc-name">Video Systems</div><div className="cc-cnt">654 products</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
          <div className="cat-card" onClick={() => { setFilter('Electronics'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">🔌</div>
            <div className="cc-body"><span className="cc-icon">🔌</span><div className="cc-name">Electronic Components</div><div className="cc-cnt">3,200+ parts</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
          <div className="cat-card" onClick={() => { setFilter('Spare Part'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">🔧</div>
            <div className="cc-body"><span className="cc-icon">🔧</span><div className="cc-name">Spare Parts</div><div className="cc-cnt">2,100+ items</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
          <div className="cat-card" onClick={() => { setFilter('Broadcasting'); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="cc-bg">📶</div>
            <div className="cc-body"><span className="cc-icon">📶</span><div className="cc-name">Antennas & RF</div><div className="cc-cnt">420 products</div></div>
            <div className="cc-arr">→</div><div className="cc-line"></div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="sec prod-sec" id="products">
        <div className="sec-hd reveal">
          <div><div className="ey">Featured</div><h2 className="st">New <span className="c">Arrivals</span></h2></div>
        </div>
        <div className="filter-bar reveal">
          {['all', 'Broadcasting', 'Audio', 'Video', 'Electronics', 'Spare Part'].map(f => (
            <button key={f} className={`ftab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'Spare Part' ? 'Spare Parts' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="pgrid">
          {filteredProds.map(p => (
            <div className="pc reveal" key={p.id}>
              <div className="pc-img">
                <div className="pc-em">{p.em}</div>
                {p.badge && <div className={`pc-bdg ${p.badge === 'New' ? 'bnew' : p.badge === 'Hot' ? 'bhot' : p.badge === 'Trending' ? 'btrend' : 'bsale'}`}>{p.badge}</div>}
                <button
                  className={`pc-wish ${wishlist.includes(p.id) ? 'active' : ''}`}
                  onClick={(e) => toggleWish(p.id, e)}
                >
                  {wishlist.includes(p.id) ? '♥' : '♡'}
                </button>
                <div className="pc-acts">
                  {p.stock && <button className="btn-add" onClick={(e) => addToCart(p.id, e)}>Add to Cart</button>}
                  <button className="btn-qv" onClick={() => openModal(p.id)} title="Quick View">👁 Quick View</button>
                </div>
              </div>
              <div className="pc-body">
                <div className="pc-cat">{p.cat}</div>
                <div className="pc-name">{p.name}</div>
                <div className="pc-sku">SKU: {p.sku}</div>
                <div className="pc-price">
                  <span className="p-n">₹{p.price.toLocaleString('en-IN')}</span>
                  {p.orig && <>
                    <span className="p-o">₹{p.orig.toLocaleString('en-IN')}</span>
                    <span className="p-s">Save ₹{(p.orig - p.price).toLocaleString('en-IN')}</span>
                  </>}
                </div>
                <div className="pc-foot">
                  <div className={`stk ${p.stock ? 'in' : 'out'}`}>{p.stock ? 'In Stock' : 'Out of Stock'}</div>
                  <div className="prat">
                    <span className="stars">
                      {'★'.repeat(Math.floor(p.rat))}{'☆'.repeat(5 - Math.floor(p.rat))}
                    </span> {p.rat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="feat" id="featured">
        <div className="feat-vis">📡</div>
        <div className="feat-c">
          <div className="feat-tag">🔥 Product of the Month</div>
          <h2 className="feat-title">Pro HD Broadcast<br />Transmitter TX-9000</h2>
          <div className="feat-model">Model: BRX-TX9000-PRO &nbsp;·&nbsp; SKU: BCX-001-TX</div>
          <p className="feat-desc">Studio-grade HD broadcast transmitter engineered for 24/7 operation. Dual redundant power supply, remote monitoring and ultra-low latency output — the choice of professional stations.</p>
          <div className="feat-specs">
            <div className="fsp"><div className="fsk">Output Power</div><div className="fsv">1 kW – 10 kW</div></div>
            <div className="fsp"><div className="fsk">Frequency</div><div className="fsv">87.5 – 108 MHz</div></div>
            <div className="fsp"><div className="fsk">Modulation</div><div className="fsv">Stereo FM / DAB</div></div>
            <div className="fsp"><div className="fsk">Warranty</div><div className="fsv">3 Years On-site</div></div>
          </div>
          <div className="feat-pr">
            <div className="feat-price">₹4,85,000</div>
            <div className="feat-old">₹5,60,000</div>
            <div className="feat-save">Save ₹75,000</div>
          </div>
          <div className="feat-btns">
            <button className="btn-b" onClick={() => addToCart(99)}>Add to Cart</button>
            <button className="btn-g" onClick={() => { window.location.hash = '#contact'; showToast('Scroll to contact form'); }}>Request Quote</button>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands reveal">
        <div className="brands-lbl">Authorised Distributor · Genuine Products Guaranteed</div>
        <div className="brands-row">
          <div className="bchip">Sony Pro</div><div className="bchip">Blackmagic</div><div className="bchip">Rohde & Schwarz</div>
          <div className="bchip">Harris Broadcast</div><div className="bchip">Sennheiser</div><div className="bchip">Grass Valley</div>
          <div className="bchip">Nautel</div><div className="bchip">Lawo</div><div className="bchip">Vizrt</div>
        </div>
      </section>

      {/* WHY US */}
      <section className="sec why" id="why">
        <div className="sec-hd reveal"><div><div className="ey">Why Broadcastix</div><h2 className="st">Built for <span className="c">Professionals</span></h2></div></div>
        <div className="why-grid reveal">
          <div className="wc"><div className="wn">01</div><span className="wi">⚡</span><div className="wt">24hr Dispatch</div><p className="wd">In-stock items ship within 24 hours pan-India with real-time tracking on every order.</p></div>
          <div className="wc"><div className="wn">02</div><span className="wi">🔒</span><div className="wt">Genuine Parts Only</div><p className="wd">100% authentic OEM components. Full traceability and manufacturer certification on every product.</p></div>
          <div className="wc"><div className="wn">03</div><span className="wi">🛠</span><div className="wt">Technical Support</div><p className="wd">Dedicated engineers available 6 days a week for installation, troubleshooting & AMC services.</p></div>
          <div className="wc"><div className="wn">04</div><span className="wi">💼</span><div className="wt">B2B Solutions</div><p className="wd">Custom bulk pricing, GST invoicing, AMC contracts & turnkey studio setup for organisations.</p></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec testi" id="testimonials">
        <div className="sec-hd reveal"><div><div className="ey">Client Reviews</div><h2 className="st">What Engineers <span className="c">Say</span></h2></div></div>
        <div className="tgrid">
          <div className="tc reveal"><div className="tc-stars">★★★★★</div><p className="tc-txt">"Ordered a Sony PTZ camera and received it next day with full warranty documentation. The after-sales support team helped me set up the entire streaming chain. Exceptional service."</p><div className="tc-auth"><div className="tc-av">R</div><div><div className="tc-name">Rajesh Muthuswami</div><div className="tc-role">Chief Engineer · Sun TV Network</div></div></div></div>
          <div className="tc reveal"><div className="tc-stars">★★★★★</div><p className="tc-txt">"Been sourcing RF components and spare parts from Broadcastix for 4 years. Pricing is competitive, stock is always genuine, and delivery is always on time. Highly recommended for B2B."</p><div className="tc-auth"><div className="tc-av">P</div><div><div className="tc-name">Pradeep Krishnan</div><div className="tc-role">Broadcast Technician · All India Radio</div></div></div></div>
          <div className="tc reveal"><div className="tc-stars">★★★★☆</div><p className="tc-txt">"Set up our entire studio with Blackmagic gear sourced from Broadcastix. Got AMC support and the team has been very responsive. Great one-stop shop for all broadcast needs."</p><div className="tc-auth"><div className="tc-av">A</div><div><div className="tc-name">Anand Selvam</div><div className="tc-role">Studio Director · Red FM Chennai</div></div></div></div>
        </div>
      </section>

      {/* NEWSLETTER / CONTACT */}
      <section className="sec nl" id="contact">
        <div className="nl-grid">
          <div className="reveal"><div className="ey">Stay Updated</div><h2 className="nl-title">Price Alerts &<br /><span className="c">New Stock</span></h2><p className="nl-sub">Be first to know about new arrivals, exclusive B2B pricing, and limited stock alerts for broadcast professionals.</p></div>
          <div className="nl-form reveal">
            <div className="nl-row"><input className="nl-inp" type="text" placeholder="Your Name" /><input className="nl-inp" type="text" placeholder="Company / Station" /></div>
            <input className="nl-inp" type="email" placeholder="Email Address" />
            <input className="nl-inp" type="tel" placeholder="Phone / WhatsApp" />
            <button className="nl-btn" onClick={(e) => { e.preventDefault(); showToast('Subscribed Successfully!'); }}>Subscribe →</button>
            <div className="nl-note">No spam. Unsubscribe anytime. GST invoices available.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ftop">
          <div>
            <div className="flogo"><div className="logo-hex" style={{ width: '34px', height: '34px', fontSize: '.9rem' }}>B</div><div className="flogo-t">Broad<span>castix</span></div></div>
            <p className="fdesc">India's trusted source for professional broadcasting equipment, electronic components, and genuine spare parts. Serving studios, stations & engineers since 2012.</p>
            <div className="fctc">
              <div className="fcc"><span className="ic">📍</span> No.14, Anna Salai, Chennai – 600002, TN</div>
              <div className="fcc"><span className="ic">📞</span> +91 98765 43210</div>
              <div className="fcc"><span className="ic">✉</span> sales@broadcastix.in</div>
              <div className="fcc"><span className="ic">💬</span> WhatsApp: +91 98765 43210</div>
            </div>
          </div>
          <div className="fcol"><h4>Products</h4><ul className="flinks"><li><a href="#products">Broadcasting Equipment</a></li><li><a href="#products">FM / AM Transmitters</a></li><li><a href="#products">Video Switchers</a></li><li><a href="#products">Audio Mixers</a></li><li><a href="#products">Antennas & RF</a></li><li><a href="#products">Spare Parts</a></li></ul></div>
          <div className="fcol"><h4>Services</h4><ul className="flinks"><li><a href="#">Studio Setup</a></li><li><a href="#">AMC Contracts</a></li><li><a href="#">Equipment Repair</a></li><li><a href="#">Installation</a></li><li><a href="#">Bulk Orders</a></li><li><a href="#contact">Consultation</a></li></ul></div>
          <div className="fcol"><h4>Company</h4><ul className="flinks"><li><a href="#">About Us</a></li><li><a href="#">Authorised Brands</a></li><li><a href="#">Case Studies</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li><li><a href="#contact">Contact</a></li></ul></div>
        </div>
        <div className="fbot">
          <div className="fcopy">© 2026 Broadcastix. All Rights Reserved. Chennai, Tamil Nadu, India.</div>
          <div className="payr"><div className="pt">UPI</div><div className="pt">NEFT/RTGS</div><div className="pt">Razorpay</div><div className="pt">COD</div><div className="pt">EMI</div></div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div className={`cart-ov ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-dr ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-hd">
          <div className="cart-ht">Your <span>Cart</span></div>
          <button className="ccl" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-bd">
          {cart.length === 0 ? (
            <div className="cempty"><span className="cei">🛒</span><div className="cet">Cart is empty</div></div>
          ) : (
            cart.map(c => (
              <div key={c.id} className="ci-card">
                <div className="ci-img">{c.em}</div>
                <div>
                  <div className="ci-cat">{c.cat}</div>
                  <div className="ci-nm">{c.name}</div>
                  <div className="ci-pr">₹{c.price.toLocaleString('en-IN')}</div>
                  <div className="ci-row">
                    <button className="qb" onClick={() => changeQty(c.id, -1)}>−</button>
                    <span className="qn">{c.qty}</span>
                    <button className="qb" onClick={() => changeQty(c.id, 1)}>+</button>
                    <button className="rm" onClick={() => removeFromCart(c.id)}>✕ Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-ft">
            <div className="cr"><span className="l">Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <div className="cr"><span className="l">Shipping</span><span style={{ color: 'var(--green)' }}>Free</span></div>
            <div className="crtot"><span>Total</span><span className="v">₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <button className="ckbtn">Checkout →</button>
            <button className="wa-cart">💬 Order via WhatsApp</button>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      <div className={`mo-overlay ${modalProd ? 'open' : ''}`} onClick={closeModal}></div>
      <div className={`modal ${modalProd ? 'open' : ''}`}>
        {modalProd && (
          <div className="mo-inner">
            <div className="mo-img">
              <button className="mo-close" onClick={closeModal}>✕</button>
              <div style={{ fontSize: '7.5rem', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.1))' }}>{modalProd.em}</div>
            </div>
            <div className="mo-body">
              <div className="mo-cat">{modalProd.cat}</div>
              <h2 className="mo-name">{modalProd.name}</h2>
              <div className="mo-sku">SKU: {modalProd.sku}</div>
              <div className="mo-price">₹{modalProd.price.toLocaleString('en-IN')}</div>
              {modalProd.orig ? <div className="mo-old">₹{modalProd.orig.toLocaleString('en-IN')}</div> : <br />}
              <p className="mo-desc">{modalProd.desc}</p>
              <div className="mo-specs">
                {modalProd.specs.map((s, i) => (
                  <div key={i} className="mo-spec"><span className="msk">{s[0]}</span><span className="msv">{s[1]}</span></div>
                ))}
              </div>
              <div className="mo-btns">
                {modalProd.stock ? (
                  <button className="mo-add" onClick={() => { addToCart(modalProd.id); closeModal(); }}>Add to Cart</button>
                ) : (
                  <button className="mo-add" style={{ background: 'var(--border)', cursor: 'not-allowed', color: 'var(--text2)' }} disabled>Out of Stock</button>
                )}
                <button className="mo-wa">💬 WhatsApp</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOAST */}
      <div className={`toast ${toastMsg ? 'show' : ''}`}>
        <span className="ti">✔</span><span>{toastMsg}</span>
      </div>
    </>
  );
}

export default App;
