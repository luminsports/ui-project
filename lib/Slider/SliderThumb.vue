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

  const emit = defineEmits(['update:modelValue'])

  const { slider, min, max, registerThumb } = useSlider('SliderThumb')

  registerThumb(getCurrentInstance().uid, ref(props.modelValue))

  const element: Ref<HTMLElement> = ref(null)
  const isDragging: Ref<Boolean> = ref(false)

  const onMouseDown = () => {
    isDragging.value = true
  }

  const onMouseMove = (ev: PointerEvent) => {
    if (isDragging.value) {
      const thumbOffset = element.value.offsetWidth / 2

      const value = linearInterpolation(
        ev.x - thumbOffset,
        slider.value.offsetLeft + thumbOffset,
        slider.value.offsetWidth + slider.value.offsetLeft - thumbOffset,
        min,
        max,
        true
      )
      emit('update:modelValue', value)
    }
  }

  const onMouseUp = () => {
    isDragging.value = false
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
  <div ref="element" :style="style">
    <slot :hovered="hovered" :pressed="pressed" :value="props.modelValue" />
  </div>
</template>
