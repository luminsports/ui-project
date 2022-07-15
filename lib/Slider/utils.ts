import { inject, Ref } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'

export function linearInterpolation (value: number, x1 = 0, y1 = 100, x2 = 0, y2 = 100): number {
  const outputScaleDifference = y2 - x2
  const inputScaleDifference = y1 - x1

  return (((value - x1) * outputScaleDifference / inputScaleDifference) + x2)
}

export const SliderSymbol = Symbol()
export type UnregisterThumb = (componentUid: number) => void
export type RegisterThumb = (componentUid: number, value: number | Ref<number>) => UnregisterThumb
export interface ThumbMap {
  [key: number]: Ref<number>
}

export type SliderContext = {
  min: number,
  max: number,
  step: number,
  thumbs: UnwrapNestedRefs<ThumbMap>,
  registerThumb: RegisterThumb
}

export function useSlider (component: string): SliderContext {
  const context = inject<SliderContext>(SliderSymbol)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Slider /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useSlider)
    throw err
  }

  return context
}
