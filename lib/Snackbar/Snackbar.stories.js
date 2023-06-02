import { ref } from 'vue'
import SnackbarProvider from './SnackbarProvider.vue'
import SnackbarComponent from './Snackbar.vue'

export default {
  title: 'Example/Snackbar',
  component: SnackbarComponent,
  argTypes: {},
}

const SnackbarTemplate = args => ({
  components: {
    SnackbarProvider,
    SnackbarComponent,
  },
  setup() {
    const snackBarRef = ref(null)

    const showSnack = () => snackBarRef.value.show(args.snackbarContent)

    return { args, snackBarRef, showSnack }
  },
  template: `
    <div>
        <SnackbarProvider v-if="args.usingProvider">
          <button @click="showSnack">Click me</button>
          <SnackbarComponent v-if="args.snackbarContent" ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="args.duration" :singleton="args.singleton" />
          <SnackbarComponent v-else ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="args.duration" :singleton="args.singleton">Yay</SnackbarComponent>
        </SnackbarProvider>
        <template v-else>
          <button @click="showSnack">Click me</button>
          <SnackbarComponent v-if="args.snackbarContent" ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="args.duration" :singleton="args.singleton" />
          <SnackbarComponent v-else ref="snackBarRef" class="bg-green-500 rounded shadow-lg" :duration="args.duration" :singleton="args.singleton">Yay</SnackbarComponent>
        </template>
      </div>
  `,
})

export const Snackbar = SnackbarTemplate.bind({})
Snackbar.args = {
  singleton: false,
  usingProvider: false,
  duration: 3000,
  snackbarContent: undefined,
}