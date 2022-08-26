import Slider from './Slider.vue'
import SliderRail from './SliderRail.vue'
import SliderThumb from './SliderThumb.vue'
import SliderTrack from './SliderTrack.vue'
import SliderTicks from './SliderTicks.vue'
import SliderLabels from './SliderLabels.vue'

import { ref } from 'vue'

export default {
  title: 'Example/Slider',
  component: Slider,
  argTypes: {},
}

const HeartRateSliderTemplate = args => ({
  components: {
    Slider,
    SliderRail,
    SliderThumb,
    SliderTrack,
    SliderTicks,
    SliderLabels,
  },
  setup() {
    const Min = ref(80)
    const T1 = ref(100)
    const T2 = ref(120)
    const T3 = ref(140)
    const T4 = ref(160)
    const T5 = ref(180)
    const T6 = ref(200)
    const Max = ref(220)

    return { args, Min, T1, T2, T3, T4, T5, T6, Max }
  },
  template: `
    <Slider class="w-100 mx-5" :step="5" :min="0" :max="220">
      <SliderRail class="relative bg-gray-700 my-2">
        <SliderTrack v-slot="{ value, style, index, start, end, isFirst, isLast }">
          <div :style="style"
               class="bg-gray-200 h-5"
               :class="{
            'rounded-l-full': isFirst,
            'rounded-r-full': isLast,
            'bg-green-500': index === 2,
            'bg-green-700': index === 3,
            'bg-yellow-500': index === 4,
            'bg-orange-500': index === 5,
            'bg-red-500': index === 6,
            'bg-red-700': index === 7
          }" />
        </SliderTrack>

        <SliderThumb v-model="Min" v-slot="{ pressed, value }">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
          <div v-if="pressed" class="absolute bg-black text-white p-2 text-xs" style="transform:translateX(-50%)">
            {{ value }}
          </div>
        </SliderThumb>
        <SliderThumb v-model="T1">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="T2">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="T3">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="T4">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="T5">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="T6">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
        <SliderThumb v-model="Max">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>

        <SliderTicks :at="[0, 25, 50, 75, 100, 150]" v-slot="{ style, value, index }">
          <div :style="style" class="w-px h-8 bg-black" />
        </SliderTicks>
      </SliderRail>

      <SliderLabels :at="[0, 25, 30, 75, 100, 180, 220]" v-slot="{ style, value, index, interpolatedValue }">
        <div :style="style">{{ value }}</div>
      </SliderLabels>
  </Slider>`,
})

export const HeartRateSlider = HeartRateSliderTemplate.bind({})
HeartRateSlider.args = {}


const SimpleSliderTemplate = args => ({
  components: {
    Slider,
    SliderRail,
    SliderThumb,
    SliderTrack,
    SliderTicks,
    SliderLabels,
  },
  setup() {
    const value = ref(50)

    return { args, value }
  },
  template: `
    <Slider class="w-100 mx-5" :step="5">
      <SliderRail class="relative bg-gray-700 my-2">
        <SliderTicks :at="[0, 25, 50, 75, 100]" v-slot="{ style, value, index }">
          <div :style="style" class="w-px h-5 bg-gray-400 z-10" />
        </SliderTicks>

        <SliderTrack v-slot="{ value, style, index, start, end, isFirst, isLast }">
          <div :style="style" :class="{
            'rounded-l-full bg-blue-500 z-10': isFirst,
            'rounded-r-full bg-gray-200': isLast,
          }" class="h-5" />
        </SliderTrack>

        <SliderThumb v-model="value" class="z-20">
          <div class="w-7 h-7 rounded-full bg-white -mt-1 shadow-lg border border-gray-300" />
        </SliderThumb>
      </SliderRail>

      <SliderLabels :at="[0, 25, 50, 75, 100]" v-slot="{ style, value, index, interpolatedValue }">
        <div :style="style">{{ value }}</div>
      </SliderLabels>
  </Slider>`,
})

export const SimpleSlider = SimpleSliderTemplate.bind({})
SimpleSlider.args = {}
