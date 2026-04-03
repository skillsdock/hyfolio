import { describe, it, expect } from 'vitest'
import { hyfolioPreset } from '@/theme/tailwind-preset'

describe('hyfolioPreset', () => {
  it('exports a valid Tailwind preset object', () => {
    expect(hyfolioPreset).toBeDefined()
    expect(hyfolioPreset.theme).toBeDefined()
    expect(hyfolioPreset.theme?.extend).toBeDefined()
  })

  describe('colors', () => {
    it('maps color tokens to CSS variable references', () => {
      const colors = hyfolioPreset.theme?.extend?.colors as Record<string, unknown>
      expect(colors).toBeDefined()
      expect(colors['hyf-background']).toBe('var(--hyf-color-background)')
      expect(colors['hyf-foreground']).toBe('var(--hyf-color-foreground)')
      expect(colors['hyf-primary']).toBe('var(--hyf-color-primary)')
      expect(colors['hyf-primary-foreground']).toBe('var(--hyf-color-primary-foreground)')
      expect(colors['hyf-secondary']).toBe('var(--hyf-color-secondary)')
      expect(colors['hyf-secondary-foreground']).toBe('var(--hyf-color-secondary-foreground)')
      expect(colors['hyf-muted']).toBe('var(--hyf-color-muted)')
      expect(colors['hyf-muted-foreground']).toBe('var(--hyf-color-muted-foreground)')
      expect(colors['hyf-accent']).toBe('var(--hyf-color-accent)')
      expect(colors['hyf-destructive']).toBe('var(--hyf-color-destructive)')
      expect(colors['hyf-border']).toBe('var(--hyf-color-border)')
      expect(colors['hyf-ring']).toBe('var(--hyf-color-ring)')
    })
  })

  describe('spacing', () => {
    it('maps spacing tokens to CSS variable references', () => {
      const spacing = hyfolioPreset.theme?.extend?.spacing as Record<string, unknown>
      expect(spacing).toBeDefined()
      expect(spacing['hyf-section']).toBe('var(--hyf-section-padding)')
      expect(spacing['hyf-container']).toBe('var(--hyf-container-padding)')
    })
  })

  describe('maxWidth', () => {
    it('maps container-max token', () => {
      const maxWidth = hyfolioPreset.theme?.extend?.maxWidth as Record<string, unknown>
      expect(maxWidth).toBeDefined()
      expect(maxWidth['hyf-container']).toBe('var(--hyf-container-max)')
    })
  })

  describe('borderRadius', () => {
    it('maps radius tokens to CSS variable references', () => {
      const borderRadius = hyfolioPreset.theme?.extend?.borderRadius as Record<string, unknown>
      expect(borderRadius).toBeDefined()
      expect(borderRadius['hyf-sm']).toBe('var(--hyf-radius-sm)')
      expect(borderRadius['hyf-md']).toBe('var(--hyf-radius-md)')
      expect(borderRadius['hyf-lg']).toBe('var(--hyf-radius-lg)')
      expect(borderRadius['hyf-xl']).toBe('var(--hyf-radius-xl)')
      expect(borderRadius['hyf-2xl']).toBe('var(--hyf-radius-2xl)')
      expect(borderRadius['hyf-full']).toBe('var(--hyf-radius-full)')
    })
  })

  describe('boxShadow', () => {
    it('maps shadow tokens to CSS variable references', () => {
      const boxShadow = hyfolioPreset.theme?.extend?.boxShadow as Record<string, unknown>
      expect(boxShadow).toBeDefined()
      expect(boxShadow['hyf-sm']).toBe('var(--hyf-shadow-sm)')
      expect(boxShadow['hyf-md']).toBe('var(--hyf-shadow-md)')
      expect(boxShadow['hyf-lg']).toBe('var(--hyf-shadow-lg)')
      expect(boxShadow['hyf-xl']).toBe('var(--hyf-shadow-xl)')
    })
  })

  describe('fontFamily', () => {
    it('maps font tokens to CSS variable references', () => {
      const fontFamily = hyfolioPreset.theme?.extend?.fontFamily as Record<string, unknown>
      expect(fontFamily).toBeDefined()
      expect(fontFamily['hyf-heading']).toBe('var(--hyf-font-heading)')
      expect(fontFamily['hyf-body']).toBe('var(--hyf-font-body)')
      expect(fontFamily['hyf-mono']).toBe('var(--hyf-font-mono)')
    })
  })

  describe('fontSize', () => {
    it('maps type scale tokens to CSS variable references', () => {
      const fontSize = hyfolioPreset.theme?.extend?.fontSize as Record<string, unknown>
      expect(fontSize).toBeDefined()
      expect(fontSize['hyf-xs']).toBe('var(--hyf-text-xs)')
      expect(fontSize['hyf-base']).toBe('var(--hyf-text-base)')
      expect(fontSize['hyf-6xl']).toBe('var(--hyf-text-6xl)')
    })
  })

  describe('transitionDuration', () => {
    it('maps transition tokens to CSS variable references', () => {
      const transitionDuration = hyfolioPreset.theme?.extend?.transitionDuration as Record<string, unknown>
      expect(transitionDuration).toBeDefined()
      expect(transitionDuration['hyf-fast']).toBe('var(--hyf-transition-fast)')
      expect(transitionDuration['hyf-normal']).toBe('var(--hyf-transition-normal)')
      expect(transitionDuration['hyf-slow']).toBe('var(--hyf-transition-slow)')
    })
  })

  describe('transitionTimingFunction', () => {
    it('maps easing token', () => {
      const transitionTimingFunction = hyfolioPreset.theme?.extend?.transitionTimingFunction as Record<string, unknown>
      expect(transitionTimingFunction).toBeDefined()
      expect(transitionTimingFunction['hyf']).toBe('var(--hyf-transition-easing)')
    })
  })
})
