// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.

<script lang="ts">
import { defineComponent, onMounted, ref, inject, h, Fragment } from 'vue';
import { type SnackInstance, SnackbarRegistry } from './snackbarRegistry';

export default defineComponent({
    name: 'Snackbar',
    // TODO:
    // timeout prop
    // singleton prop
    // emit events
    setup(props, { slots, expose, attrs }) {
        const provider: SnackbarRegistry | null = inject('snackbar') ?? new SnackbarRegistry

        const groupId = ref()

        onMounted(() => {
            groupId.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        })

        const hide = () => provider.removeAll(groupId.value)

        const show = (newContent?: string) => {
            const snackInstance: SnackInstance = {
                groupId: groupId.value,
                content: newContent,
                attrs: attrs,
                slot: slots.default,
            }

            snackInstance.hide = () => {
                provider.remove(snackInstance)
            }

            return provider.add(snackInstance)
        }

        expose({ show, hide })

        if (provider.shared) {
            return () => null
        }

        return () => {
            // TODO: 
            // do rendering for non-shared provider
            return h(Fragment, {
                children: provider.snackbars.value.map(snackbar => {
                    return h('div', {
                        ...snackbar.attrs,
                        child: h('div', {
                            textContent: snackbar.slot ? undefined : snackbar.content
                        }, snackbar.slot?.({ content: snackbar.content }))
                    });
                })
            })
        }
    }
})
</script>

<!-- <template>
<form>
    <snackbar-provider>
        <snackbar ref="failedRef">Failed</snackbar>
        <snackbar ref="successRef">Success!</snackbar>

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