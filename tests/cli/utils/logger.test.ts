import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger } from '../../../src/cli/utils/logger.js'

const mockStdout: string[] = []
const mockStderr: string[] = []

beforeEach(() => {
  mockStdout.length = 0
  mockStderr.length = 0
  vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
    mockStdout.push(String(chunk))
    return true
  })
  vi.spyOn(process.stderr, 'write').mockImplementation((chunk: string | Uint8Array) => {
    mockStderr.push(String(chunk))
    return true
  })
})

describe('logger', () => {
  it('success outputs check mark and message', () => {
    logger.success('Added hero block')
    const output = mockStdout.join('')
    expect(output).toContain('Added hero block')
  })

  it('error outputs message to stderr', () => {
    logger.error('Block not found')
    const output = mockStderr.join('')
    expect(output).toContain('Block not found')
  })

  it('info outputs message', () => {
    logger.info('Installing dependencies...')
    const output = mockStdout.join('')
    expect(output).toContain('Installing dependencies...')
  })

  it('warn outputs warning message', () => {
    logger.warn('Block already installed')
    const output = mockStdout.join('')
    expect(output).toContain('Block already installed')
  })

  it('newline outputs empty line', () => {
    logger.newline()
    const output = mockStdout.join('')
    expect(output).toContain('\n')
  })
})
