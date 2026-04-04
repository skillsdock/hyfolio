import type { TimelineBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'

export function TimelineBlock({ heading, events }: TimelineBlockProps) {
  return (
    <HyfSection className="bg-secondary">
      <HyfContainer>
        {heading && (
          <h2 className="text-center text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-12">
            {heading}
          </h2>
        )}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {events?.map((event, i) => (
              <div
                key={event.year}
                className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
              >
                <div className="flex-1 text-right md:text-inherit">
                  <span className="text-[length:var(--hyf-text-sm)] font-[600] text-primary">
                    {event.year}
                  </span>
                  <h3 className="text-[length:var(--hyf-text-xl)] font-[600] font-heading text-foreground mt-1">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{event.description}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
