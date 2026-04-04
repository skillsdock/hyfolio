# Theming Guide

hyfolio uses a YAML-based design system. Every visual decision -- colors, typography, spacing, radius, shadows, buttons, cards -- lives in one file: `hyfolio.theme.yaml`. The CLI generates CSS variables from it. Blocks reference the variables at runtime.

## How It Works

1. You edit `hyfolio.theme.yaml`
2. Run `npx hyfolio build-theme` (or auto-runs during `npm run dev`)
3. CSS variables are written to `src/lib/hyfolio/theme.css`
4. Every block and primitive reads these variables -- no per-block theming needed

## YAML Schema Reference

### Colors

```yaml
colors:
  background: "#ffffff"         # Page background
  foreground: "#0a0a0a"         # Default text color
  primary: "#2563eb"            # Brand color, buttons, links
  primary-foreground: "#ffffff" # Text on primary-colored backgrounds
  secondary: "#f4f4f5"          # Secondary backgrounds, subtle elements
  secondary-foreground: "#18181b"
  muted: "#f4f4f5"              # Muted backgrounds (e.g., disabled states)
  muted-foreground: "#71717a"   # Muted text (subtitles, descriptions)
  accent: "#f4f4f5"             # Hover backgrounds, highlights
  destructive: "#ef4444"        # Error states, delete actions
  border: "#e4e4e7"             # Border color for cards, inputs, dividers
  ring: "#2563eb"               # Focus ring color for inputs and buttons
```

Generated CSS variables: `--hyf-background`, `--hyf-foreground`, `--hyf-primary`, etc.

### Typography

```yaml
typography:
  fonts:
    heading: "Inter"            # Font for h1-h6
    body: "Inter"               # Font for body text
    mono: "JetBrains Mono"      # Font for code/mono elements
  scale:
    xs: 0.75rem                 # 12px
    sm: 0.875rem                # 14px
    base: 1rem                  # 16px
    lg: 1.125rem                # 18px
    xl: 1.25rem                 # 20px
    2xl: 1.5rem                 # 24px
    3xl: 1.875rem               # 30px
    4xl: 2.25rem                # 36px
    5xl: 3rem                   # 48px
    6xl: 3.75rem                # 60px
  headings:
    h1: { size: 5xl, weight: 800, tracking: tight }
    h2: { size: 4xl, weight: 700, tracking: tight }
    h3: { size: 2xl, weight: 600 }
    h4: { size: xl, weight: 600 }
    h5: { size: lg, weight: 600 }
    h6: { size: base, weight: 600 }
  line-height:
    tight: 1.2
    normal: 1.5
    relaxed: 1.75
  letter-spacing:
    tight: -0.025em
    normal: 0
    wide: 0.05em
```

Generated CSS variables: `--hyf-font-heading`, `--hyf-text-xs` through `--hyf-text-6xl`, `--hyf-leading-tight`, etc.

**Heading cross-references:** `headings.h1.size: 5xl` references `scale.5xl` (3rem). Change `scale.5xl` once and all headings using it update.

### Spacing

```yaml
spacing:
  section-padding: 6rem         # Vertical padding for all <HyfSection> wrappers
  container-max: 1200px         # Max width for <HyfContainer>
  container-padding: 1.5rem     # Horizontal padding for <HyfContainer>
```

Generated CSS variables: `--hyf-section-padding`, `--hyf-container-max`, `--hyf-container-padding`.

### Border Radius

```yaml
radius:
  sm: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  2xl: 1rem
  full: 9999px
```

Generated CSS variables: `--hyf-radius-sm` through `--hyf-radius-full`.

### Shadows

```yaml
shadows:
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
```

Generated CSS variables: `--hyf-shadow-sm` through `--hyf-shadow-xl`.

### Transitions

```yaml
transitions:
  fast: 150ms
  normal: 250ms
  slow: 400ms
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"
```

Generated CSS variables: `--hyf-transition-fast`, `--hyf-transition-normal`, `--hyf-transition-slow`, `--hyf-easing`.

### Buttons

```yaml
buttons:
  radius: md                    # Cross-references radius.md (0.375rem)
  font-weight: 500
  padding: { x: 1.5rem, y: 0.75rem }
  font-size: sm                 # Cross-references typography.scale.sm (0.875rem)
  primary:
    background: primary         # Cross-references colors.primary
    foreground: primary-foreground
  secondary:
    background: secondary
    foreground: secondary-foreground
  outline:
    border: border
  ghost:
    hover-background: accent
```

Cross-references resolve at build time. `buttons.radius: md` becomes `var(--hyf-radius-md)` in CSS.

### Cards

```yaml
cards:
  radius: lg                    # Cross-references radius.lg (0.5rem)
  padding: 1.5rem
  shadow: sm                    # Cross-references shadows.sm
  border: true
```

