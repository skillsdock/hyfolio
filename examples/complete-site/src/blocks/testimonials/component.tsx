import type { TestimonialsBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfCard } from '@/lib/hyfolio/primitives/card'

export function TestimonialsBlock({ heading, testimonials }: TestimonialsBlockProps) {
  return (
    <HyfSection>
      <HyfContainer>
        {heading && (
          <h2 className="text-center text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((t) => (
            <HyfCard key={t.author}>
              <blockquote className="text-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div>
                  <div className="font-[600] text-foreground">{t.author}</div>
                  {t.role && (
                    <div className="text-[length:var(--hyf-text-sm)] text-muted-foreground">
                      {t.role}{t.company ? `, ${t.company}` : ''}
                    </div>
                  )}
                </div>
              </div>
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
