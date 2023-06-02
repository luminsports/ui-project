import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { Ref, defineComponent, ref } from 'vue'
import { Snackbar } from './'

const SnackbarWrapper = defineComponent({
  name: 'SnackbarWrapper',
  components: { Snackbar },
  setup(props, { expose }) {
    const snackbarRef: Ref = ref(null)

    const showSnack = () => snackbarRef.value.show('Test')

    expose({ showSnack })

    return { showSnack, snackbarRef }
  },
  template: `
    <div>
        <Snackbar ref="snackbarRef" />
    </div>
  `,
})

// TODO: introduce happy-dom for ui tests
describe('Snackbar:', () => {
  it('can show a snackbar with example text', () => {
    const wrapper = mount(SnackbarWrapper, {})

    console.log(wrapper)

    expect(wrapper.showSnack())
  })
})
