import type { FeaturesBlock as FeaturesProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfCard } from '@/primitives/card'

export function FeaturesBlock({
  heading,
  description,
  features,
}: FeaturesProps) {
  return (
    <HyfSection className="hyf-features">
      <HyfContainer>
        {(heading || description) && (
          <div className="text-center mb-12 max-w-2xl mx-auto">
            {heading && (
              <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-[var(--hyf-color-muted-foreground)]">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <HyfCard key={index} className="p-6">
              {feature.icon && (
                <div className="mb-4 text-[var(--hyf-color-primary)] text-3xl">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--hyf-color-foreground)]">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="mt-2 text-[var(--hyf-color-muted-foreground)] leading-relaxed">
                  {feature.description}
                </p>
              )}
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
