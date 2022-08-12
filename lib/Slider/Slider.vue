<script lang="ts" setup>
  import { onMounted, onUnmounted, provide, ref, Ref, triggerRef, watch } from 'vue'
  import { SliderContext, SliderSymbol, Thumb } from './utils'

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
    registerThumb: (uid: number, value: Ref<number>) => {
      onMounted(() => {
        thumbs.value = [
          ...thumbs.value,
          {
            uid,
            modelValue: value.value,
          },
        ]

        watch(value, (newValue) => {
          thumbs.value = thumbs.value.map(t => t.uid === uid ? t : { uid, modelValue: newValue })
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
