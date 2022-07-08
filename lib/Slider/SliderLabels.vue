<script lang="ts" setup>
  import { computed, inject } from 'vue'

const min = inject<number>('min')
const max = inject<number>('max')
const step = inject<number>('step')

const linearInterpolation = (value: number, x1 = 0, y1 = 100, x2 = 0, y2 = 100) => {
  const outputScaleDifference = y2 - x2
  const inputScaleDifference = y1 - x1

  return (((value - x1) * outputScaleDifference / inputScaleDifference) + x2)
}

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
  <div>
    <slot v-for="{ value, index, pos, interpolatedValue } in labels" v-bind="{ value, index, pos, interpolatedValue }">
    </slot>
  </div>
</template>
