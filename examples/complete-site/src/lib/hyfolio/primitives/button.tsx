import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface HyfButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  outline: 'border border-border bg-transparent hover:bg-accent',
  ghost: 'bg-transparent hover:bg-accent',
}

export function HyfButton({ variant = 'primary', className = '', children, ...props }: HyfButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-[var(--hyf-button-font-weight)] text-[length:var(--hyf-button-font-size)] px-[var(--hyf-button-padding-x)] py-[var(--hyf-button-padding-y)] rounded-[var(--hyf-button-radius)] transition-all duration-[var(--hyf-transition-fast)] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
