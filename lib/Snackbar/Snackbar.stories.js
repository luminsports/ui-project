import { ref } from 'vue'
import SnackbarProvider from './SnackbarProvider.vue'
import SnackbarComponent from './Snackbar.vue'

export default {
  title: 'Example/Snackbar',
  component: SnackbarComponent,
  argTypes: {},
}

const Template = args => ({
  components: {
    SnackbarProvider,
    SnackbarComponent,
  },
  setup() {
    const snackBarRef = ref(null)

    const showSnack = () => snackBarRef.value.show('Using arg')

    return { snackBarRef, showSnack }
  },

  template: `
    <div>
        <SnackbarProvider>
          <button @click="showSnack">Click me</button>
          <SnackbarComponent ref="snackBarRef" class="bg-green-500 rounded shadow-lg">Success! 🚀</SnackbarComponent>
        </SnackbarProvider>
    </div>
  `,
})

export const Snackbar = Template.bind({})
Snackbar.args = {}
