import type { FooterBlockProps } from '@/lib/hyfolio/types'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'

export function FooterBlock({ logoText, description, columns, copyright }: FooterBlockProps) {
  return (
    <footer className="border-t border-border bg-background py-12">
      <HyfContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold font-heading text-foreground">
              {logoText ?? 'Site'}
            </span>
            {description && (
              <p className="mt-4 text-[length:var(--hyf-text-sm)] text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {columns?.map((col) => (
            <div key={col.title}>
              <h4 className="font-[600] text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[length:var(--hyf-text-sm)] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {copyright && (
          <div className="mt-12 pt-8 border-t border-border text-center text-[length:var(--hyf-text-sm)] text-muted-foreground">
            {copyright}
          </div>
        )}
      </HyfContainer>
    </footer>
  )
}
