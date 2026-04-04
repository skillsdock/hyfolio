import type { HTMLAttributes, ReactNode } from 'react'

interface HyfSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function HyfSection({ className = '', children, ...props }: HyfSectionProps) {
  return (
    <section
      className={`py-section ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
