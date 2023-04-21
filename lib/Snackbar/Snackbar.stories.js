import { ref, onMounted } from 'vue'
import SnackbarProvider from './SnackbarProvider.vue'
import SnackbarComponent from './Snackbar.vue'

export default {
  title: 'Example/Snackbar',
  component: SnackbarComponent,
  argTypes: {},
}

const WithoutProviderTemplate = args => ({
  components: {
    SnackbarComponent,
  },
  setup() {
    const snackBarRef = ref(null)

    const showSnack = () => snackBarRef.value.show()

    return { snackBarRef, showSnack, ...args }
  },
  template: `
    <div>
      <button @click="showSnack">Click Here</button>
      <SnackbarComponent ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="duration" :singleton="singleton">Success! 🚀</SnackbarComponent>
    </div>
  `,
})

const WithProviderTemplate = args => ({
  components: {
    SnackbarProvider,
    SnackbarComponent,
  },
  setup() {
    const snackBarRef = ref(null)

    const showSnack = () => snackBarRef.value.show('Using arg')

    return { snackBarRef, showSnack, ...args }
  },

  template: `
    <div>
        <SnackbarProvider>
          <button @click="showSnack">Click me</button>
          <SnackbarComponent ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="duration" :singleton="singleton">Success! 🚀</SnackbarComponent>
        </SnackbarProvider>
    </div>
  `,
})

export const SimpleSnackbar = WithoutProviderTemplate.bind({})
SimpleSnackbar.args = {
  singleton: true,
  duration: 3000,
}

export const Snackbar = WithProviderTemplate.bind({})
Snackbar.args = {
  singleton: false,
  duration: 3000,
}
