import type { TestimonialsBlock as TestimonialsProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfCard } from '@/primitives/card'

export function TestimonialsBlock({
  heading,
  testimonials,
}: TestimonialsProps) {
  return (
    <HyfSection className="hyf-testimonials">
      <HyfContainer>
        {heading && (
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <HyfCard key={index} className="p-6 flex flex-col">
              <blockquote className="flex-1 text-[var(--hyf-color-foreground)] leading-relaxed">
                <svg
                  className="w-8 h-8 text-[var(--hyf-color-primary)] opacity-40 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--hyf-color-border)]">
                {testimonial.authorImage &&
                  typeof testimonial.authorImage === 'object' &&
                  'url' in testimonial.authorImage && (
                    <img
                      src={testimonial.authorImage.url}
                      alt={testimonial.authorImage.alt || testimonial.authorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                <div>
                  <div className="font-medium text-[var(--hyf-color-foreground)]">
                    {testimonial.authorName}
                  </div>
                  {(testimonial.authorRole || testimonial.company) && (
                    <div className="text-sm text-[var(--hyf-color-muted-foreground)]">
                      {testimonial.authorRole}
                      {testimonial.authorRole && testimonial.company && ', '}
                      {testimonial.company}
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
