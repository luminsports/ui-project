<script lang="ts" setup>
  import { ref, inject } from 'vue'

  const thumbs = inject('thumbs')
  console.dir(thumbs)

  const value = ref()
  const pos = ref()
  const index = ref()
  const start = ref()
  const end = ref()
</script>

<template>
  <slot v-bind="{ value, pos, index, start, end }" />
</template>
