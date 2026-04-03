import type { ComparisonBlock as ComparisonProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function ComparisonBlock({
  heading,
  plans,
  features,
}: ComparisonProps) {
  return (
    <HyfSection className="hyf-comparison">
      <HyfContainer>
        {heading && (
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-[var(--hyf-color-muted-foreground)] font-medium border-b border-[var(--hyf-color-border)]">
                  Feature
                </th>
                {plans?.map((plan, index) => (
                  <th
                    key={index}
                    className={`p-4 text-center font-semibold border-b border-[var(--hyf-color-border)] ${
                      plan.highlighted
                        ? 'text-[var(--hyf-color-primary)]'
                        : 'text-[var(--hyf-color-foreground)]'
                    }`}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features?.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className="border-b border-[var(--hyf-color-border)] last:border-0"
                >
                  <td className="p-4 text-[var(--hyf-color-foreground)]">
                    {feature.name}
                  </td>
                  {feature.values?.map((val, valIndex) => (
                    <td key={valIndex} className="p-4 text-center">
                      {val.included ? (
                        <svg
                          className="w-5 h-5 text-[var(--hyf-color-primary)] mx-auto"
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
                      ) : val.value ? (
                        <span className="text-[var(--hyf-color-muted-foreground)]">
                          {val.value}
                        </span>
                      ) : (
                        <svg
                          className="w-5 h-5 text-[var(--hyf-color-muted-foreground)] opacity-30 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 12H6"
                          />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
