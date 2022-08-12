<script lang="ts" setup>
  import { onMounted, onUnmounted, provide, ref, Ref } from 'vue'
  import { SliderContext, SliderSymbol, Thumb } from './utils'

  const props = defineProps({
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  })

  const element: Ref<HTMLElement> = ref(null)

  const thumbs = ref<Thumb[]>([])

  provide<SliderContext>(SliderSymbol, {
    step: props.step,
    min: props.min,
    max: props.max,
    slider: element,
    thumbs,
    registerThumb: (uid: number, value: Ref<number>) => {
      onMounted(() => {
        thumbs.value = [
          ...thumbs.value,
          {
            uid,
            value: value.value,
          },
        ]
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
