// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.

<template>
    <div :style=" isVisible ? '' : 'display: none'">
        <slot>{{ content  }}</slot>
    </div>

    
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Snackbar',
    setup(props) {

        const isVisible = ref(false)
        const content = ref('')

        const hide = () => {
            isVisible.value = false
        }

        const show = (newContent: string) => {
            content.value = newContent
            isVisible.value = true
        }


        return {
            hide,
            show,
            isVisible,
            content,
        }
    }
})
</script>


<!-- <template>
<form>
    <snackbar-provider>
        <snackbar
            ref="snackRef"
            :duration="0"
            position="top-left"
            :dismissable=""
            singleton
            @show=""
            @shown=""
            @hide=""
            @hidden="">
                Submitted successfully
            </snackbar>
    </snackbar-provider>
</form>
</template>

<script>
const snackRef = ref()

const snackInstance = snackRef.value?.show('test')
snackInstance.hide()

snackRef.value?.hide()

return { snackRef }
</script> -->


<!-- <page>
    <form>
        <snackbar>
     </form>
     <widget>
        <snackbar>
     </widget>
</page> -->