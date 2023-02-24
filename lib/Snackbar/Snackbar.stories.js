import { ref } from 'vue'
import SnackbarComponent from './Snackbar.vue'

export default {
  title: 'Example/Snackbar',
  component: SnackbarComponent,
  argTypes: {},
}

const Template = args => ({
  components: {
    SnackbarComponent,
  },
  setup() {
    const snackBarRef = ref(null)

    const showSnack = () => snackBarRef.value.show('Using arg')

    return { snackBarRef, showSnack }
  },

  template: `
    <div>
        <button @click="showSnack">Click me</button>
        <SnackbarComponent ref="snackBarRef"/>
    </div>
  `,
})

export const Snackbar = Template.bind({})
Snackbar.args = {}
