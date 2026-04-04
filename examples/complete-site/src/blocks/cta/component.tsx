import type { CTABlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfButton } from '@/lib/hyfolio/primitives/button'

export function CTABlock({ heading, description, primaryCta, secondaryCta }: CTABlockProps) {
  return (
    <HyfSection className="bg-primary text-primary-foreground text-center">
      <HyfContainer className="flex flex-col items-center gap-6">
        <h2 className="text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading">
          {heading}
        </h2>
        {description && (
          <p className="max-w-2xl text-[length:var(--hyf-text-lg)] opacity-90">
            {description}
          </p>
        )}
        <div className="flex gap-4">
          {primaryCta && (
            <HyfButton variant="secondary">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </HyfButton>
          )}
          {secondaryCta && (
            <HyfButton variant="outline" className="border-primary-foreground text-primary-foreground">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </HyfButton>
          )}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
