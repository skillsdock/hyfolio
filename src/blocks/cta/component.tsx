import type { CtaBlock as CtaProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfButton } from '@/primitives/button'

export function CtaBlock({
  heading,
  description,
  primaryButton,
  secondaryButton,
}: CtaProps) {
  return (
    <HyfSection className="hyf-cta bg-[var(--hyf-color-secondary)]">
      <HyfContainer>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-[var(--hyf-color-muted-foreground)]">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {primaryButton?.label && primaryButton?.href && (
              <HyfButton href={primaryButton.href}>
                {primaryButton.label}
              </HyfButton>
            )}
            {secondaryButton?.label && secondaryButton?.href && (
              <HyfButton href={secondaryButton.href} variant="outline">
                {secondaryButton.label}
              </HyfButton>
            )}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
