import { z } from 'zod'

const hexColor = z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, {
  message: 'Must be a valid hex color (e.g. #fff, #ffffff, #ffffffaa)',
})

const cssValue = z.string()

const colorsSchema = z.object({
  background: hexColor,
  foreground: hexColor,
  primary: hexColor,
  'primary-foreground': hexColor,
  secondary: hexColor,
  'secondary-foreground': hexColor,
  muted: hexColor,
  'muted-foreground': hexColor,
  accent: hexColor,
  destructive: hexColor,
  border: hexColor,
  ring: hexColor,
})

const scaleKeys = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const
const scaleKeyEnum = z.enum(scaleKeys)

const trackingKeyEnum = z.enum(['tight', 'normal', 'wide'])

const headingSchema = z.object({
  size: scaleKeyEnum,
  weight: z.number().int().min(100).max(900),
  tracking: trackingKeyEnum.optional(),
})

const typographySchema = z.object({
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
    mono: z.string(),
  }),
  scale: z.object({
    xs: cssValue,
    sm: cssValue,
    base: cssValue,
    lg: cssValue,
    xl: cssValue,
    '2xl': cssValue,
    '3xl': cssValue,
    '4xl': cssValue,
    '5xl': cssValue,
    '6xl': cssValue,
  }),
  headings: z.object({
    h1: headingSchema,
    h2: headingSchema,
    h3: headingSchema,
    h4: headingSchema,
    h5: headingSchema,
    h6: headingSchema,
  }),
  'line-height': z.object({
    tight: z.number(),
    normal: z.number(),
    relaxed: z.number(),
  }),
  'letter-spacing': z.object({
    tight: cssValue,
    normal: cssValue,
    wide: cssValue,
  }),
})

const radiusKeyEnum = z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full'])

const xyPadding = z.object({
  x: cssValue,
  y: cssValue,
})

const spacingSchema = z.object({
  'section-padding': cssValue,
  'container-max': cssValue,
  'container-padding': cssValue,
})

const radiusSchema = z.object({
  sm: cssValue,
  md: cssValue,
  lg: cssValue,
  xl: cssValue,
  '2xl': cssValue,
  full: cssValue,
})

const shadowsSchema = z.object({
  sm: cssValue,
  md: cssValue,
  lg: cssValue,
  xl: cssValue,
})

const transitionsSchema = z.object({
  fast: cssValue,
  normal: cssValue,
  slow: cssValue,
  easing: cssValue,
})

const colorRefOrHex = z.string()

const buttonsSchema = z.object({
  radius: radiusKeyEnum,
  'font-weight': z.number().int().min(100).max(900),
  padding: xyPadding,
  'font-size': scaleKeyEnum,
  primary: z.object({
    background: colorRefOrHex,
    foreground: colorRefOrHex,
  }),
  secondary: z.object({
    background: colorRefOrHex,
    foreground: colorRefOrHex,
  }),
  outline: z.object({
    border: colorRefOrHex,
  }),
  ghost: z.object({
    'hover-background': colorRefOrHex,
  }),
})

const cardsSchema = z.object({
  radius: radiusKeyEnum,
  padding: cssValue,
  shadow: z.enum(['sm', 'md', 'lg', 'xl']),
  border: z.boolean(),
})

const formsSchema = z.object({
  'input-radius': radiusKeyEnum,
  'input-padding': xyPadding,
  'input-border': z.boolean(),
  'focus-ring-width': cssValue,
  'focus-ring-color': colorRefOrHex,
})

const loaderStyleEnum = z.enum(['spinner', 'bar', 'dots'])

const loadersSchema = z.object({
  color: colorRefOrHex,
  size: cssValue,
  'border-width': cssValue,
  speed: cssValue,
  'page-loader': z.object({
    background: colorRefOrHex,
    style: loaderStyleEnum,
  }),
})

const badgesSchema = z.object({
  radius: radiusKeyEnum,
  padding: xyPadding,
  'font-size': scaleKeyEnum,
  'font-weight': z.number().int().min(100).max(900),
})

const textAlignEnum = z.enum(['left', 'center', 'right'])

const layoutSchema = z.object({
  'default-text-align': textAlignEnum,
  'hero-text-align': textAlignEnum,
  'cta-text-align': textAlignEnum,
})

const darkSchema = z.object({
  colors: colorsSchema.partial(),
}).optional()

export const themeSchema = z.object({
  colors: colorsSchema,
  typography: typographySchema,
  spacing: spacingSchema,
  radius: radiusSchema,
  shadows: shadowsSchema,
  transitions: transitionsSchema,
  buttons: buttonsSchema,
  cards: cardsSchema,
  forms: formsSchema,
  loaders: loadersSchema,
  badges: badgesSchema,
  layout: layoutSchema,
  dark: darkSchema,
})

export type ThemeConfig = z.infer<typeof themeSchema>
