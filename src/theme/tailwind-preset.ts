import type { Config } from 'tailwindcss'

export const hyfolioPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        'hyf-background': 'var(--hyf-color-background)',
        'hyf-foreground': 'var(--hyf-color-foreground)',
        'hyf-primary': 'var(--hyf-color-primary)',
        'hyf-primary-foreground': 'var(--hyf-color-primary-foreground)',
        'hyf-secondary': 'var(--hyf-color-secondary)',
        'hyf-secondary-foreground': 'var(--hyf-color-secondary-foreground)',
        'hyf-muted': 'var(--hyf-color-muted)',
        'hyf-muted-foreground': 'var(--hyf-color-muted-foreground)',
        'hyf-accent': 'var(--hyf-color-accent)',
        'hyf-destructive': 'var(--hyf-color-destructive)',
        'hyf-border': 'var(--hyf-color-border)',
        'hyf-ring': 'var(--hyf-color-ring)',
      },
      spacing: {
        'hyf-section': 'var(--hyf-section-padding)',
        'hyf-container': 'var(--hyf-container-padding)',
      },
      maxWidth: {
        'hyf-container': 'var(--hyf-container-max)',
      },
      borderRadius: {
        'hyf-sm': 'var(--hyf-radius-sm)',
        'hyf-md': 'var(--hyf-radius-md)',
        'hyf-lg': 'var(--hyf-radius-lg)',
        'hyf-xl': 'var(--hyf-radius-xl)',
        'hyf-2xl': 'var(--hyf-radius-2xl)',
        'hyf-full': 'var(--hyf-radius-full)',
      },
      boxShadow: {
        'hyf-sm': 'var(--hyf-shadow-sm)',
        'hyf-md': 'var(--hyf-shadow-md)',
        'hyf-lg': 'var(--hyf-shadow-lg)',
        'hyf-xl': 'var(--hyf-shadow-xl)',
      },
      fontFamily: {
        'hyf-heading': 'var(--hyf-font-heading)',
        'hyf-body': 'var(--hyf-font-body)',
        'hyf-mono': 'var(--hyf-font-mono)',
      },
      fontSize: {
        'hyf-xs': 'var(--hyf-text-xs)',
        'hyf-sm': 'var(--hyf-text-sm)',
        'hyf-base': 'var(--hyf-text-base)',
        'hyf-lg': 'var(--hyf-text-lg)',
        'hyf-xl': 'var(--hyf-text-xl)',
        'hyf-2xl': 'var(--hyf-text-2xl)',
        'hyf-3xl': 'var(--hyf-text-3xl)',
        'hyf-4xl': 'var(--hyf-text-4xl)',
        'hyf-5xl': 'var(--hyf-text-5xl)',
        'hyf-6xl': 'var(--hyf-text-6xl)',
      },
      transitionDuration: {
        'hyf-fast': 'var(--hyf-transition-fast)',
        'hyf-normal': 'var(--hyf-transition-normal)',
        'hyf-slow': 'var(--hyf-transition-slow)',
      },
      transitionTimingFunction: {
        'hyf': 'var(--hyf-transition-easing)',
      },
    },
  },
}
