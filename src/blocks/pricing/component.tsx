import type { PricingBlock as PricingProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfCard } from '@/primitives/card'
import { HyfButton } from '@/primitives/button'
import { HyfBadge } from '@/primitives/badge'

export function PricingBlock({
  heading,
  description,
  plans,
}: PricingProps) {
  return (
    <HyfSection className="hyf-pricing">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plans?.map((plan, index) => (
            <HyfCard
              key={index}
              className={`p-8 flex flex-col relative ${
                plan.highlighted
                  ? 'ring-2 ring-[var(--hyf-color-primary)] shadow-lg'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <HyfBadge>Popular</HyfBadge>
                </div>
              )}

              <h3 className="text-xl font-semibold text-[var(--hyf-color-foreground)]">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[var(--hyf-color-foreground)]">
                  {plan.price}
                </span>
                {plan.billingPeriod && (
                  <span className="text-[var(--hyf-color-muted-foreground)]">
                    {plan.billingPeriod}
                  </span>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-[var(--hyf-color-muted-foreground)]"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--hyf-color-primary)] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              )}

              {plan.cta?.label && plan.cta?.href && (
                <div className="mt-8">
                  <HyfButton
                    href={plan.cta.href}
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </HyfButton>
                </div>
              )}
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
