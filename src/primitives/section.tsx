import type { HTMLAttributes, ReactNode } from 'react'

type HyfSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  className?: string
}

const sectionClasses = 'py-[var(--hyf-section-padding)]'

export function HyfSection({ children, className = '', ...rest }: HyfSectionProps) {
  const combinedClassName = [sectionClasses, className].filter(Boolean).join(' ')

  return (
    <section className={combinedClassName} {...rest}>
      {children}
    </section>
  )
}
