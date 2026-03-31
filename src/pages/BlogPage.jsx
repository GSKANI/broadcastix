import { useState, useMemo } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: '5G Broadcasting Technology Explained',
      category: 'Technology',
      date: '2024-01-15',
      excerpt: 'Explore the latest advancements in 5G broadcasting technology and how it transforms live streaming.',
      image: '📡',
      content: 'Full article content about 5G broadcasting...'
    },
    {
      id: 2,
      title: 'Tips for Professional Live Streaming',
      category: 'Tutorial',
      date: '2024-01-10',
      excerpt: 'Learn expert tips and tricks to improve your live streaming quality and engagement.',
      image: '🎥',
      content: 'Professional streaming guide...'
    },
    {
      id: 3,
      title: 'Audio Quality in Broadcasting: The Ultimate Guide',
      category: 'Technology',
      date: '2024-01-05',
      excerpt: 'Master audio mixing and broadcasting quality standards for professional content.',
      image: '🔊',
      content: 'Audio quality standards...'
    },
    {
      id: 4,
      title: 'Top 10 Broadcasting Equipment for 2024',
      category: 'Equipment',
      date: '2024-01-01',
      excerpt: 'Discover the must-have broadcasting equipment for professional studios in 2024.',
      image: '⚙️',
      content: 'Equipment recommendations...'
    },
    {
      id: 5,
      title: 'Case Study: Sports Broadcasting Success',
      category: 'Case Study',
      date: '2023-12-28',
      excerpt: 'How a regional sports channel scaled from local to national coverage using our solutions.',
      image: '🏆',
      content: 'Sports broadcasting case study...'
    },
    {
      id: 6,
      title: 'Broadcasting Standards and Compliance',
      category: 'Tutorial',
      date: '2023-12-20',
      excerpt: 'Understanding regulatory requirements and compliance standards for broadcasters.',
      image: '✅',
      content: 'Compliance guide...'
    }
  ];

  const categories = ['All', 'Technology', 'Tutorial', 'Equipment', 'Case Study'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', padding: 'clamp(40px, 10vh, 80px) 20px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px' }}>Broadcasting Insights</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', opacity: 0.9 }}>Expert tips, industry news, and guides for professional broadcasting</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        {/* Search and Filter */}
        <div style={{ marginBottom: '40px' }}>
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'clamp(12px, 2vw, 16px)',
              border: '2px solid var(--border)',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              marginBottom: '20px'
            }}
          />

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: 'clamp(8px, 1vw, 12px) clamp(12px, 2vw, 16px)',
                  background: selectedCategory === cat ? 'var(--primary)' : 'white',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
                  border: selectedCategory === cat ? 'none' : '1px solid var(--border)',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📝</div>
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image/Icon */}
                  <div style={{ fontSize: '3rem', textAlign: 'center', padding: '30px 20px', background: 'var(--bg-light)' }}>
                    {post.image}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ background: 'var(--primary)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {post.category}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <h3 style={{ margin: '12px 0', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '16px' }}>
                      {post.excerpt}
                    </p>

                    <button style={{
                      width: '100%',
                      padding: '10px',
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--primary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--accent)'}
                    >
                      Read Full Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </div>
          </>
        )}

        {/* Newsletter Signup */}
        <div style={{
          marginTop: '80px',
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          color: '#fff',
          padding: 'clamp(30px, 5vw, 50px)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '12px' }}>Subscribe to Our Newsletter</h2>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>Get the latest broadcasting tips and industry news delivered to your inbox</p>
          <div style={{ display: 'flex', gap: '8px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: 'clamp(10px, 2vw, 14px)',
                border: 'none',
                borderRadius: '6px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            />
            <button style={{
              padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 24px)',
              background: '#fff',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