### Forms

```yaml
forms:
  input-radius: md
  input-padding: { x: 1rem, y: 0.75rem }
  input-border: true
  focus-ring-width: 2px
  focus-ring-color: ring        # Cross-references colors.ring
```

### Badges

```yaml
badges:
  radius: full
  padding: { x: 0.75rem, y: 0.25rem }
  font-size: xs
  font-weight: 500
```

### Loaders

```yaml
loaders:
  color: primary
  size: 1.5rem
  border-width: 2px
  speed: 0.8s
  page-loader:
    background: background
    style: spinner              # spinner | bar | dots
```

### Layout

```yaml
layout:
  default-text-align: left
  hero-text-align: center
  cta-text-align: center
```

## Cross-References

Values can reference other tokens by name. The generator resolves these at build time:

| YAML value | Resolves to |
|------------|-------------|
| `buttons.radius: md` | `var(--hyf-radius-md)` (from `radius.md: 0.375rem`) |
| `cards.shadow: sm` | `var(--hyf-shadow-sm)` (from `shadows.sm`) |
| `forms.focus-ring-color: ring` | `var(--hyf-ring)` (from `colors.ring: "#2563eb"`) |
| `headings.h1.size: 5xl` | `var(--hyf-text-5xl)` (from `typography.scale.5xl: 3rem`) |

This means changing `radius.md` from `0.375rem` to `0.5rem` updates buttons, inputs, and anything else referencing `md` radius.

## Dark Mode

Every preset includes a `dark` section that overrides color values:

```yaml
dark:
  colors:
    background: "#0a0a0a"
    foreground: "#fafafa"
    primary: "#3b82f6"
    # ... other color overrides
```

The generator outputs these inside a `.dark` selector:

```css
.dark {
  --hyf-background: #0a0a0a;
  --hyf-foreground: #fafafa;
  /* ... */
}
```

To toggle dark mode, add or remove the `dark` class on `<html>`:

```tsx
document.documentElement.classList.toggle('dark')
```

Blocks do not need dark mode logic. They reference tokens. Tokens change under `.dark`. Everything updates.

## Theme Presets

hyfolio ships with 3 presets:

| Preset | Vibe |
|--------|------|
| **minimal** | Clean, lots of whitespace, neutral palette, Inter font |
| **bold** | High contrast, strong colors, larger type scale, tighter spacing |
| **warm** | Soft tones, rounded corners, friendly feel, serif headings |

### Using a preset

When you run `npx create-hyfolio`, you pick a preset. The CLI copies that preset's YAML into your project as `hyfolio.theme.yaml`.

### Creating a custom preset

1. Start from an existing preset (copy `hyfolio.theme.yaml`)
2. Modify any values you want
3. Run `npx hyfolio build-theme`

There is no preset registration system. Your `hyfolio.theme.yaml` is the only file that matters.

## Tailwind Integration

When `styling.framework` is `'tailwind'` in your `hyfolio.config.ts`, the generated CSS variables are also mapped to Tailwind utilities via the config:

```typescript
// tailwind.config.ts (generated by hyfolio init)
theme: {
  extend: {
    colors: {
      background: 'var(--hyf-background)',
      primary: { DEFAULT: 'var(--hyf-primary)' },
      // ...
    },
  },
}
```

This lets you use `bg-primary`, `text-muted-foreground`, `rounded-lg`, etc., directly in Tailwind classes. The values come from your YAML config.

## CSS-Only Mode

If you do not use Tailwind, set `styling.framework: 'css'` in `hyfolio.config.ts`. Blocks use inline CSS variable references:

```css
.my-button {
  background-color: var(--hyf-primary);
  border-radius: var(--hyf-button-radius);
  padding: var(--hyf-button-padding-y) var(--hyf-button-padding-x);
}
```

## Primitives

Blocks compose shared primitives to prevent design drift:

| Primitive | Component | Purpose |
|-----------|-----------|---------|
| `<HyfButton>` | `primitives/button.tsx` | Buttons with variant support (primary, secondary, outline, ghost) |
| `<HyfCard>` | `primitives/card.tsx` | Card container with consistent radius, padding, shadow |
| `<HyfLoader>` | `primitives/loader.tsx` | Full-page loading spinner |
| `<HyfInlineLoader>` | `primitives/loader.tsx` | Inline loading spinner |
| `<HyfBadge>` | `primitives/badge.tsx` | Small labels and tags |
| `<HyfContainer>` | `primitives/container.tsx` | Max-width wrapper with horizontal padding |
| `<HyfSection>` | `primitives/section.tsx` | Consistent vertical section padding |

Every block uses these instead of creating its own buttons or cards. Change a token once, every block follows.
