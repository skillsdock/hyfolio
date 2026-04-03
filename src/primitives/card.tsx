import type { HTMLAttributes, ReactNode } from 'react'

type HyfCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

const cardClasses = [
  'rounded-[var(--hyf-card-radius)]',
  'p-[var(--hyf-card-padding)]',
  'shadow-[var(--hyf-card-shadow)]',
  'border-[var(--hyf-card-border)]',
  'bg-[var(--hyf-color-background)]',
].join(' ')

export function HyfCard({ children, className = '', ...rest }: HyfCardProps) {
  const combinedClassName = [cardClasses, className].filter(Boolean).join(' ')

  return (
    <div className={combinedClassName} {...rest}>
      {children}
    </div>
  )
}
