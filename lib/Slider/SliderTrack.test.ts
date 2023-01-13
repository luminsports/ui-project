import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import { defineComponent } from 'vue'
import SliderTrack from './SliderTrack.vue'
import Slider from './Slider.vue'
import SliderThumb from './SliderThumb.vue'

/** @vitest-environment jsdom */
describe('SliderTrack:', () => {
  it('should throw an error if not used inside of a Slider component', function () {
    expect(SliderTrack).toBeTruthy()

    expect(() =>
      mount(SliderTrack, {
        props: {},
      })
    ).toThrowError('<SliderTrack /> is missing a parent <Slider /> component.')
  })

  // TODO: it renders slider track

  it('idk', () => {
    const slider = defineComponent({
      name: 'my-slider',
      components: { Slider, SliderTrack, SliderThumb },
      template: `
        <Slider :min="0" :max="100">
          <SliderTrack v-slot="{ value, style, index, start, end, isFirst, isLast }">
            <div :data-track-index="index"></div>
          </SliderTrack>

          <SliderThumb :model-value="0" />
          <SliderThumb :model-value="50" />
          <SliderThumb :model-value="98" />
        </Slider>
      `,
    })

    const sliderWithTracks = mount(slider, {})

    // TODO: check that n+1 slider tracks are rendered some how.
  })
})
