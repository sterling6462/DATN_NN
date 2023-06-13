import { Close } from '@mui/icons-material'
import { AlertProps, AlertTitle, IconButton } from '@mui/material'
import clsx from 'clsx'
import { useNotificationStore } from 'components'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import styles from './style.module.scss'

interface CustomAlertProps {
  label: React.ReactNode
  value?: string
}

const AlertBase = (props: AlertProps & { value?: string }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { classes, className, children, value, ...rest } = props

  useEffect(() => {
    enqueueSnackbar(children, {
      key: value,
      variant: rest.severity,
      className: className,
      autoHideDuration: 6000,
      action: (
        <IconButton size="small" onClick={() => closeSnackbar(value)}>
          <Close />
        </IconButton>
      )
    })
  }, [props])

  return <></>
}

export const SuccessNotification = (props: AlertProps & CustomAlertProps) => {
  const { children, label, className, ...rest } = props
  return (
    <AlertBase
      {...rest}
      className={clsx(
        styles.AlertBase,
        styles.AlertSuccessRoot,
        styles.AlertBaseLabel,
        className
      )}
      severity="success"
      color="info"
    >
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>
        {label}
      </AlertTitle>
    </AlertBase>
  )
}

export const InfoNotification = (props: AlertProps & CustomAlertProps) => {
  const { children, label, className, ...rest } = props
  return (
    <AlertBase
      {...rest}
      className={clsx(
        styles.AlertBase,
        styles.AlertInfoRoot,
        styles.AlertBaseLabel,
        className
      )}
      severity="info"
    >
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>
        {label}
      </AlertTitle>
    </AlertBase>
  )
}

export const WarningNotification = (props: AlertProps & CustomAlertProps) => {
  const { children, label, className, ...rest } = props
  return (
    <AlertBase
      {...rest}
      className={clsx(
        styles.AlertBase,
        styles.AlertWarningRoot,
        styles.AlertBaseLabel,
        className
      )}
      severity="warning"
    >
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>
        {label}
      </AlertTitle>
    </AlertBase>
  )
}

export const ErrorNotification = (props: AlertProps & CustomAlertProps) => {
  const { children, label, className, ...rest } = props
  return (
    <AlertBase
      {...rest}
      className={clsx(
        styles.AlertBase,
        styles.AlertErrorRoot,
        styles.AlertBaseLabel,
        className
      )}
      severity="error"
    >
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>
        {label}
      </AlertTitle>
    </AlertBase>
  )
}

export enum Type {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export const NotificationProvider = () => {
  const notification = useNotificationStore((store) => store.notification)
  if (notification) {
    const { label, type, key } = notification

    switch (type) {
      case Type.INFO:
        return <InfoNotification value={key} label={label}></InfoNotification>
      case Type.SUCCESS:
        return (
          <SuccessNotification value={key} label={label}></SuccessNotification>
        )
      case Type.ERROR:
        const message =
          label || 'There is something wrong. Please try again later!'
        return <ErrorNotification value={key} label={message} />
      case Type.WARNING:
        return (
          <WarningNotification value={key} label={label}></WarningNotification>
        )
      default:
        return <></>
    }
  }
  return <></>
}
