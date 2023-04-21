// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.

<script lang="ts">
import { defineComponent, onMounted, ref, inject, h, Fragment } from 'vue';
import { type SnackInstance, SnackbarScope } from './snackbarScope';

export default defineComponent({
    name: 'Snackbar',
    // TODO:
    // emit events
    inherritAttrs: false,
    props: {
        duration: {
            type: Number,
            default: 5000
        },
        singleton: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots, expose, attrs }) {
        const scope: SnackbarScope | null = inject('snackbar',  new SnackbarScope)

        const groupId = ref()

        onMounted(() => {
            groupId.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        })

        const hide = () => scope.removeAll(groupId.value)

        const show = (newContent?: string) => {
            // TODO: consider moving this into scope, testing
            if (props.singleton && scope.snackbars.value.length > 0) {
                const snackInstance = scope.snackbars.value[0]

                clearTimeout(snackInstance.timer)
                snackInstance.timer = setTimeout(() => {
                    scope.remove(snackInstance)
                }, props.duration)

                return snackInstance
            }

            const snackInstance: SnackInstance = {
                groupId: groupId.value,
                content: newContent,
                attrs: attrs,
                slot: slots.default,
                timer: setTimeout(() => {
                    scope.remove(snackInstance)
                }, props.duration)
            }

            snackInstance.hide = () => {
                scope.remove(snackInstance)

                clearTimeout(snackInstance.timer)
            }
        

            return scope.add(snackInstance)
        }

        expose({ show, hide })

        if (scope.shared) {
            return () => null
        }

        return () => {
            return h(Fragment, scope.snackbars.value.map(snackbar => {
                return h('div', snackbar.slot ? snackbar.attrs : {
                    ...snackbar.attrs,
                    textContent: snackbar.content
                }, snackbar.slot ? snackbar.slot?.({ content: snackbar.content }) : undefined)
            }))
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