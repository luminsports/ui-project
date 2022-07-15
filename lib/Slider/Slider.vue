<script lang='ts' setup>
  import { provide, reactive, ref, isRef, Ref } from 'vue'
  import {
    ThumbMap,
    SliderContext,
    SliderSymbol
  } from './utils'

  const props = defineProps({
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  })

  const thumbs = reactive<ThumbMap>({})

  provide<SliderContext>(SliderSymbol, {
    step: props.step,
    min: props.min,
    max: props.max,
    thumbs,
    registerThumb: (thumb, value) => {
      thumbs[thumb as number] = isRef(value) ? value as Ref<number> : ref(value as number)

      return () => {
        delete thumbs[thumb]
      }
    }
  })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
