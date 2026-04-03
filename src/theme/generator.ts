import YAML from 'yaml'
import { themeSchema, type ThemeConfig } from './schema'

export function generateThemeCSS(yamlString: string): string {
  const raw = YAML.parse(yamlString)
  const theme = themeSchema.parse(raw)

  const rootVars = generateRootVars(theme)
  const darkVars = generateDarkVars(theme)

  const lines: string[] = []
  lines.push(':root {')
  for (const [prop, value] of rootVars) {
    lines.push(`  ${prop}: ${value};`)
  }
  lines.push('}')

  if (darkVars.length > 0) {
    lines.push('')
    lines.push('.dark {')
    for (const [prop, value] of darkVars) {
      lines.push(`  ${prop}: ${value};`)
    }
    lines.push('}')
  }

  return lines.join('\n') + '\n'
}

function generateRootVars(theme: ThemeConfig): Array<[string, string]> {
  const vars: Array<[string, string]> = []

  // Colors
  for (const [key, value] of Object.entries(theme.colors)) {
    vars.push([`--hyf-color-${key}`, value])
  }

  // Typography -- fonts
  vars.push(['--hyf-font-heading', theme.typography.fonts.heading])
  vars.push(['--hyf-font-body', theme.typography.fonts.body])
  vars.push(['--hyf-font-mono', theme.typography.fonts.mono])

  // Typography -- scale
  for (const [key, value] of Object.entries(theme.typography.scale)) {
    vars.push([`--hyf-text-${key}`, value])
  }

  // Typography -- headings
  for (const [level, config] of Object.entries(theme.typography.headings)) {
    const resolvedSize = theme.typography.scale[config.size as keyof typeof theme.typography.scale]
    vars.push([`--hyf-${level}-size`, resolvedSize])
    vars.push([`--hyf-${level}-weight`, String(config.weight)])
    if (config.tracking) {
      const resolvedTracking = theme.typography['letter-spacing'][config.tracking]
      vars.push([`--hyf-${level}-tracking`, resolvedTracking])
    }
  }

  // Typography -- line-height
  for (const [key, value] of Object.entries(theme.typography['line-height'])) {
    vars.push([`--hyf-leading-${key}`, String(value)])
  }

  // Typography -- letter-spacing
  for (const [key, value] of Object.entries(theme.typography['letter-spacing'])) {
    vars.push([`--hyf-tracking-${key}`, value])
  }

  // Spacing
  for (const [key, value] of Object.entries(theme.spacing)) {
    vars.push([`--hyf-${key}`, value])
  }

  // Radius
  for (const [key, value] of Object.entries(theme.radius)) {
    vars.push([`--hyf-radius-${key}`, value])
  }

  // Shadows
  for (const [key, value] of Object.entries(theme.shadows)) {
    vars.push([`--hyf-shadow-${key}`, value])
  }

  // Transitions
  vars.push(['--hyf-transition-fast', theme.transitions.fast])
  vars.push(['--hyf-transition-normal', theme.transitions.normal])
  vars.push(['--hyf-transition-slow', theme.transitions.slow])
  vars.push(['--hyf-transition-easing', theme.transitions.easing])

  // Buttons
  vars.push(['--hyf-btn-radius', resolveRadius(theme, theme.buttons.radius)])
  vars.push(['--hyf-btn-font-weight', String(theme.buttons['font-weight'])])
  vars.push(['--hyf-btn-padding-x', theme.buttons.padding.x])
  vars.push(['--hyf-btn-padding-y', theme.buttons.padding.y])
  vars.push(['--hyf-btn-font-size', resolveScale(theme, theme.buttons['font-size'])])
  vars.push(['--hyf-btn-primary-bg', resolveColorRef(theme, theme.buttons.primary.background)])
  vars.push(['--hyf-btn-primary-fg', resolveColorRef(theme, theme.buttons.primary.foreground)])
  vars.push(['--hyf-btn-secondary-bg', resolveColorRef(theme, theme.buttons.secondary.background)])
  vars.push(['--hyf-btn-secondary-fg', resolveColorRef(theme, theme.buttons.secondary.foreground)])
  vars.push(['--hyf-btn-outline-border', resolveColorRef(theme, theme.buttons.outline.border)])
  vars.push(['--hyf-btn-ghost-hover-bg', resolveColorRef(theme, theme.buttons.ghost['hover-background'])])

  // Cards
  vars.push(['--hyf-card-radius', resolveRadius(theme, theme.cards.radius)])
  vars.push(['--hyf-card-padding', theme.cards.padding])
  vars.push(['--hyf-card-shadow', resolveShadow(theme, theme.cards.shadow)])
  vars.push(['--hyf-card-border', theme.cards.border ? '1px solid var(--hyf-color-border)' : 'none'])

  // Forms
  vars.push(['--hyf-input-radius', resolveRadius(theme, theme.forms['input-radius'])])
  vars.push(['--hyf-input-padding-x', theme.forms['input-padding'].x])
  vars.push(['--hyf-input-padding-y', theme.forms['input-padding'].y])
  vars.push(['--hyf-input-border', theme.forms['input-border'] ? '1px solid var(--hyf-color-border)' : 'none'])
  vars.push(['--hyf-focus-ring-width', theme.forms['focus-ring-width']])
  vars.push(['--hyf-focus-ring-color', resolveColorRef(theme, theme.forms['focus-ring-color'])])

  // Loaders
  vars.push(['--hyf-loader-color', resolveColorRef(theme, theme.loaders.color)])
  vars.push(['--hyf-loader-size', theme.loaders.size])
  vars.push(['--hyf-loader-border-width', theme.loaders['border-width']])
  vars.push(['--hyf-loader-speed', theme.loaders.speed])
  vars.push(['--hyf-loader-page-bg', resolveColorRef(theme, theme.loaders['page-loader'].background)])
  vars.push(['--hyf-loader-page-style', theme.loaders['page-loader'].style])

  // Badges
  vars.push(['--hyf-badge-radius', resolveRadius(theme, theme.badges.radius)])
  vars.push(['--hyf-badge-padding-x', theme.badges.padding.x])
  vars.push(['--hyf-badge-padding-y', theme.badges.padding.y])
  vars.push(['--hyf-badge-font-size', resolveScale(theme, theme.badges['font-size'])])
  vars.push(['--hyf-badge-font-weight', String(theme.badges['font-weight'])])

  // Layout
  vars.push(['--hyf-text-align-default', theme.layout['default-text-align']])
  vars.push(['--hyf-text-align-hero', theme.layout['hero-text-align']])
  vars.push(['--hyf-text-align-cta', theme.layout['cta-text-align']])

  return vars
}

function generateDarkVars(theme: ThemeConfig): Array<[string, string]> {
  if (!theme.dark) return []

  const vars: Array<[string, string]> = []

  if (theme.dark.colors) {
    for (const [key, value] of Object.entries(theme.dark.colors)) {
      if (value !== undefined) {
        vars.push([`--hyf-color-${key}`, value])
      }
    }
  }

  return vars
}

function resolveColorRef(theme: ThemeConfig, ref: string): string {
  const colors = theme.colors as Record<string, string>
  if (colors[ref] !== undefined) {
    return `var(--hyf-color-${ref})`
  }
  return ref
}

function resolveRadius(theme: ThemeConfig, ref: string): string {
  const radii = theme.radius as Record<string, string>
  if (radii[ref] !== undefined) {
    return radii[ref]
  }
  return ref
}

function resolveScale(theme: ThemeConfig, ref: string): string {
  const scale = theme.typography.scale as Record<string, string>
  if (scale[ref] !== undefined) {
    return scale[ref]
  }
  return ref
}

function resolveShadow(theme: ThemeConfig, ref: string): string {
  const shadows = theme.shadows as Record<string, string>
  if (shadows[ref] !== undefined) {
    return shadows[ref]
  }
  return ref
}
