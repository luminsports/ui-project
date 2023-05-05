// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.
<script lang="ts">
import { defineComponent, provide, h, Fragment } from 'vue';
import { SnackbarScope } from './snackbarScope'

export default defineComponent({
    name: 'SnackbarProvider',
    setup(props, { slots }) {
        const scope = new SnackbarScope(true)
        provide('snackbar', scope)

        return () => {
            return h(Fragment, [
                slots.default(), 
                ...scope.snackbars.value.map(snackbar => { 
                    return h('div', snackbar.slot ? snackbar.attrs : {
                        ...snackbar.attrs,
                        textContent: snackbar.content
                    }, snackbar.slot ? snackbar.slot?.({ content: snackbar.content }) : undefined)
                })
            ])
        }
    }
})
</script>