import { AlertColor } from '@mui/material'
import { create } from 'zustand'

export type DispatchNotification = (
  type?: AlertColor,
  label?: React.ReactNode,
  description?: string
) => void

interface Notification {
  notification?: {
    type?: AlertColor
    label?: React.ReactNode
    key?: string
  }
  dispatchNotification: DispatchNotification
}

export const useNotificationStore = create<Notification>((set) => {
  return {
    dispatchNotification: (
      type?: AlertColor,
      label?: React.ReactNode,
      description?: string
    ) => {
      set({
        notification: { type, label, key: new Date().toString() }
      })
    }
  }
})
