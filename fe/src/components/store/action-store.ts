import { create } from 'zustand'

export type DispatchAction = (status?: boolean) => void

interface Action {
  action?: {
    status?: boolean
  }
  dispatchAction: DispatchAction
}

export const useActionStore = create<Action>((set) => {
  return {
    dispatchAction: (status?: boolean) => {
      set({ action: { status } })
    }
  }
})
