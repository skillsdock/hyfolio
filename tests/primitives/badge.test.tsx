import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfBadge } from '@/primitives/badge'

describe('HyfBadge', () => {
  it('renders children text', () => {
    render(<HyfBadge>New</HyfBadge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    render(<HyfBadge data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.tagName).toBe('SPAN')
  })

  it('applies badge token classes', () => {
    render(<HyfBadge data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.className).toContain('rounded-[var(--hyf-badge-radius)]')
    expect(badge.className).toContain('px-[var(--hyf-badge-padding-x)]')
    expect(badge.className).toContain('py-[var(--hyf-badge-padding-y)]')
    expect(badge.className).toContain('text-[length:var(--hyf-badge-font-size)]')
    expect(badge.className).toContain('font-[var(--hyf-badge-font-weight)]')
  })

  it('defaults to primary color scheme', () => {
    render(<HyfBadge data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.className).toContain('bg-[var(--hyf-color-primary)]')
    expect(badge.className).toContain('text-[var(--hyf-color-primary-foreground)]')
  })

  it('applies secondary color scheme', () => {
    render(<HyfBadge variant="secondary" data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.className).toContain('bg-[var(--hyf-color-secondary)]')
    expect(badge.className).toContain('text-[var(--hyf-color-secondary-foreground)]')
  })

  it('applies muted color scheme', () => {
    render(<HyfBadge variant="muted" data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.className).toContain('bg-[var(--hyf-color-muted)]')
    expect(badge.className).toContain('text-[var(--hyf-color-muted-foreground)]')
  })

  it('passes through className', () => {
    render(<HyfBadge className="ml-2" data-testid="badge">Label</HyfBadge>)
    const badge = screen.getByTestId('badge')
    expect(badge.className).toContain('ml-2')
  })
})
