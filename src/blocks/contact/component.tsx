'use client'

import { useState } from 'react'
import type { ContactBlock as ContactProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfButton } from '@/primitives/button'

export function ContactBlock({
  heading,
  description,
  formConfig,
}: ContactProps) {
  const [submitted, setSubmitted] = useState(false)

  const submitLabel = formConfig?.submitLabel || 'Send Message'
  const successMessage =
    formConfig?.successMessage || 'Thank you! We will be in touch.'
  const showPhone = formConfig?.fields?.showPhone ?? true
  const showCompany = formConfig?.fields?.showCompany ?? false

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClasses =
    'w-full rounded-md border border-[var(--hyf-color-border)] bg-[var(--hyf-color-background)] px-4 py-3 text-[var(--hyf-color-foreground)] placeholder:text-[var(--hyf-color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--hyf-color-ring)]'

  return (
    <HyfSection className="hyf-contact">
      <HyfContainer>
        <div className="max-w-xl mx-auto">
          {(heading || description) && (
            <div className="text-center mb-8">
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

          {submitted ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-[var(--hyf-color-primary)] mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg text-[var(--hyf-color-foreground)]">
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={inputClasses}
                />
              </div>
              {showPhone && (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={inputClasses}
                />
              )}
              {showCompany && (
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className={inputClasses}
                />
              )}
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                className={inputClasses}
              />
              <HyfButton type="submit" className="w-full">
                {submitLabel}
              </HyfButton>
            </form>
          )}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
