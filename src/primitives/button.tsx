import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

type BaseProps = {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never
  }

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type HyfButtonProps = AsButton | AsAnchor

const baseClasses = [
  'inline-flex items-center justify-center',
  'rounded-[var(--hyf-btn-radius)]',
  'px-[var(--hyf-btn-padding-x)] py-[var(--hyf-btn-padding-y)]',
  'text-[length:var(--hyf-btn-font-size)]',
  'font-[var(--hyf-btn-font-weight)]',
  'transition-colors duration-[var(--hyf-transition-fast)]',
  'ease-[var(--hyf-transition-easing)]',
  'disabled:opacity-50 disabled:pointer-events-none',
].join(' ')

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--hyf-btn-primary-bg)] text-[var(--hyf-btn-primary-fg)]',
  secondary: 'bg-[var(--hyf-btn-secondary-bg)] text-[var(--hyf-btn-secondary-fg)]',
  outline: 'bg-transparent border border-[var(--hyf-btn-outline-border)] text-[var(--hyf-color-foreground)]',
  ghost: 'bg-transparent text-[var(--hyf-color-foreground)] hover:bg-[var(--hyf-btn-ghost-hover-bg)]',
}

export function HyfButton(props: HyfButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props

  const combinedClassName = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor
    return (
      <a href={href} className={combinedClassName} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClassName} {...(rest as Omit<AsButton, keyof BaseProps>)}>
      {children}
    </button>
  )
}
