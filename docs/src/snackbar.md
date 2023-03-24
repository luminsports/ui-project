# Snackbar

[[toc]]

## Installation

Via NPM

```sh
npm install --save ...
```

or via Yarn

```sh
yarn add ...
```

## Basic Usage

```vue
<template>
  <button @click="snackbarRef.show">Click here!</button>
  <Snackbar ref="snackbarRef" class="bg-green-500 rounded shadow-lg">Success! 🚀</Snackbar>
</template>

<script>
  export default {
    name: 'MyComponent',
    setup() {
      const snackbarRef = ref(null)

      return { snackbarRef }
    },
  }
</script>
```

## Using the Snackbar Provider

## Styling the Snackbar

## Slots

## Component API

### Snackbar

// quick snackbar description
// table of props, slots etc.

// styling:
// color
// holdTime
// position

// handlers:
// show
// hide

### SnackbarProvider

// quick SnackbarProvider description
// table of props, slots etc.

## Accessibility notes
