<script lang="ts" setup>
  import { computed, inject } from 'vue'
  import { linearInterpolation } from './utils'

  const min = inject<number>('min')
  const max = inject<number>('max')
  const step = inject<number>('step')

  const props = defineProps({
    at: {
      type: Array,
      default: () => [],
    },
  })

  const labels = computed(() => {
    return props.at.map((value: number, index: number) => {
      const interpolatedValue = linearInterpolation(value, min, max, 0, 100)
      return {
        value,
        index,
        interpolatedValue,
        pos: { position: 'absolute', top: 0, left: `${interpolatedValue}%`}
      }
    })
  })
</script>

<template>
  <slot v-for="{ value, index, pos, interpolatedValue } in labels" v-bind="{ value, index, pos, interpolatedValue }" />
</template>
