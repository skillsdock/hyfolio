import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { detectPackageManager, getInstallCommand, getRunCommand } from '../../../src/cli/utils/package-manager.js'

let tmpDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-pm-${Date.now()}`)
  await fs.ensureDir(tmpDir)
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

describe('detectPackageManager', () => {
  it('detects bun from bun.lockb', async () => {
    await fs.writeFile(path.join(tmpDir, 'bun.lockb'), '')
    const pm = detectPackageManager(tmpDir)
    expect(pm).toBe('bun')
  })

  it('detects pnpm from pnpm-lock.yaml', async () => {
    await fs.writeFile(path.join(tmpDir, 'pnpm-lock.yaml'), '')
    const pm = detectPackageManager(tmpDir)
    expect(pm).toBe('pnpm')
  })

  it('detects yarn from yarn.lock', async () => {
    await fs.writeFile(path.join(tmpDir, 'yarn.lock'), '')
    const pm = detectPackageManager(tmpDir)
    expect(pm).toBe('yarn')
  })

  it('defaults to npm when no lockfile found', () => {
    const pm = detectPackageManager(tmpDir)
    expect(pm).toBe('npm')
  })

  it('prefers bun over others when multiple lockfiles exist', async () => {
    await fs.writeFile(path.join(tmpDir, 'bun.lockb'), '')
    await fs.writeFile(path.join(tmpDir, 'package-lock.json'), '')
    const pm = detectPackageManager(tmpDir)
    expect(pm).toBe('bun')
  })
})

describe('getInstallCommand', () => {
  it('returns correct install command for each package manager', () => {
    expect(getInstallCommand('npm')).toBe('npm install')
    expect(getInstallCommand('yarn')).toBe('yarn')
    expect(getInstallCommand('pnpm')).toBe('pnpm install')
    expect(getInstallCommand('bun')).toBe('bun install')
  })
})

describe('getRunCommand', () => {
  it('returns correct run command for each package manager', () => {
    expect(getRunCommand('npm')).toBe('npm run')
    expect(getRunCommand('yarn')).toBe('yarn')
    expect(getRunCommand('pnpm')).toBe('pnpm')
    expect(getRunCommand('bun')).toBe('bun run')
  })
})
