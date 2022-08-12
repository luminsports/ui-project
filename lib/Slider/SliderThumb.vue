<script lang="ts" setup>
  import { computed, getCurrentInstance, onMounted, onUnmounted, ref, Ref } from 'vue'
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
  const isHovered: Ref<Boolean> = ref(false)
  const thumbOffset = computed(() => element.value?.offsetWidth / 2)
  const sliderWidth = computed(() => slider.value?.offsetWidth - thumbOffset.value)
  const leftX = computed(() => slider.value?.offsetLeft + thumbOffset.value)
  const rightX = computed(() => slider.value?.offsetLeft + sliderWidth.value - thumbOffset.value)

  const onMouseDown = () => {
    isDragging.value = true
  }

  const onMouseOver = () => {
    isHovered.value = true
  }

  const onMouseOut = () => {
    isHovered.value = false
  }

  const onMouseMove = (ev: PointerEvent) => {
    if (isDragging.value) {

      const value = linearInterpolation(
        ev.x,
        leftX.value,
        rightX.value,
        min,
        max,
        true,
      )

      emit('update:modelValue', value)
    }
  }

  const onMouseUp = () => {
    isDragging.value = false
  }

  onMounted(() => {
    element.value?.addEventListener('pointerdown', onMouseDown)
    element.value?.addEventListener('pointerover', onMouseOver)
    element.value?.addEventListener('pointerleave', onMouseOut)
    document.addEventListener('pointermove', onMouseMove)
    document.addEventListener('pointerup', onMouseUp)
  })

  onUnmounted(() => {
    element.value?.removeEventListener('pointerdown', onMouseDown)
    element.value?.removeEventListener('pointerover', onMouseOver)
    element.value?.removeEventListener('pointerleave', onMouseOut)
    document.removeEventListener('pointermove', onMouseMove)
    document.removeEventListener('pointerup', onMouseUp)
  })

  const style = computed(() => {
    const interpolatedValue = linearInterpolation(props.modelValue, min, max, thumbOffset.value, sliderWidth.value)

    return { position: 'absolute', top: 0, transform: `translateX(${interpolatedValue}px) translateX(-50%)` }
  })
</script>

<template>
  <div ref="element" :style="style">
    <slot :hovered="isHovered" :pressed="isDragging" :value="props.modelValue" />
  </div>
</template>
