import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--hyf-background)',
        foreground: 'var(--hyf-foreground)',
        primary: {
          DEFAULT: 'var(--hyf-primary)',
          foreground: 'var(--hyf-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--hyf-secondary)',
          foreground: 'var(--hyf-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--hyf-muted)',
          foreground: 'var(--hyf-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--hyf-accent)',
        },
        destructive: {
          DEFAULT: 'var(--hyf-destructive)',
        },
        border: 'var(--hyf-border)',
        ring: 'var(--hyf-ring)',
      },
      borderRadius: {
        sm: 'var(--hyf-radius-sm)',
        md: 'var(--hyf-radius-md)',
        lg: 'var(--hyf-radius-lg)',
        xl: 'var(--hyf-radius-xl)',
      },
      fontFamily: {
        heading: ['var(--hyf-font-heading)'],
        body: ['var(--hyf-font-body)'],
        mono: ['var(--hyf-font-mono)'],
      },
      boxShadow: {
        sm: 'var(--hyf-shadow-sm)',
        md: 'var(--hyf-shadow-md)',
        lg: 'var(--hyf-shadow-lg)',
        xl: 'var(--hyf-shadow-xl)',
      },
      maxWidth: {
        container: 'var(--hyf-container-max)',
      },
      padding: {
        section: 'var(--hyf-section-padding)',
        container: 'var(--hyf-container-padding)',
      },
    },
  },
  plugins: [],
}

export default config
