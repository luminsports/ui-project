import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
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

  // TODO: it renders thumbs
})
