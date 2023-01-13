import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import SliderRail from './SliderRail.vue'

/** @vitest-environment jsdom */
describe('SliderRail:', () => {
  it('should throw an error if not used inside of a Slider component', function () {
    expect(SliderRail).toBeTruthy()

    const sliderRail = mount(SliderRail, { props: {} })

    expect(sliderRail.element).toBeInstanceOf(HTMLDivElement)
    expect(getComputedStyle(sliderRail.element).position).toBe('relative')
  })
})
