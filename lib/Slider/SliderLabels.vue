<script lang="ts" setup>
  const props = defineProps({
    at: {
      type: Array,
      default: () => [],
    },
  })
</script>

<template>
  <div>
    <slot v-for="(value, index) in at" v-bind="{ value, index }" />
  </div>
</template>
