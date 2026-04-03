'use client'

import { useState } from 'react'
import type { NewsletterBlock as NewsletterProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfButton } from '@/primitives/button'

export function NewsletterBlock({
  heading,
  description,
  placeholder,
  buttonText,
  successMessage,
}: NewsletterProps) {
  const [submitted, setSubmitted] = useState(false)

  const emailPlaceholder = placeholder || 'Enter your email'
  const submitText = buttonText || 'Subscribe'
  const confirmMessage = successMessage || 'Thanks for subscribing!'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <HyfSection className="hyf-newsletter bg-[var(--hyf-color-secondary)]">
      <HyfContainer>
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-[var(--hyf-color-muted-foreground)]">
              {description}
            </p>
          )}

          {submitted ? (
            <p className="mt-6 text-[var(--hyf-color-primary)] font-medium">
              {confirmMessage}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md gap-3"
            >
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                required
                className="flex-1 rounded-md border border-[var(--hyf-color-border)] bg-[var(--hyf-color-background)] px-4 py-3 text-[var(--hyf-color-foreground)] placeholder:text-[var(--hyf-color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--hyf-color-ring)]"
              />
              <HyfButton type="submit">{submitText}</HyfButton>
            </form>
          )}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
