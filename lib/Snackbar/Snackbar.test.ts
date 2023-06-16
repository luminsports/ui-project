import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { Ref, defineComponent, ref, nextTick } from 'vue'
import { Snackbar, SnackbarProvider } from './'

const SnackbarWrapper = defineComponent({
  name: 'SnackbarWrapper',
  components: { Snackbar, SnackbarProvider },
  props: {
    singleton: Boolean,
    useProvider: Boolean,
  },
  setup(props, { expose }) {
    const snackbarRef: Ref = ref(null)

    const showSnack = (text?: string) => snackbarRef.value.show(text)

    expose({ showSnack })

    return { showSnack, snackbarRef }
  },
  template: `
    <component :is="useProvider ? 'snackbar-provider' : 'div'">
        <Snackbar ref="snackbarRef" :singleton="singleton"></Snackbar>
    </component>
  `,
})
const SnackbarWrapperWithSlot = defineComponent({
  name: 'SnackbarWrapperWithSlot',
  components: { Snackbar, SnackbarProvider },
  props: {
    singleton: Boolean,
    useProvider: Boolean,
  },
  setup(props, { expose }) {
    const snackbarRef: Ref = ref(null)

    const showSnack = (text?: string) => snackbarRef.value.show(text)

    expose({ showSnack })

    return { showSnack, snackbarRef }
  },
  template: `
    <component :is="useProvider ? 'snackbar-provider' : 'div'">
      <Snackbar ref="snackbarRef" :singleton="singleton">
        <slot />
      </Snackbar>
    </component>
  `,
})

// ✅ Test simple snackbar
// ✅ Test simple singleton snackbar
// ✅ Test snackbar slots
// Test snackbar timeout

describe('Snackbar (Without SnackbarProvider):', () => {
  it('can show multiple snackbars with example text', async () => {
    const wrapper = mount(SnackbarWrapper, {})

    expect(wrapper.vm.showSnack).to.exist

    wrapper.vm.showSnack('Hello, world!')
    wrapper.vm.showSnack('This is great!')

    await nextTick()

    expect(wrapper.html()).toContain('Hello, world!')
    expect(wrapper.html()).toContain('This is great!')
  })

  it('can show a snackbar with a slot', async () => {
    const wrapper = mount(SnackbarWrapperWithSlot, {
      slots: {
        default: '<strong>something</strong>',
      },
    })

    wrapper.vm.showSnack()

    await nextTick()

    expect(wrapper.get('strong').text()).toContain('something')
  })

  it('can show a singleton snackbar', async () => {
    const wrapper = mount(SnackbarWrapper, {
      props: {
        singleton: true,
      },
    })

    expect(wrapper.vm.showSnack).to.exist

    wrapper.vm.showSnack('Hello, world!')
    wrapper.vm.showSnack('This is great!')

    await nextTick()

    expect(wrapper.html()).toContain('Hello, world!')
    expect(wrapper.html()).not.toContain('This is great!')
  })

  it('can be cleared after a custom duration', async () => {})
})

// Test snackbar inside scope
// Test singleton snackbar inside scope
// Test slotted snackbar inside scope
// Test snackbar timeout inside scope
describe('Snackbar (With SnackbarProvider):', () => {
  it('can show multiple snackbars with example text', async () => {
    const wrapper = mount(SnackbarWrapper, {
      props: {
        useProvider: true,
      },
    })

    expect(wrapper.vm.showSnack).to.exist

    wrapper.vm.showSnack('Hello, world!')
    wrapper.vm.showSnack('This is great!')

    await nextTick()

    expect(wrapper.html()).toContain('Hello, world!')
    expect(wrapper.html()).toContain('This is great!')
  })

  it('can show a snackbar with a slot', async () => {
    const wrapper = mount(SnackbarWrapperWithSlot, {
      props: {
        useProvider: true,
      },
      slots: {
        default: '<strong>something</strong>',
      },
    })

    wrapper.vm.showSnack()

    await nextTick()

    expect(wrapper.get('strong').text()).toContain('something')
  })

  it('can show a singleton snackbar', async () => {
    const wrapper = mount(SnackbarWrapper, {
      props: {
        useProvider: true,
        singleton: true,
      },
    })

    expect(wrapper.vm.showSnack).to.exist

    wrapper.vm.showSnack('Hello, world!')
    wrapper.vm.showSnack('This is great!')

    await nextTick()

    expect(wrapper.html()).toContain('Hello, world!')
    expect(wrapper.html()).not.toContain('This is great!')
  })

  it('can be cleared after a custom duration', async () => {})
})
