<script lang="ts" setup>
  import { ref } from 'vue'

  const props = defineProps({
    preventOverlap: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  })

  const hovered = ref(false)
  const pressed = ref(false)
</script>

<template>
  <div>
    <slot :hovered="hovered" :pressed="pressed" />
  </div>
</template>
