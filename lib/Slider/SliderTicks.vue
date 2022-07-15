<script lang="ts" setup>
  import { computed } from 'vue'
  import { linearInterpolation, useSlider } from './utils'

  const { min, max } = useSlider('SliderTicks')

  const props = defineProps({
    at: {
      type: Array,
      default: () => [],
    },
  })

  const ticks = computed(() => {
    return props.at.map((value: number, index: number) => {
      const interpolatedValue = linearInterpolation(value, min, max, 0, 100)
      return {
        value,
        index,
        interpolatedValue,
        style: { position: 'absolute', top: 0, left: `${interpolatedValue}%`}
      }
    })
  })
</script>

<template>
  <slot v-for="{ value, index, style, interpolatedValue } in ticks" v-bind="{ value, index, style, interpolatedValue }" />
</template>
