import type { ContentBlock as ContentProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function ContentBlock({ heading, body }: ContentProps) {
  return (
    <HyfSection className="hyf-content">
      <HyfContainer>
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] mb-8">
              {heading}
            </h2>
          )}
          <div className="prose prose-lg max-w-none text-[var(--hyf-color-foreground)]">
            {typeof body === 'string' ? (
              <p>{body}</p>
            ) : (
              <p>Rich text content</p>
            )}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
