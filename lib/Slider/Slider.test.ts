import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Slider from './Slider.vue'

/** @vitest-environment jsdom */
test('mount slider', function () {
  expect(Slider).toBeTruthy()

  const wrapper = mount(Slider, {
    props: {},
  })
})
