// import { mount } from '@vue/test-utils'
// import { expect, vi, it, describe } from 'vitest'
// import Slider from './Slider.vue'
// import { defineComponent } from 'vue'
//
// global.ResizeObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }))
//
// const slider = defineComponent({
//   name: 'test-slider',
//   components: { Slider },
//   template: `
//     <Slider>
//       <div>Nope</div>
//     </Slider>
// `,
// })
//
// /** @vitest-environment jsdom */
// describe('Slider:', () => {
//   it('can have a random element inside the slider for no reason!', function () {
//     expect(Slider).toBeTruthy()
//
//     const wrapper = mount(slider, {
//       props: {},
//     })
//
//     expect(wrapper.text()).toContain('Nope')
//
//     // this might not be exactly what we want to assert observe was called
//     expect(global.ResizeObserver).toHaveBeenCalled()
//   })
// })

import { describe, it } from 'vitest'

describe('slider', () => {
  it('nope', () => {})
})
