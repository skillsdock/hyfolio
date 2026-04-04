import type { FeaturesBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfCard } from '@/lib/hyfolio/primitives/card'

export function FeaturesBlock({ heading, subheading, features }: FeaturesBlockProps) {
  return (
    <HyfSection>
      <HyfContainer>
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-4 text-[length:var(--hyf-text-lg)] text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <HyfCard key={feature.title}>
              {feature.icon && <span className="text-2xl mb-4 block">{feature.icon}</span>}
              <h3 className="text-[length:var(--hyf-text-xl)] font-[600] font-heading text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
