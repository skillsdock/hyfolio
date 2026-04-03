import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfButton } from '@/primitives/button'

describe('HyfButton', () => {
  it('renders children text', () => {
    render(<HyfButton>Click me</HyfButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('renders as a button element by default', () => {
    render(<HyfButton>Test</HyfButton>)
    expect(screen.getByRole('button').tagName).toBe('BUTTON')
  })

  it('defaults to primary variant', () => {
    render(<HyfButton>Primary</HyfButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-[var(--hyf-btn-primary-bg)]')
    expect(button.className).toContain('text-[var(--hyf-btn-primary-fg)]')
  })

  it('applies secondary variant styles', () => {
    render(<HyfButton variant="secondary">Secondary</HyfButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-[var(--hyf-btn-secondary-bg)]')
    expect(button.className).toContain('text-[var(--hyf-btn-secondary-fg)]')
  })

  it('applies outline variant styles', () => {
    render(<HyfButton variant="outline">Outline</HyfButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('border')
    expect(button.className).toContain('border-[var(--hyf-btn-outline-border)]')
    expect(button.className).toContain('bg-transparent')
  })

  it('applies ghost variant styles', () => {
    render(<HyfButton variant="ghost">Ghost</HyfButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-transparent')
    expect(button.className).toContain('hover:bg-[var(--hyf-btn-ghost-hover-bg)]')
  })

  it('passes through additional className', () => {
    render(<HyfButton className="mt-4">Styled</HyfButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('mt-4')
  })

  it('forwards native button props', () => {
    render(<HyfButton type="submit" disabled>Submit</HyfButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()
  })

  it('renders as an anchor when href is provided', () => {
    render(<HyfButton href="/about">About</HyfButton>)
    const link = screen.getByRole('link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/about')
  })
})
