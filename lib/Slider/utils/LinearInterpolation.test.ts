import { expect, it, describe } from 'vitest'
import { linearInterpolation } from '.'

describe('src/simple-linear-interpolation.ts', () => {
  it('should do extrapolation `y` variable by parameters equal matrix data', () => {
    const params = { y: 2 }
    expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(2)
  })

  it('should do extrapolation `y` variable by parameters between matrix data', () => {
    const params = { y: 1.5 }
    expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(1.5)
  })

  it('should do left extrapolation `y` variable', () => {
    const params = { y: -1.5 }
    expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(-1.5)
  })

  it('should do right extrapolation `y` variable', () => {
    const params = { y: 3 }
    expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(3)
  })

  it('should clamp interpolated values', () => {
    expect(linearInterpolation(11, 0, 10, 0, 100)).toEqual(110)
    expect(linearInterpolation(11, 0, 10, 0, 100, true)).toEqual(100)
  })
})
