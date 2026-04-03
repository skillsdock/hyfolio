export default function HomePage() {
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
        Welcome to your hyfolio site
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--hyf-muted-foreground)' }}>
        Get started by adding your first block:
      </p>
      <pre
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '1rem 2rem',
          backgroundColor: 'var(--hyf-secondary)',
          borderRadius: 'var(--hyf-radius-md)',
          fontSize: '1rem',
        }}
      >
        npx hyfolio add hero
      </pre>
    </main>
  )
}
