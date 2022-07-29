<script lang="ts" setup>
  import { ref, getCurrentInstance, onMounted, onUnmounted, computed, Ref } from 'vue'
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

  registerThumb(getCurrentInstance().uid, ref(props.modelValue))

  const element: Ref<Element> = ref(null)

  const onMouseDown = () => {

  }

  const onMouseMove = () => {

  }

  const onMouseUp = () => {

  }

  onMounted(() => {
    element.value?.addEventListener('pointerdown', onMouseDown)
    document.addEventListener('pointermove', onMouseMove)
    document.addEventListener('pointerup', onMouseUp)
  })

  onUnmounted(() => {
    element.value?.removeEventListener('pointerdown', onMouseDown)
    document.removeEventListener('pointermove', onMouseMove)
    document.removeEventListener('pointerup', onMouseUp)
  })

  const hovered = ref(false)
  const pressed = ref(false)
  const style = computed(() => {
    const interpolatedValue = linearInterpolation(props.modelValue, min, max, 0, 100)

    return { position: 'absolute', top: 0, left: `${interpolatedValue}%` }
  })
</script>

<template>
  <slot ref='element' :hovered='hovered' :pressed='pressed' :style='style' :value='props.modelValue' />
</template>
