import type { LogosBlock as LogosProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

export function LogosBlock({ heading, logos }: LogosProps) {
  return (
    <HyfSection className="hyf-logos">
      <HyfContainer>
        {heading && (
          <p className="text-center text-sm font-medium text-[var(--hyf-color-muted-foreground)] uppercase tracking-wide mb-8">
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos?.map((logo, index) => {
            const imageUrl =
              logo.image && typeof logo.image === 'object' && 'url' in logo.image
                ? logo.image.url
                : null

            if (!imageUrl) return null

            const imgElement = (
              <img
                src={imageUrl}
                alt={logo.alt || ''}
                className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            )

            if (logo.href) {
              return (
                <a
                  key={index}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {imgElement}
                </a>
              )
            }

            return <div key={index}>{imgElement}</div>
          })}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
