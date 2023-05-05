<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, type Ref } from 'vue'
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

const { min, max, registerThumb, sliderOffset, sliderWidth } = useSlider('SliderThumb')

const sliderValue = computed(() => props.modelValue)

const element: Ref<HTMLElement | null> = ref(null)
const isDragging: Ref<Boolean> = ref(false)
const isHovered: Ref<Boolean> = ref(false)
const thumbOffset = computed(() => element.value?.offsetWidth / 2 || 0)
const innerSliderWidth = computed(() => sliderWidth.value - thumbOffset.value)
const leftX = computed(() => sliderOffset.value + thumbOffset.value)
const rightX = computed(() => sliderOffset.value + innerSliderWidth.value - thumbOffset.value)

registerThumb(getCurrentInstance().uid, sliderValue, element)

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
    const value = linearInterpolation(ev.x, leftX.value, rightX.value, min, max, true)

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
  const interpolatedValue = linearInterpolation(
    props.modelValue,
    min,
    max,
    thumbOffset.value,
    innerSliderWidth.value
  )

  return {
    position: 'absolute',
    top: 0,
    transform: `translateX(${interpolatedValue}px) translateX(-50%)`,
  }
})
</script>

<template>
  <div ref="element" :style="style">
    <slot :hovered="isHovered" :pressed="isDragging" :value="props.modelValue" />
  </div>
</template>
