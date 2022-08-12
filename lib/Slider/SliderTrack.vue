<script lang="ts" setup>
  import { computed } from 'vue'
  import { linearInterpolation, Thumb, useSlider } from './utils'

  const { min, max, thumbs } = useSlider('SliderTrack')

  const tracks = computed<Array<{start: number, end: number, index: number, style: Record<string, string|number>}>>(() => {
    const sortedThumbs = thumbs.value.sort((a, z) => a.modelValue - z.modelValue)

    const tracks = sortedThumbs.map((thumb: Thumb, index: number) => {
      const start = linearInterpolation(sortedThumbs?.[index - 1]?.modelValue ?? min, min, max, 0, 100)
      const end = linearInterpolation(thumb.modelValue, min, max, 0, 100)

      return {
        start,
        end,
        index,
        style: { position: 'absolute', top: 0, left: `${start}%`, width: `${end - start}%` },
      }
    })

    const lastTrack = tracks[tracks.length - 1]
    const finalStartPoint = lastTrack?.end ?? 0

    tracks.push({
      start: finalStartPoint,
      end: 100,
      index: lastTrack ? lastTrack.index + 1 : 0,
      style: { position: 'absolute', top: 0, left: `${finalStartPoint}%`, width: `${100 - finalStartPoint}%` },
    })

    return tracks
  })
</script>

<template>
  <slot v-for="{ start, end, index, style } in tracks"
        v-bind="{ start, end, index, style, isFirst: index === 0, isLast: index === tracks.length - 1 }" />
</template>
