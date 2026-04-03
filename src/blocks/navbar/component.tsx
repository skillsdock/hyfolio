'use client'

import { useState } from 'react'
import type { NavbarBlock as NavbarProps } from '@/types'
import { HyfContainer } from '@/primitives/container'
import { HyfButton } from '@/primitives/button'

export function NavbarBlock({ logo, links, cta }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="hyf-navbar sticky top-0 z-50 w-full border-b border-[var(--hyf-color-border)] bg-[var(--hyf-color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--hyf-color-background)]/60">
      <HyfContainer>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {logo && typeof logo === 'object' && 'url' in logo ? (
              <img
                src={logo.url}
                alt={logo.alt || 'Logo'}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-xl font-bold text-[var(--hyf-color-foreground)]">
                Logo
              </span>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {links?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-[var(--hyf-color-muted-foreground)] transition-colors hover:text-[var(--hyf-color-foreground)]"
              >
                {link.label}
              </a>
            ))}
            {cta?.label && cta?.href && (
              <HyfButton href={cta.href}>{cta.label}</HyfButton>
            )}
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-[var(--hyf-radius-md)] p-2 text-[var(--hyf-color-muted-foreground)] hover:bg-[var(--hyf-color-accent)] hover:text-[var(--hyf-color-foreground)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--hyf-color-border)] py-4">
            <nav className="flex flex-col gap-4">
              {links?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-[var(--hyf-color-muted-foreground)] transition-colors hover:text-[var(--hyf-color-foreground)]"
                >
                  {link.label}
                </a>
              ))}
              {cta?.label && cta?.href && (
                <HyfButton href={cta.href} className="w-full">
                  {cta.label}
                </HyfButton>
              )}
            </nav>
          </div>
        )}
      </HyfContainer>
    </header>
  )
}
