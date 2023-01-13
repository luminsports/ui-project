import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Slider from './Slider.vue'
import SliderTicks from './SliderTicks.vue'

/** @vitest-environment jsdom */
describe('SliderTicks:', () => {
  it('should throw an error if not used inside of a Slider component', function () {
    expect(SliderTicks).toBeTruthy()

    expect(() =>
      mount(SliderTicks, {
        props: {
          at: [],
        },
      })
    ).toThrowError('<SliderTicks /> is missing a parent <Slider /> component.')
  })

  it('should render ticks', () => {
    const slider = defineComponent({
      name: 'slider-labels',
      components: { Slider, SliderTicks },
      template: `
        <Slider :min="0" :max="1000">
          <SliderTicks :at="[0, 50, 100]" v-slot="{ value, index, style, interpolatedValue } ">
            <div :style="style">{{ value }},{{ index }},{{ interpolatedValue }}</div>
          </SliderTicks>
        </Slider>
      `,
    })

    const sliderWithTicks = mount(slider, {})

    expect(sliderWithTicks.element.children).length(3)
    expect(sliderWithTicks.element.children[0].textContent).toContain('0,0,0')
    expect(sliderWithTicks.element.children[1].textContent).toContain('50,1,5')
    expect(sliderWithTicks.element.children[2].textContent).toContain('100,2,10')
  })
})
