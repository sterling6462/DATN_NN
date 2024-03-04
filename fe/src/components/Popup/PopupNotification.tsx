import { DialogProps, IconButton } from '@mui/material'
import clsx from 'clsx'
import {
  CreateImage,
  PopupBase,
  PopupBaseProps,
  useListViewStore,
  useNotificationStore
} from 'components'
import { default as queryString } from 'query-string'
import { ReactNode, useState } from 'react'
import styles from './style.module.scss'

export type PopupNotificationProps = Partial<DialogProps> &
  Partial<PopupBaseProps> & {
    icon?: ReactNode
    entity?: { username?: string; password?: string; role?: string }
  }

export function PopupNotification(props: PopupNotificationProps) {
  const {
    popupClasses,
    icon,
    baseURLPopup = '',
    baseURLReload,
    id = '',
    entity,
    children,
    managerRole,
    ...rest
  } = props
  const onQuery = useListViewStore((store) => store.onQuery)
  const { dispatchNotification } = useNotificationStore()
  const { page = 1, size = 10 } = queryString.parse(window.location.search)

  const [open, setOpen] = useState(false)

  return (
    <>
      {icon && (
        <IconButton
          onClick={() => setOpen(true)}
          className={popupClasses?.icon}
        >
          {icon}
        </IconButton>
      )}
      <div onClick={() => setOpen(true)}>{children}</div>
      <PopupBase
        {...rest}
        className={clsx(styles.DialogRoot, popupClasses?.popup)}
        title="Notification"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateImage {...entity} />
      </PopupBase>
    </>
  )
}
