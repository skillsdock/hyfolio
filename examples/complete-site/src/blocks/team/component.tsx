import type { TeamBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfCard } from '@/lib/hyfolio/primitives/card'

export function TeamBlock({ heading, subheading, members }: TeamBlockProps) {
  return (
    <HyfSection>
      <HyfContainer>
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-4 text-[length:var(--hyf-text-lg)] text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members?.map((member) => (
            <HyfCard key={member.name} className="text-center">
              {member.photo && (
                <img
                  src={member.photo.url}
                  alt={member.photo.alt}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-[length:var(--hyf-text-lg)] font-[600] font-heading text-foreground">
                {member.name}
              </h3>
              <p className="text-[length:var(--hyf-text-sm)] text-primary">{member.role}</p>
              {member.bio && (
                <p className="mt-2 text-[length:var(--hyf-text-sm)] text-muted-foreground">
                  {member.bio}
                </p>
              )}
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
