import type { StatsBlock as StatsProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function StatsBlock({ heading, stats }: StatsProps) {
  return (
    <HyfSection className="hyf-stats bg-[var(--hyf-color-secondary)]">
      <HyfContainer>
        {heading && (
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[var(--hyf-color-primary)]">
                {stat.prefix && <span>{stat.prefix}</span>}
                {stat.value}
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="mt-2 text-sm font-medium text-[var(--hyf-color-muted-foreground)] uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
