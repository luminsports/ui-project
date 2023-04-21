/**
 * Copyright (c) 2023 Lumin Sports Technology - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ref, type Slot, type Ref } from 'vue'

export interface SnackInstance {
  groupId: string
  content: string
  slot: Slot
  attrs: Record<string, unknown>
  hide?: () => void
  timer: NodeJS.Timeout
}

export class SnackbarScope {
  shared: boolean
  snackbars: Ref<SnackInstance[]> = ref([])

  constructor(shared: boolean = false) {
    this.shared = shared
  }

  add(snackbar: SnackInstance): SnackInstance {
    this.snackbars.value.push(snackbar)

    return snackbar
  }

  remove(snackbar: SnackInstance): void {
    const index = this.snackbars.value.indexOf(snackbar)
    if (index > -1) {
      this.snackbars.value.splice(index, 1)
    }
  }

  removeAll(groupId: string): void {
    this.snackbars.value = this.snackbars.value.filter(snackbar => snackbar.groupId !== groupId)
  }
}
