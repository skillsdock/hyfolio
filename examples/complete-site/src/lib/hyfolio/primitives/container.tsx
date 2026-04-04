import type { HTMLAttributes, ReactNode } from 'react'

interface HyfContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function HyfContainer({ className = '', children, ...props }: HyfContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-container px-container ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
