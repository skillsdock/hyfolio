import path from 'path'
import fs from 'fs-extra'
import { loadConfig } from './utils/config-loader.js'
import { logger } from './utils/logger.js'

export async function buildThemeAction(options: {
  projectDir: string
  generateTheme: (yamlContent: string) => string
}): Promise<void> {
  const { projectDir, generateTheme } = options

  const config = await loadConfig(projectDir)
  const themePath = path.join(projectDir, config.styling.theme)

  if (!(await fs.pathExists(themePath))) {
    throw new Error(`Theme file not found: ${config.styling.theme}`)
  }

  const yamlContent = await fs.readFile(themePath, 'utf-8')
  const css = generateTheme(yamlContent)
  const outputPath = path.join(projectDir, config.lib, 'theme.css')

  await fs.ensureDir(path.dirname(outputPath))
  await fs.writeFile(outputPath, css)

  logger.success(`Theme built from ${config.styling.theme}`)
}
