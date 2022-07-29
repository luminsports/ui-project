import { getCurrentInstance, inject, onMounted, onUnmounted, Ref } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'

export function linearInterpolation(
  value: number,
  x1 = 0,
  y1 = 100,
  x2 = 0,
  y2 = 100,
  clamp: boolean = false
): number {
  const outputScaleDifference = y2 - x2
  const inputScaleDifference = y1 - x1

  const interpolatedValue = ((value - x1) * outputScaleDifference) / inputScaleDifference + x2

  return clamp ? Math.max(x2, Math.min(y2, interpolatedValue)) : interpolatedValue
}

export const SliderSymbol = Symbol('SliderSymbol')
export type RegisterThumb = (componentUid: number, value: Ref<number>) => void
export type Thumb = {
  uid: number
  value: Ref<number>
}

export type SliderContext = {
  min: number
  max: number
  step: number
  slider: Ref<HTMLElement>
  thumbs: Ref<Thumb[]>
  registerThumb: RegisterThumb
}

export function useSlider(component: string): SliderContext {
  const context = inject<SliderContext>(SliderSymbol)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Slider /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useSlider)
    throw err
  }

  return context
}
