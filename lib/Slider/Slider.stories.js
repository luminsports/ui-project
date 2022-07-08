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
    const T1 = ref()
    const T2 = ref()
    const T3 = ref()

    return { args, T1, T2, T3 }
  },
  template: `
    <Slider class="position-fixed" :step="5" :min="0" :max="220">
      <SliderRail class="bg-gray-500" >
        <SliderThumb v-model="T1" :prevent-overlap="10" />
        <SliderThumb v-model="T2" :disabled="false" v-slot='{ value, index, disabled, hovered, pressed }' />
        <SliderThumb v-model="T3" />
  
        <SliderTrack v-slot='{ value, pos, index, start, end }'>
          <div :style='{ left: T1 < 50 ? pos : pos }'  :class="index === 0 && T1 < 100 ? 'bg-red-300' : ''" />
        </SliderTrack>
  
        <SliderTicks :at='[0, 25, 50, 75, 100]' v-slot='{ pos, value, index }'>
          <div :style='pos' class='h-5 w-1 bg-gray-200/40' />
        </SliderTicks>
      </SliderRail>

      <SliderLabels :at='[0, 25, 50, 75, 100]' v-slot='{ pos, value, index, interpolatedValue }'>
        <div :style='pos' class='h-5 w-1 bg-gray-200/40'>{{ interpolatedValue }}%</div>
      </SliderLabels>
    </Slider>`,
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Shut up ryan',
}
