import type { TeamBlock as TeamProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfCard } from '@/primitives/card'

export function TeamBlock({ heading, description, members }: TeamProps) {
  return (
    <HyfSection className="hyf-team">
      <HyfContainer>
        {(heading || description) && (
          <div className="text-center mb-12 max-w-2xl mx-auto">
            {heading && (
              <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-[var(--hyf-color-muted-foreground)]">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members?.map((member, index) => (
            <HyfCard key={index} className="p-6 text-center">
              {member.image &&
                typeof member.image === 'object' &&
                'url' in member.image && (
                  <img
                    src={member.image.url}
                    alt={member.image.alt || member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
              <h3 className="text-xl font-semibold text-[var(--hyf-color-foreground)]">
                {member.name}
              </h3>
              {member.role && (
                <p className="mt-1 text-sm text-[var(--hyf-color-primary)]">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="mt-3 text-sm text-[var(--hyf-color-muted-foreground)] leading-relaxed">
                  {member.bio}
                </p>
              )}
              {member.socials && member.socials.length > 0 && (
                <div className="mt-4 flex justify-center gap-3">
                  {member.socials.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--hyf-color-muted-foreground)] hover:text-[var(--hyf-color-primary)] transition-colors"
                      aria-label={social.platform}
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              )}
            </HyfCard>
          ))}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}

function SocialIcon({ platform }: { platform: string }) {
  const iconClass = 'w-5 h-5'
  switch (platform) {
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'github':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    case 'website':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    default:
      return null
  }
}
