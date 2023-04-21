// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.
<script lang="ts">
import { defineComponent, provide, computed, type ComputedRef, h, Fragment } from 'vue';
import { SnackbarScope, type SnackInstance } from './snackbarScope'

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