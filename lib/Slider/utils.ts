export function linearInterpolation (value: number, x1 = 0, y1 = 100, x2 = 0, y2 = 100): number {
  const outputScaleDifference = y2 - x2
  const inputScaleDifference = y1 - x1

  return (((value - x1) * outputScaleDifference / inputScaleDifference) + x2)
}
