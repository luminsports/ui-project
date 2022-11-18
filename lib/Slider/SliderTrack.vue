<script lang="ts" setup>
  import { computed } from 'vue'
  import { linearInterpolation, Thumb, useSlider } from './utils'

  const { min, max, thumbs, sliderWidth } = useSlider('SliderTrack')

  const tracks = computed<
    Array<{ start: number; end: number; index: number; style: Record<string, string | number> }>
  >(() => {
    const sortedThumbs = thumbs.value.sort((a, z) => a.modelValue - z.modelValue)

    const tracks = sortedThumbs.map((thumb: Thumb, index: number) => {
      const thumbOffset = computed(() => thumb.element.offsetWidth / 2)
      const innerSliderWidth = computed(() => sliderWidth.value - thumbOffset.value)

      const start = linearInterpolation(
        sortedThumbs?.[index - 1]?.modelValue ?? min,
        min,
        max,
        index === 0 ? 0 : thumbOffset.value,
        innerSliderWidth.value
      )

      const end = linearInterpolation(
        thumb.modelValue,
        min,
        max,
        thumbOffset.value,
        innerSliderWidth.value
      )

      return {
        start,
        end,
        index,
        style: {
          position: 'absolute',
          top: 0,
          transform: `translateX(${start}px)`,
          width: `${end - start}px`,
        },
      }
    })

    const lastTrack = tracks.length ? tracks[tracks.length - 1] : null
    const finalStartPoint = lastTrack?.end ?? 0

    tracks.push({
      start: finalStartPoint,
      end: 100,
      index: lastTrack ? lastTrack.index + 1 : 0,
      style: {
        position: 'absolute',
        top: 0,
        transform: `translateX(${finalStartPoint}px)`,
        width: `${sliderWidth.value - finalStartPoint}px`,
      },
    })

    return tracks
  })
</script>

<template>
  <slot
    v-for="{ start, end, index, style } in tracks"
    v-bind="{
      start,
      end,
      index,
      style,
      isFirst: index === 0,
      isLast: index === tracks.length - 1,
    }" />
</template>
