import type { DetailsBlock as DetailsProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function DetailsBlock({
  heading,
  description,
  image,
  layout = 'imageRight',
}: DetailsProps) {
  const isImageLeft = layout === 'imageLeft'

  return (
    <HyfSection className="hyf-details">
      <HyfContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={isImageLeft ? 'md:order-2' : ''}>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
              {heading}
            </h2>
            {description && (
              <div className="mt-6 text-lg text-[var(--hyf-color-muted-foreground)] leading-relaxed">
                {typeof description === 'string' ? (
                  <p>{description}</p>
                ) : (
                  <p>Rich text content</p>
                )}
              </div>
            )}
          </div>

          <div className={isImageLeft ? 'md:order-1' : ''}>
            {image && typeof image === 'object' && 'url' in image && (
              <img
                src={image.url}
                alt={image.alt || ''}
                className="w-full rounded-xl shadow-lg"
              />
            )}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
