<script lang="ts" setup>
  import { provide, reactive } from 'vue'

  const props = defineProps({
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  })

  const thumbs = reactive({})

  provide('step', props.step)
  provide('min', props.min)
  provide('max', props.max)
  provide('thumbs', thumbs)
  provide('registerThumb', (thumb, value) => {
    thumbs[thumb] = value

    return () => {
      delete thumbs[thumb]
    }
  })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
