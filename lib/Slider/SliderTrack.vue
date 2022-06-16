<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref()
  const pos = ref()
  const index = ref()
  const start = ref()
  const end = ref()
</script>

<template>
  <div>
    <slot v-bind="{ value, pos, index, start, end }" />
  </div>
</template>
