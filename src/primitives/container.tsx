import type { HTMLAttributes, ReactNode } from 'react'

type HyfContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

const containerClasses = [
  'w-full mx-auto',
  'max-w-[var(--hyf-container-max)]',
  'px-[var(--hyf-container-padding)]',
].join(' ')

export function HyfContainer({ children, className = '', ...rest }: HyfContainerProps) {
  const combinedClassName = [containerClasses, className].filter(Boolean).join(' ')

  return (
    <div className={combinedClassName} {...rest}>
      {children}
    </div>
  )
}
