<script lang="ts" setup>
  import { ref, getCurrentInstance, onMounted, onUnmounted, computed } from 'vue'
  import { linearInterpolation, useSlider } from './utils'

  const props = defineProps({
    preventOverlap: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  })

  const { min, max, registerThumb } = useSlider('SliderThumb')

  let unregistered = null

  const hovered = ref(false)
  const pressed = ref(false)
  const style = computed(() => {
    const interpolatedValue = linearInterpolation(props.modelValue, min, max, 0, 100)

    return { position: 'absolute', top: 0, left: `${interpolatedValue}%`}
  })

  onMounted(() => {
    unregistered = registerThumb(getCurrentInstance().uid, props.modelValue)
  })

  onUnmounted(() => {
    if (unregistered) {
      unregistered()
    }
  })
</script>

<template>
  <slot :hovered="hovered" :pressed="pressed" :style="style" :value="props.modelValue" />
</template>
