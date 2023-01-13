import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import SliderTrack from './SliderTrack.vue'

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
})
