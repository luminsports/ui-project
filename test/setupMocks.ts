import { beforeAll, vi } from 'vitest'

beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),

    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})
