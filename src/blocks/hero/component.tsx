import type { HeroBlock as HeroProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfButton } from '@/primitives/button'
import { HyfRichText } from '@/primitives/rich-text'

export function HeroBlock({
  heading,
  subheading,
  description,
  image,
  cta,
}: HeroProps) {
  return (
    <HyfSection className="hyf-hero">
      <HyfContainer>
        <div className="flex flex-col items-center text-center gap-6 py-12 md:py-20">
          {subheading && (
            <p className="text-lg text-[var(--hyf-color-muted-foreground)]">
              {subheading}
            </p>
          )}
          <h1 className="text-5xl font-bold tracking-tight text-[var(--hyf-color-foreground)] max-w-4xl">
            {heading}
          </h1>
          {description && (
            <HyfRichText content={description} className="text-lg text-[var(--hyf-color-muted-foreground)] max-w-2xl leading-relaxed" />
          )}
          {cta?.label && cta?.href && (
            <div className="mt-4">
              <HyfButton href={cta.href}>{cta.label}</HyfButton>
            </div>
          )}
          {image && typeof image === 'object' && 'url' in image && (
            <div className="mt-8 w-full max-w-5xl">
              <img
                src={image.url}
                alt={image.alt || ''}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
