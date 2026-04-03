import { describe, it, expect } from 'vitest'
import { generateThemeCSS } from '@/theme/generator'
import { buildMinimalYaml } from './helpers'

describe('generateThemeCSS', () => {
  describe('color tokens', () => {
    it('generates --hyf- prefixed color variables in :root', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain(':root {')
      expect(css).toContain('--hyf-color-background: #ffffff;')
      expect(css).toContain('--hyf-color-foreground: #0a0a0a;')
      expect(css).toContain('--hyf-color-primary: #2563eb;')
      expect(css).toContain('--hyf-color-primary-foreground: #ffffff;')
      expect(css).toContain('--hyf-color-border: #e4e4e7;')
      expect(css).toContain('--hyf-color-ring: #2563eb;')
    })

    it('throws on invalid YAML', () => {
      expect(() => generateThemeCSS('not: valid: yaml: [')).toThrow()
    })

    it('throws on schema-invalid input', () => {
      const yaml = `
colors:
  background: not-a-color
`
      expect(() => generateThemeCSS(yaml)).toThrow()
    })
  })

  describe('cross-reference resolution', () => {
    it('resolves buttons.radius to the radius.md value', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-btn-radius: 0.375rem;')
    })

    it('resolves buttons.font-size to scale value', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-btn-font-size: 0.875rem;')
    })

    it('resolves cards.radius to radius.lg value', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-card-radius: 0.5rem;')
    })

    it('resolves cards.shadow to shadows.sm value', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-card-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);')
    })

    it('resolves button color refs to CSS variable references', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-btn-primary-bg: var(--hyf-color-primary);')
      expect(css).toContain('--hyf-btn-primary-fg: var(--hyf-color-primary-foreground);')
    })

    it('resolves heading sizes to scale values', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-h1-size: 3rem;')
      expect(css).toContain('--hyf-h2-size: 2.25rem;')
    })

    it('resolves heading tracking to letter-spacing values', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-h1-tracking: -0.025em;')
    })
  })

  describe('typography tokens', () => {
    it('generates font family variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-font-heading: Inter;')
      expect(css).toContain('--hyf-font-body: Inter;')
      expect(css).toContain('--hyf-font-mono: JetBrains Mono;')
    })

    it('generates type scale variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-text-base: 1rem;')
      expect(css).toContain('--hyf-text-6xl: 3.75rem;')
    })

    it('generates line-height variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-leading-tight: 1.2;')
      expect(css).toContain('--hyf-leading-normal: 1.5;')
    })
  })

  describe('spacing and radius tokens', () => {
    it('generates spacing variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-section-padding: 6rem;')
      expect(css).toContain('--hyf-container-max: 1200px;')
      expect(css).toContain('--hyf-container-padding: 1.5rem;')
    })

    it('generates radius variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-radius-md: 0.375rem;')
      expect(css).toContain('--hyf-radius-full: 9999px;')
    })
  })

  describe('transition tokens', () => {
    it('generates transition variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-transition-fast: 150ms;')
      expect(css).toContain('--hyf-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);')
    })
  })

  describe('component tokens', () => {
    it('generates form input variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-input-radius: 0.375rem;')
      expect(css).toContain('--hyf-input-padding-x: 1rem;')
      expect(css).toContain('--hyf-focus-ring-width: 2px;')
      expect(css).toContain('--hyf-focus-ring-color: var(--hyf-color-ring);')
    })

    it('generates loader variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-loader-color: var(--hyf-color-primary);')
      expect(css).toContain('--hyf-loader-size: 1.5rem;')
      expect(css).toContain('--hyf-loader-speed: 0.8s;')
    })

    it('generates badge variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-badge-radius: 9999px;')
      expect(css).toContain('--hyf-badge-font-size: 0.75rem;')
    })

    it('generates layout alignment variables', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).toContain('--hyf-text-align-default: left;')
      expect(css).toContain('--hyf-text-align-hero: center;')
    })
  })

  describe('dark mode', () => {
    it('generates .dark block with color overrides', () => {
      const yaml = buildMinimalYaml(`
dark:
  colors:
    background: "#0a0a0a"
    foreground: "#fafafa"
    primary: "#3b82f6"
`)
      const css = generateThemeCSS(yaml)
      expect(css).toContain('.dark {')
      expect(css).toContain('--hyf-color-background: #0a0a0a;')
      expect(css).toContain('--hyf-color-foreground: #fafafa;')
      expect(css).toContain('--hyf-color-primary: #3b82f6;')
    })

    it('omits .dark block when no dark section', () => {
      const yaml = buildMinimalYaml()
      const css = generateThemeCSS(yaml)
      expect(css).not.toContain('.dark {')
    })
  })
})
