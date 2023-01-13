import { mount } from '@vue/test-utils'
import { expect, vi, it, describe, beforeAll } from 'vitest'
import Slider from './Slider.vue'

/** @vitest-environment jsdom */
describe('Slider:', () => {
  it('can have a random element inside the slider for no reason!', function () {
    expect(Slider).toBeTruthy()

    mount(Slider, {
      props: {},
    })

    // this might not be exactly what we want to assert observe was called
    expect(global.ResizeObserver).toHaveBeenCalled()
  })
})
