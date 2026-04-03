import type { TimelineBlock as TimelineProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function TimelineBlock({ heading, items }: TimelineProps) {
  return (
    <HyfSection className="hyf-timeline">
      <HyfContainer>
        {heading && (
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--hyf-color-border)]" />

          <div className="flex flex-col gap-12">
            {items?.map((item, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    isEven
                      ? 'md:pr-12 md:self-start md:text-right'
                      : 'md:pl-12 md:self-end'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-2.5 md:top-1 w-3 h-3 rounded-full bg-[var(--hyf-color-primary)] ring-4 ring-[var(--hyf-color-background)] ${
                      isEven
                        ? 'md:left-auto md:-right-[1.625rem]'
                        : 'md:-left-[1.625rem]'
                    }`}
                  />

                  <span className="text-sm font-medium text-[var(--hyf-color-primary)]">
                    {item.date}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--hyf-color-foreground)]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-[var(--hyf-color-muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
