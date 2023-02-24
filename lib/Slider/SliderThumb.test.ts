import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import { defineComponent } from 'vue'
import Slider from './Slider.vue'
import SliderThumb from './SliderThumb.vue'

/** @vitest-environment jsdom */
describe('SliderThumb:', () => {
  it('should throw an error if not used inside of a Slider component', function () {
    expect(SliderThumb).toBeTruthy()

    expect(() =>
      mount(SliderThumb, {
        props: {
          'model-value': 0,
        },
      })
    ).toThrowError('<SliderThumb /> is missing a parent <Slider /> component.')
  })

  it('renders thumbs', function () {
    const slider = defineComponent({
      name: 'my-slider',
      components: { Slider, SliderThumb },
      template: `
        <Slider :min="0" :max="100">
          <SliderThumb :model-value="0">0</SliderThumb>
          <SliderThumb :model-value="50">50</SliderThumb>
          <SliderThumb :model-value="98">98</SliderThumb>
        </Slider>
      `,
    })

    const renderedSlider = mount(slider, {
      props: {
        min: 0,
        max: 100,
      },
    })

    expect(renderedSlider.html()).toContain(
      '<div style="position: absolute; top: 0px; transform: translateX(0px) translateX(-50%);">0</div>'
    )
    expect(renderedSlider.html()).toContain(
      '<div style="position: absolute; top: 0px; transform: translateX(0px) translateX(-50%);">50</div>'
    )
    expect(renderedSlider.html()).toContain(
      '<div style="position: absolute; top: 0px; transform: translateX(0px) translateX(-50%);">98</div>'
    )
  })

  it('matches the snapshot', () => {
    const slider = defineComponent({
      name: 'my-slider',
      components: { Slider, SliderThumb },
      template: `
        <Slider :min="0" :max="100">
          <SliderThumb :model-value="0">0</SliderThumb>
        </Slider>
      `,
    })

    const renderedSlider = mount(slider, {
      props: {
        min: 0,
        max: 100,
      },
    })

    expect(renderedSlider).toMatchSnapshot()
  })

  //  TODO: test child components more than just html
})
