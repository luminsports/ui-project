import { expect, vi, it, describe } from 'vitest'
import {linearInterpolation} from '.'

describe('src/simple-linear-interpolation.ts', () => {
    it('should do extrapolation `y` variable by parameters equal matrix data', () => {
      const params = { y: 2 };
      expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(2);
    });
  
    it('should do extrapolation `y` variable by parameters between matrix data', () => {
      const params = { y: 1.5 };
      expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(1.5);
    });
  
    it('should do left extrapolation `y` variable', () => {
      const params = { y: -1.5 };
      expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(-1.5);
    });
  
    it('should do right extrapolation `y` variable', () => {
      const params = { y: 3 };
      expect(linearInterpolation(params.y, 1, 2, 1, 2)).toEqual(3);
    });
  
});