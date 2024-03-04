import { DialogProps, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Entity,
  HttpMethod,
  PopupBase,
  PopupBaseProps,
  invokeRequest,
  useListViewStore,
  useNotificationStore
} from 'components'
import { default as queryString } from 'query-string'
import { ReactNode, useState } from 'react'
import styles from './style.module.scss'

export type PopupAlertProps = Partial<DialogProps> &
  Partial<PopupBaseProps> & {
    icon?: ReactNode
    entity?: Entity
  }

export function PopupAlert(props: PopupAlertProps) {
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

  if (entity) {
    const onSubmit = () => {
      invokeRequest({
        baseURL: baseURLPopup,
        method: HttpMethod.DELETE,
        onSuccess() {
          setOpen(false)
          onQuery(id, { page, size }, '', managerRole)
          dispatchNotification(
            'success',
            <Typography>
              Delete successfully{' '}
              <b className={styles.Subhead1}>{entity.labelNoti}</b>
            </Typography>
          )
        },
        onError() {
          setOpen(false)
          dispatchNotification(
            'error',
            <Typography>
              Can't delete <b className={styles.Subhead1}>{entity.labelNoti}</b>
            </Typography>
          )
        }
      })
    }

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
          isDelete
          open={open}
          onClick={onSubmit}
          onClose={() => setOpen(false)}
        >
          <Typography className={clsx(styles.Body2, styles.DialogContentText)}>
            Do you want to delete{' '}
            <b className={styles.Subhead2}>{entity.labelNoti}</b> ?
          </Typography>
        </PopupBase>
      </>
    )
  }
  return <></>
}
