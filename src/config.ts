/**
 * Styling configuration for the hyfolio project.
 */
export interface HyfolioStylingConfig {
  /** CSS framework to use: 'tailwind' generates a Tailwind preset, 'css' outputs plain CSS variables. */
  framework: 'tailwind' | 'css'
  /** Path to the theme YAML file relative to the project root. */
  theme: string
}

/**
 * Root configuration for a hyfolio project.
 * Lives in `hyfolio.config.ts` at the project root.
 */
export interface HyfolioConfig {
  /** Directory where block source files are stored. Default: 'src/blocks' */
  blocks: string
  /** Directory where template source files are stored. Default: 'src/templates' */
  templates: string
  /** Directory where shared hyfolio utilities (types, render, primitives, theme.css) live. Default: 'src/lib/hyfolio' */
  lib: string
  /** Styling configuration. */
  styling: HyfolioStylingConfig
  /** Path to the Payload config file relative to the project root. Default: 'payload.config.ts' */
  payload: string
}

const DEFAULT_CONFIG: HyfolioConfig = {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: {
    framework: 'tailwind',
    theme: 'hyfolio.theme.yaml',
  },
  payload: 'payload.config.ts',
}

/**
 * Define the hyfolio configuration for your project.
 * Merges provided values with sensible defaults.
 *
 * @example
 * ```ts
 * // hyfolio.config.ts
 * import { defineConfig } from 'hyfolio'
 *
 * export default defineConfig({
 *   blocks: 'src/blocks',
 *   styling: {
 *     framework: 'tailwind',
 *     theme: 'hyfolio.theme.yaml',
 *   },
 * })
 * ```
 */
export function defineConfig(config: Partial<HyfolioConfig> = {}): HyfolioConfig {
  return {
    blocks: config.blocks ?? DEFAULT_CONFIG.blocks,
    templates: config.templates ?? DEFAULT_CONFIG.templates,
    lib: config.lib ?? DEFAULT_CONFIG.lib,
    styling: {
      framework: config.styling?.framework ?? DEFAULT_CONFIG.styling.framework,
      theme: config.styling?.theme ?? DEFAULT_CONFIG.styling.theme,
    },
    payload: config.payload ?? DEFAULT_CONFIG.payload,
  }
}
