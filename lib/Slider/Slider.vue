<script lang="ts" setup>
  import { provide } from 'vue'

  const props = defineProps({
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  })

  provide('step', props.step)
  provide('min', props.min)
  provide('max', props.max)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
