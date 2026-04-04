import type { DetailsBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { RichText } from '@/lib/hyfolio/render'

export function DetailsBlock({ heading, content, image, imagePosition = 'right' }: DetailsBlockProps) {
  const textFirst = imagePosition === 'right'

  return (
    <HyfSection>
      <HyfContainer>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${!textFirst ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
          <div>
            {heading && (
              <h2 className="text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-6">
                {heading}
              </h2>
            )}
            <RichText content={content} className="prose text-muted-foreground" />
          </div>
          {image && (
            <div>
              <img
                src={image.url}
                alt={image.alt}
                className="rounded-[var(--hyf-radius-lg)] w-full"
              />
            </div>
          )}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
