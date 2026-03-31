export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>404</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="btn-primary"
          style={{ padding: '12px 32px' }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
