import type { HTMLAttributes, ReactNode } from 'react'

interface HyfBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function HyfBadge({ className = '', children, ...props }: HyfBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--hyf-badge-radius)] px-[var(--hyf-badge-padding-x)] py-[var(--hyf-badge-padding-y)] text-[length:var(--hyf-badge-font-size)] font-[var(--hyf-badge-font-weight)] bg-secondary text-secondary-foreground ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
