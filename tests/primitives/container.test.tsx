import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfContainer } from '@/primitives/container'

describe('HyfContainer', () => {
  it('renders children', () => {
    render(<HyfContainer>Page content</HyfContainer>)
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    render(<HyfContainer data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container.tagName).toBe('DIV')
  })

  it('applies max-width and padding tokens', () => {
    render(<HyfContainer data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container.className).toContain('max-w-[var(--hyf-container-max)]')
    expect(container.className).toContain('px-[var(--hyf-container-padding)]')
  })

  it('centers itself with auto margins', () => {
    render(<HyfContainer data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container.className).toContain('mx-auto')
  })

  it('sets full width', () => {
    render(<HyfContainer data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container.className).toContain('w-full')
  })

  it('passes through className', () => {
    render(<HyfContainer className="py-4" data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container.className).toContain('py-4')
  })

  it('forwards native div props', () => {
    render(<HyfContainer id="main" data-testid="container">Content</HyfContainer>)
    const container = screen.getByTestId('container')
    expect(container).toHaveAttribute('id', 'main')
  })
})
