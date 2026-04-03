import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { loadConfig, getDefaultConfig } from '../../../src/cli/utils/config-loader.js'

let tmpDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-config-${Date.now()}`)
  await fs.ensureDir(tmpDir)
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

describe('getDefaultConfig', () => {
  it('returns default config with standard paths', () => {
    const config = getDefaultConfig()
    expect(config.blocks).toBe('src/blocks')
    expect(config.templates).toBe('src/templates')
    expect(config.lib).toBe('src/lib/hyfolio')
    expect(config.styling.framework).toBe('tailwind')
    expect(config.styling.theme).toBe('hyfolio.theme.yaml')
    expect(config.payload).toBe('payload.config.ts')
  })
})

describe('loadConfig', () => {
  it('returns default config when no hyfolio.config.ts exists', async () => {
    const config = await loadConfig(tmpDir)
    expect(config.blocks).toBe('src/blocks')
    expect(config.lib).toBe('src/lib/hyfolio')
  })

  it('loads config from hyfolio.config.ts when present', async () => {
    const configContent = `
export default {
  blocks: 'app/blocks',
  templates: 'app/templates',
  lib: 'app/lib/hyfolio',
  styling: {
    framework: 'css',
    theme: 'hyfolio.theme.yaml',
  },
  payload: 'payload.config.ts',
}
`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.config.ts'), configContent)
    const config = await loadConfig(tmpDir)
    expect(config.blocks).toBe('app/blocks')
    expect(config.lib).toBe('app/lib/hyfolio')
    expect(config.styling.framework).toBe('css')
  })

  it('merges partial config with defaults', async () => {
    const configContent = `
export default {
  blocks: 'custom/blocks',
}
`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.config.ts'), configContent)
    const config = await loadConfig(tmpDir)
    expect(config.blocks).toBe('custom/blocks')
    expect(config.templates).toBe('src/templates')
    expect(config.lib).toBe('src/lib/hyfolio')
  })
})
