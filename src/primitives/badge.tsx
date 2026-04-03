import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'muted'

type HyfBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const baseClasses = [
  'inline-flex items-center',
  'rounded-[var(--hyf-badge-radius)]',
  'px-[var(--hyf-badge-padding-x)] py-[var(--hyf-badge-padding-y)]',
  'text-[length:var(--hyf-badge-font-size)]',
  'font-[var(--hyf-badge-font-weight)]',
].join(' ')

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--hyf-color-primary)] text-[var(--hyf-color-primary-foreground)]',
  secondary: 'bg-[var(--hyf-color-secondary)] text-[var(--hyf-color-secondary-foreground)]',
  muted: 'bg-[var(--hyf-color-muted)] text-[var(--hyf-color-muted-foreground)]',
}

export function HyfBadge({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: HyfBadgeProps) {
  const combinedClassName = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={combinedClassName} {...rest}>
      {children}
    </span>
  )
}
