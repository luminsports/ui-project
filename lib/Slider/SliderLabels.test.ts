import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import SliderLabels from './SliderLabels.vue'
import { defineComponent } from 'vue'
import Slider from './Slider.vue'

/** @vitest-environment jsdom */
describe('SliderLabels:', () => {
  it('should throw an error if not used inside of a Slider component', function () {
    expect(SliderLabels).toBeTruthy()

    expect(() =>
      mount(SliderLabels, {
        props: {
          at: [],
        },
      })
    ).toThrowError('<SliderLabels /> is missing a parent <Slider /> component.')
  })

  it('should print labels', () => {
    const slider = defineComponent({
      name: 'slider-labels',
      components: { Slider, SliderLabels },
      template: `
        <Slider :min="0" :max="1000">
          <SliderLabels :at="[0, 50, 100]" v-slot="{ value, index, style, interpolatedValue } ">
            <div :style="style">{{ value }},{{ index }},{{ interpolatedValue }}</div>
          </SliderLabels>
        </Slider>
      `,
    })

    const sliderWithLabels = mount(slider, {})

    expect(sliderWithLabels.element.children).length(3)
    expect(sliderWithLabels.element.children[0].textContent).toContain('0,0,0')
    expect(sliderWithLabels.element.children[1].textContent).toContain('50,1,5')
    expect(sliderWithLabels.element.children[2].textContent).toContain('100,2,10')
  })
})
