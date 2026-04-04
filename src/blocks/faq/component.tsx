'use client'

import { useState } from 'react'
import type { FAQBlock as FAQProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfRichText } from '@/primitives/rich-text'

export function FAQBlock({ heading, description, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggleItem(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <HyfSection className="hyf-faq">
      <HyfContainer>
        <div className="max-w-3xl mx-auto">
          {(heading || description) && (
            <div className="text-center mb-12">
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

          <div className="divide-y divide-[var(--hyf-color-border)]">
            {items?.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-[var(--hyf-color-foreground)] pr-4">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-[var(--hyf-color-muted-foreground)] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <HyfRichText content={item.answer} className="mt-3 text-[var(--hyf-color-muted-foreground)] leading-relaxed pr-12" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
