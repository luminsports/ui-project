<template>
  <button type="button" @click="onClick" :style="style">I am a {{ size }} {{ primary ? 'primary' : 'secondary' }} button lol ({{ label }})</button>
</template>

<script lang="ts">
  import { reactive, computed } from 'vue'

  export default {
    name: 'my-button',

    props: {
      label: {
        type: String,
        required: true,
      },
      primary: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        validator: function (value) {
          return ['small', 'medium', 'large'].indexOf(value) !== -1
        },
      },
      backgroundColor: {
        type: String,
      },
    },

    emits: ['click'],

    setup(props, { emit }) {
      props = reactive(props)
      return {
        style: computed(() => ({
          backgroundColor: props.backgroundColor,
        })),
        onClick() {
          emit('click')
        },
      }
    },
  }
</script>
