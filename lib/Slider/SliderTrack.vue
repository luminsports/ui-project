<script lang="ts" setup>
  import { ref, inject } from 'vue'
  import { useSlider } from './utils'

  const { min, max, registerThumb } = useSlider('SliderTrack')

  const value = ref()
  const pos = ref()
  const index = ref()
  const start = ref()
  const end = ref()
</script>

<template>
  <slot v-bind="{ value, pos, index, start, end }" />
</template>
