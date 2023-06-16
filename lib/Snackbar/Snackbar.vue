// Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential.

<script lang="ts">
import { defineComponent, onMounted, ref, inject, h, Fragment } from 'vue';
import { type SnackInstance, SnackbarScope } from './snackbarScope';

type SnackbarEventContext = {
    snackbar?: SnackInstance,
}

type HidingSnackbarEventContext = SnackbarEventContext & {
    dismissed?: boolean
}

export default defineComponent({
    name: 'Snackbar',

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
    emits: {
        showing: () => true,
        shown: (context: SnackbarEventContext) => !!context,
        hiding: (context: HidingSnackbarEventContext) => !!context,
        hidden: (context: HidingSnackbarEventContext) => !!context,
    },
    setup(props, { emit, slots, expose, attrs }) {
        const scope: SnackbarScope | null = inject('snackbar', new SnackbarScope)

        const groupId = ref()

        onMounted(() => {
            groupId.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        })

        const hide = () => {
            // TODO: should we loop over each snackbar?
            emit('hiding', {})

            scope.removeAll(groupId.value)

            emit('hidden', {})
        }

        const show = (newContent?: string) => {
            emit('showing')

            // TODO: consider moving this into scope, testing
            if (props.singleton && scope.snackbars.value.length > 0) {
                const snackInstance = scope.snackbars.value[0]

                clearTimeout(snackInstance.timer)
                snackInstance.timer = setTimeout(() => {
                    scope.remove(snackInstance)
                }, props.duration)

                // todo: figure out a way to trigger re-render
                // snackInstance.content = newContent

                return snackInstance
            }

            const snackInstance: SnackInstance = {
                groupId: groupId.value,
                content: newContent,
                attrs: attrs,
                slot: slots.default,
                timer: setTimeout(() => {
                    emit('hiding', {
                        snackbar: snackInstance,
                        dismissed: false,
                    })

                    scope.remove(snackInstance)

                    emit('hidden', {
                        snackbar: snackInstance,
                        dismissed: false,
                    })
                }, props.duration)
            }

            snackInstance.hide = () => {
                emit('hiding', {
                    snackbar: snackInstance,
                    dismissed: true,
                })

                scope.remove(snackInstance)

                clearTimeout(snackInstance.timer)

                emit('hidden', {
                    snackbar: snackInstance,
                    dismissed: true,
                })
            }

            scope.add(snackInstance)
            emit('shown', {
                snackbar: snackInstance
            })
        }

        expose({ show, hide })

        if (scope.shared) {
            return () => null
        }

        return () => {
            return scope.snackbars.value.length > 0 ? h(Fragment, scope.snackbars.value.map(snackbar => {
                return h('div', snackbar.slot ? snackbar.attrs : {
                    ...snackbar.attrs,
                    textContent: snackbar.content
                }, snackbar.slot ? snackbar.slot?.({ content: snackbar.content }) : undefined)
            })) : null
        }
    }
})
</script>