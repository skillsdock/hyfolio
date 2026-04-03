import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfCard } from '@/primitives/card'

describe('HyfCard', () => {
  it('renders children', () => {
    render(<HyfCard>Card content</HyfCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    render(<HyfCard data-testid="card">Content</HyfCard>)
    const card = screen.getByTestId('card')
    expect(card.tagName).toBe('DIV')
  })

  it('applies card token classes', () => {
    render(<HyfCard data-testid="card">Content</HyfCard>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('rounded-[var(--hyf-card-radius)]')
    expect(card.className).toContain('p-[var(--hyf-card-padding)]')
    expect(card.className).toContain('shadow-[var(--hyf-card-shadow)]')
  })

  it('applies border class', () => {
    render(<HyfCard data-testid="card">Content</HyfCard>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('border-[var(--hyf-card-border)]')
  })

  it('passes through additional className', () => {
    render(<HyfCard className="mt-8" data-testid="card">Content</HyfCard>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('mt-8')
  })

  it('forwards native div props', () => {
    render(<HyfCard id="test-card" data-testid="card">Content</HyfCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('id', 'test-card')
  })
})
