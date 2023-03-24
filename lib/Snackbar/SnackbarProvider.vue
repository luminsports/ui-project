// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.

<template>
    <slot></slot>
    
    <template v-for="snackbar in visibleSnackbars">
        <div v-bind="snackbar.attrs">
            {{ snackbar.slot ? snackbar.slot({ content: snackbar.content }) : snackbar.content }}
        </div>
    </template>
</template>



<script lang="ts">
import { defineComponent, provide, computed, type ComputedRef } from 'vue';
import { SnackbarRegistry, type SnackbarInstance } from './snackbarRegistry'

export default defineComponent({
    name: 'SnackbarProvider',
    setup(props) {
        const registry = new SnackbarRegistry(true)
        provide('snackbar', registry)
        
        const visibleSnackbars: ComputedRef<SnackbarInstance[]> = computed(() => {
            return registry.snackbars.value
        })

        return {
            visibleSnackbars,
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