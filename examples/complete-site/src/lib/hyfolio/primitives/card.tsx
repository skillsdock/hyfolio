import type { HTMLAttributes, ReactNode } from 'react'

interface HyfCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function HyfCard({ className = '', children, ...props }: HyfCardProps) {
  return (
    <div
      className={`rounded-[var(--hyf-card-radius)] p-[var(--hyf-card-padding)] shadow-[var(--hyf-card-shadow)] border border-border bg-background ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
