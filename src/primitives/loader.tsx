import type { CSSProperties, HTMLAttributes } from 'react'

type HyfLoaderProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const spinnerStyle = {
  width: 'var(--hyf-loader-size)',
  height: 'var(--hyf-loader-size)',
  borderWidth: 'var(--hyf-loader-border-width)',
  borderColor: 'var(--hyf-loader-color)',
  borderTopColor: 'transparent',
  animationDuration: 'var(--hyf-loader-speed)',
} as CSSProperties

function Spinner() {
  return (
    <div
      data-hyf-spinner=""
      className="rounded-full animate-spin"
      style={spinnerStyle}
    />
  )
}

export function HyfLoader({ className = '', ...rest }: HyfLoaderProps) {
  const classes = [
    'fixed inset-0',
    'flex items-center justify-center',
    'bg-[var(--hyf-loader-page-bg)]',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div role="status" aria-label="Loading" className={classes} {...rest}>
      <Spinner />
    </div>
  )
}

export function HyfInlineLoader({ className = '', ...rest }: HyfLoaderProps) {
  const classes = [
    'inline-flex items-center justify-center',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div role="status" aria-label="Loading" className={classes} {...rest}>
      <Spinner />
    </div>
  )
}
