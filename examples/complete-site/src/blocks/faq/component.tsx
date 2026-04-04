import type { FAQBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'

export function FAQBlock({ heading, items }: FAQBlockProps) {
  return (
    <HyfSection>
      <HyfContainer className="max-w-3xl">
        {heading && (
          <h2 className="text-center text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-12">
            {heading}
          </h2>
        )}
        <div className="divide-y divide-border">
          {items?.map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between text-[length:var(--hyf-text-lg)] font-[600] text-foreground">
                {item.question}
                <span className="ml-4 text-muted-foreground group-open:rotate-180 transition-transform duration-[var(--hyf-transition-fast)]">
                  &#9660;
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-[var(--hyf-leading-relaxed)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
