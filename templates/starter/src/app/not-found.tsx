import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 'var(--hyf-container-max)',
        margin: '0 auto',
        padding: 'var(--hyf-section-padding) var(--hyf-container-padding)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
        404
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--hyf-muted-foreground)', marginBottom: '2rem' }}>
        This page could not be found.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--hyf-primary)',
          color: 'var(--hyf-primary-foreground)',
          borderRadius: 'var(--hyf-radius-md)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Go home
      </Link>
    </main>
  )
}
