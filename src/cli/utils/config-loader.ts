import path from 'path'
import fs from 'fs-extra'
import { createJiti } from 'jiti'

export interface HyfolioConfig {
  blocks: string
  templates: string
  lib: string
  styling: {
    framework: 'tailwind' | 'css'
    theme: string
  }
  payload: string
}

export function getDefaultConfig(): HyfolioConfig {
  return {
    blocks: 'src/blocks',
    templates: 'src/templates',
    lib: 'src/lib/hyfolio',
    styling: {
      framework: 'tailwind',
      theme: 'hyfolio.theme.yaml',
    },
    payload: 'payload.config.ts',
  }
}

export async function loadConfig(projectDir: string): Promise<HyfolioConfig> {
  const defaults = getDefaultConfig()
  const configPath = path.join(projectDir, 'hyfolio.config.ts')

  if (!fs.existsSync(configPath)) {
    return defaults
  }

  const jiti = createJiti(projectDir, {
    interopDefault: true,
    requireCache: false,
  })

  const loaded = (await jiti.import(configPath)) as Partial<HyfolioConfig>

  return {
    blocks: loaded.blocks ?? defaults.blocks,
    templates: loaded.templates ?? defaults.templates,
    lib: loaded.lib ?? defaults.lib,
    styling: {
      framework: loaded.styling?.framework ?? defaults.styling.framework,
      theme: loaded.styling?.theme ?? defaults.styling.theme,
    },
    payload: loaded.payload ?? defaults.payload,
  }
}
