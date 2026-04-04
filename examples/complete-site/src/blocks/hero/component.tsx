import type { HeroBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfButton } from '@/lib/hyfolio/primitives/button'

export function HeroBlock({ heading, subheading, cta }: HeroBlockProps) {
  return (
    <HyfSection className="text-center">
      <HyfContainer className="flex flex-col items-center gap-6">
        <h1 className="text-[length:var(--hyf-text-5xl)] font-[800] leading-[var(--hyf-leading-tight)] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground">
          {heading}
        </h1>
        {subheading && (
          <p className="max-w-2xl text-[length:var(--hyf-text-xl)] text-muted-foreground">
            {subheading}
          </p>
        )}
        {cta && (
          <HyfButton variant="primary">
            <a href={cta.href}>{cta.label}</a>
          </HyfButton>
        )}
      </HyfContainer>
    </HyfSection>
  )
}
