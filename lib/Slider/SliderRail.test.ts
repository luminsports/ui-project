import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import SliderRail from './SliderRail.vue'

/** @vitest-environment jsdom */
describe('SliderRail:', () => {
  it('should render a div', function () {
    expect(SliderRail).toBeTruthy()

    const sliderRail = mount(SliderRail, { props: {} })

    expect(sliderRail.element).toBeInstanceOf(HTMLDivElement)
  })
  
  it('should have the correct styles', function() {
    const sliderRail = mount(SliderRail, { props: {} })

    expect(getComputedStyle(sliderRail.element).position).toBe('relative')
  })
})
