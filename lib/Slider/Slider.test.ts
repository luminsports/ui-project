import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Slider from './Slider.vue'

/** @vitest-environment jsdom */
test('mount slider', function() {
  expect(Slider).toBeTruthy()

  const wrapper = mount(Slider, {
    props: {},
  })
})
