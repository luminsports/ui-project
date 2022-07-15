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

const Template = args => ({
  components: {
    Slider,
    SliderRail,
    SliderThumb,
    SliderTrack,
    SliderTicks,
    SliderLabels,
  },
  setup() {
    const T1 = ref(1)
    const T2 = ref(2)
    const T3 = ref(3)

    return { args, T1, T2, T3 }
  },
  template: `
    <Slider class="w-100" :step="5" :min="0" :max="220">
      <SliderRail class="relative bg-gray-500" >
        <SliderTrack v-slot='{ value, style, index, start, end, isFirst, isLast }'>
          <div :style="style" class="bg-gray-200 h-2" :class="{ 'rounded-l-full': isFirst, 'rounded-r-full': isLast }" />
        </SliderTrack>

        <SliderThumb v-model="T1" :prevent-overlap="10" v-slot='{ style, value }'>
          <div :style='style' class='w-2 h-2 rounded-full bg-blue-500' />
        </SliderThumb>
        <SliderThumb v-model="T2" :disabled="false" v-slot='{ value, index, disabled, hovered, pressed, style }'>
          <div :style='style' class='w-2 h-2 rounded-full bg-red-500' />
        </SliderThumb>
        <SliderThumb v-model="T3" v-slot='{ style, value }'>
          <div :style='style' class='w-2 h-2 rounded-full bg-green-500' />
        </SliderThumb>

        <SliderTicks :at='[0, 25, 50, 75, 100]' v-slot='{ style, value, index }'>
          <div :style='style' class='w-px h-2 bg-black' />
        </SliderTicks>
      </SliderRail>

      <SliderLabels :at='[0, 25, 30, 75, 100]' v-slot='{ style, value, index, interpolatedValue }'>
        <div :style='style'>{{ value }}</div>
      </SliderLabels>
    </Slider>`,
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Shut up ryan',
}
