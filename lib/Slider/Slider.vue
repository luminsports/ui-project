<script lang="ts" setup>
import { onMounted, onUnmounted, provide, ref, type Ref, watch } from 'vue'
import { type SliderContext, SliderSymbol, type Thumb } from './utils'

const props = defineProps({
  step: { type: Number, default: 1 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
})

const element: Ref<HTMLElement> = ref(null)

const thumbs = ref<Thumb[]>([])

const sliderWidth = ref<number>(0)
const sliderOffset = ref<number>(0)

const resizeObserver = new ResizeObserver(_ => {
  if (element.value) {
    sliderWidth.value = element.value.offsetWidth
    sliderOffset.value = element.value.offsetLeft
  }
})

onMounted(() => {
  resizeObserver.observe(element.value)
})

provide<SliderContext>(SliderSymbol, {
  step: props.step,
  min: props.min,
  max: props.max,
  slider: element,
  sliderWidth,
  sliderOffset,
  thumbs,
  registerThumb: (uid: number, value: Ref<number>, element: Ref<HTMLElement>) => {
    onMounted(() => {
      thumbs.value = [
        ...thumbs.value,
        {
          uid,
          element,
          modelValue: value.value,
        },
      ]

      watch(value, (newValue) => {
        thumbs.value = thumbs.value.map(t => t.uid === uid ? { uid, element, modelValue: newValue } : { ...t })
      })
    })

    onUnmounted(() => {
      return () => {
        thumbs.value = thumbs.value.filter(t => t.uid !== uid)
      }
    })
  },
})
</script>

<template>
  <div ref="element">
    <slot />
  </div>
</template>
