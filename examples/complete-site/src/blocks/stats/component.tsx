import type { StatsBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'

export function StatsBlock({ heading, stats }: StatsBlockProps) {
  return (
    <HyfSection className="bg-secondary">
      <HyfContainer>
        {heading && (
          <h2 className="text-center text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats?.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[length:var(--hyf-text-4xl)] font-[800] text-primary">
                {stat.value}
              </div>
              <div className="mt-2 text-[length:var(--hyf-text-sm)] font-[600] text-foreground">
                {stat.label}
              </div>
              {stat.description && (
                <p className="mt-1 text-[length:var(--hyf-text-sm)] text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
