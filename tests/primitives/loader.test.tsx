import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HyfLoader, HyfInlineLoader } from '@/primitives/loader'

describe('HyfLoader', () => {
  it('renders with page loader role', () => {
    render(<HyfLoader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders accessible label', () => {
    render(<HyfLoader />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('applies full-page overlay styles', () => {
    render(<HyfLoader />)
    const loader = screen.getByRole('status')
    expect(loader.className).toContain('fixed')
    expect(loader.className).toContain('inset-0')
    expect(loader.className).toContain('bg-[var(--hyf-loader-page-bg)]')
  })

  it('renders the spinner element', () => {
    render(<HyfLoader />)
    const loader = screen.getByRole('status')
    const spinner = loader.querySelector('[data-hyf-spinner]')
    expect(spinner).toBeInTheDocument()
  })

  it('passes through className', () => {
    render(<HyfLoader className="z-50" />)
    const loader = screen.getByRole('status')
    expect(loader.className).toContain('z-50')
  })
})

describe('HyfInlineLoader', () => {
  it('renders with status role', () => {
    render(<HyfInlineLoader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders inline without fixed positioning', () => {
    render(<HyfInlineLoader />)
    const loader = screen.getByRole('status')
    expect(loader.className).not.toContain('fixed')
    expect(loader.className).toContain('inline-flex')
  })

  it('applies loader token classes to spinner', () => {
    render(<HyfInlineLoader />)
    const loader = screen.getByRole('status')
    const spinner = loader.querySelector('[data-hyf-spinner]')
    expect(spinner).toBeInTheDocument()
  })
})
