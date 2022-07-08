<script lang="ts" setup>
  import { useSlots } from 'vue'

  const slots = useSlots()

  console.log(slots.default())
</script>

<template>
  <div style='position: relative'>
    <slot />
  </div>
</template>
