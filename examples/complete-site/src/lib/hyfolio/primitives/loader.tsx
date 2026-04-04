interface HyfLoaderProps {
  className?: string
}

export function HyfLoader({ className = '' }: HyfLoaderProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-background ${className}`}>
      <div
        className="animate-spin rounded-full border-[length:var(--hyf-loader-border-width)] border-muted border-t-[color:var(--hyf-loader-color)]"
        style={{
          width: 'var(--hyf-loader-size)',
          height: 'var(--hyf-loader-size)',
          animationDuration: 'var(--hyf-loader-speed)',
        }}
      />
    </div>
  )
}

export function HyfInlineLoader({ className = '' }: HyfLoaderProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-[length:var(--hyf-loader-border-width)] border-muted border-t-[color:var(--hyf-loader-color)] ${className}`}
      style={{
        width: 'var(--hyf-loader-size)',
        height: 'var(--hyf-loader-size)',
        animationDuration: 'var(--hyf-loader-speed)',
      }}
    />
  )
}
