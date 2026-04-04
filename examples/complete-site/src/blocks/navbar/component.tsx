import type { NavbarBlockProps } from '@/lib/hyfolio/types'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfButton } from '@/lib/hyfolio/primitives/button'

export function NavbarBlock({ logoText, links, cta }: NavbarBlockProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <HyfContainer className="flex h-16 items-center justify-between">
        <span className="text-lg font-bold font-heading text-foreground">
          {logoText ?? 'Site'}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          {cta && (
            <HyfButton variant="primary">
              <a href={cta.href}>{cta.label}</a>
            </HyfButton>
          )}
        </div>
      </HyfContainer>
    </nav>
  )
}
