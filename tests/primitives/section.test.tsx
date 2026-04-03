import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfSection } from '@/primitives/section'

describe('HyfSection', () => {
  it('renders children', () => {
    render(<HyfSection>Section content</HyfSection>)
    expect(screen.getByText('Section content')).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    render(<HyfSection data-testid="section">Content</HyfSection>)
    const section = screen.getByTestId('section')
    expect(section.tagName).toBe('SECTION')
  })

  it('applies vertical padding from theme tokens', () => {
    render(<HyfSection data-testid="section">Content</HyfSection>)
    const section = screen.getByTestId('section')
    expect(section.className).toContain('py-[var(--hyf-section-padding)]')
  })

  it('passes through className', () => {
    render(<HyfSection className="bg-gray-50" data-testid="section">Content</HyfSection>)
    const section = screen.getByTestId('section')
    expect(section.className).toContain('bg-gray-50')
  })

  it('forwards native section props', () => {
    render(<HyfSection id="hero" aria-label="Hero section" data-testid="section">Content</HyfSection>)
    const section = screen.getByTestId('section')
    expect(section).toHaveAttribute('id', 'hero')
    expect(section).toHaveAttribute('aria-label', 'Hero section')
  })
})
