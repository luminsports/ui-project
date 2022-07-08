<script lang="ts" setup>
  import { ref, inject, getCurrentInstance, onMounted, onUnmounted, computed } from 'vue'
  import { linearInterpolation } from './utils'

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


  const registerThumb = inject('registerThumb')
  const min = inject<number>('min')
  const max = inject<number>('max')

  let unregistered = null

  const hovered = ref(false)
  const pressed = ref(false)
  const position = computed(() => {
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
  <slot :hovered="hovered" :pressed="pressed" :pos="position" />
</template>
