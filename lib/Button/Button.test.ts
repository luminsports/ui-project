import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Button from './Button.vue'

/** @vitest-environment jsdom */
test('mount button', function () {
  expect(Button).toBeTruthy()

  const wrapper = mount(Button, {
    props: {
      label: 'Hello World',
      primary: true,
    },
  })

  expect(wrapper.text()).toContain('Hello World')
  expect(wrapper.text()).toContain('primary')
})
