<script lang="ts" setup>
  const props = defineProps({
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
