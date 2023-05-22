import { AddRounded } from '@mui/icons-material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import clsx from 'clsx'
import {
  Control,
  FormProvider,
  HttpMethod,
  PrimaryButton,
  TextButton,
  UseFormProvider,
  invokeRequest,
  useListViewStore,
  useNotificationStore
} from 'components'
import { default as queryString } from 'query-string'
import { MouseEventHandler, ReactNode, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export type Entity = Record<string, any>

type PopupBaseProps = DialogProps & {
  id?: string
  baseURLPopup?: string
  titlePopup?: string
  required?: boolean
  isDelete?: boolean
  open: boolean
  onClose: (open: boolean) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
  baseClasses?: { title?: string; content?: string; actions?: string }
  popupClasses?: { icon?: string; popup?: string }
}

export type PopupAlertProps = Partial<DialogProps> &
  Partial<PopupBaseProps> & {
    icon?: ReactNode
    entity?: Entity
  }

export type PopupEditProps<T extends FieldValues = FieldValues> =
  Partial<DialogProps> &
    Partial<PopupBaseProps> & {
      icon?: ReactNode
      entity?: Entity
      detail?: boolean
      inputPopupEdit: Array<Control<T>>
    }

export type PopupAddProps<T extends FieldValues = FieldValues> =
  Partial<DialogProps> &
    Partial<PopupBaseProps> & {
      icon?: ReactNode
      textButton?: string
      textAlertSuccess?: string
      textAlertError?: string
      inputsPopup: Array<Control<T>>
      data?: Record<string, any>
    }

export const PopupBase = (props: PopupBaseProps) => {
  const {
    children,
    titlePopup,
    PaperProps,
    isDelete,
    open,
    onClose,
    onClick,
    baseClasses,
    ...rest
  } = props

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Dialog
      {...rest}
      onClose={onClose}
      open={open}
      PaperProps={{
        classes: {
          root: styles.PaperRoot
        },
        ...PaperProps
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <DialogTitle
            className={clsx(
              styles.DialogTitleContent,
              styles.Headline5,
              baseClasses?.title
            )}
          >
            {titlePopup}
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          <DialogContent
            className={clsx(
              styles.DialogContentRoot,
              styles.DialogContentTextRoot,
              baseClasses?.content
            )}
          >
            {children}
          </DialogContent>
        </Grid>
        <Grid item xs={12}>
          <DialogActions className={clsx(styles.DialogActionsRoot)}>
            <TextButton
              className={clsx(styles.TextButton, styles.TextCancel)}
              onClick={handleClose}
            >
              Cancel
            </TextButton>
            <PrimaryButton className={styles.TextButton} onClick={onClick}>
              {isDelete ? 'Delete' : titlePopup}
            </PrimaryButton>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export function PopupAdd(props: PopupAddProps) {
  const {
    inputsPopup,
    className,
    required,
    textButton,
    textAlertSuccess,
    textAlertError,
    id = '',
    baseURLPopup = '',
    ...rest
  } = props
  const [open, setOpen] = useState(false)
  const [isError, setError] = useState(false)
  const formRef = useRef<UseFormProvider>(null)
  const onData = useListViewStore((store) => store.onData)
  const onQuery = useListViewStore((store) => store.onQuery)
  const { dispatchNotification } = useNotificationStore()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const onSubmit = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: baseURLPopup,
      method: HttpMethod.POST,
      params,
      onSuccess(data) {
        onData(id, data, baseURLPopup)
        setOpen(false)
        onQuery(id, { page: 1, size: 10 })
        textAlertSuccess && dispatchNotification('success', textAlertSuccess)
      },
      onHandleError(e) {
        if (typeof e.message == 'string') {
          setOpen(false)
          dispatchNotification('error', e.message || textAlertError)
        } else
          e.message?.map((m: { field: string; message: string }) => {
            formRef.current?.setError(m.field, {
              type: 'custom',
              message: m.message
            })
          })
      }
    })
  }

  const onSubmitClick = () => {
    !isError && formRef.current?.handleSubmit(onSubmit)()
  }

  return (
    <Grid item className={styles.ButtonAdd}>
      <PrimaryButton
        startIcon={<AddRounded />}
        className={styles.Text}
        onClick={handleClickOpen}
      >
        {textButton}
      </PrimaryButton>
      <PopupBase
        {...rest}
        open={open}
        onClick={onSubmitClick}
        onClose={() => setOpen(false)}
        baseClasses={{ content: styles.PopupAdd }}
        className={clsx(styles.DialogRoot, className)}
      >
        <FormProvider
          handleErrors={(error) => setError(!!error)}
          ref={formRef}
          inputs={inputsPopup}
          mode="onTouched"
        />
      </PopupBase>
    </Grid>
  )
}

export function PopupAlert(props: PopupAlertProps) {
  const {
    popupClasses,
    icon,
    baseURLPopup = '',
    id = '',
    entity,
    children,
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
          onQuery(id, { page, size })
          dispatchNotification(
            'success',
            <>
              Delete successfully <strong>{entity.label}</strong>
            </>
          )
        },
        onError() {
          setOpen(false)
          dispatchNotification(
            'error',
            <>
              Cann't delete <strong>{entity.label}</strong>
            </>
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
            <b className={styles.Subhead2}>{entity.label}</b> ?
          </Typography>
        </PopupBase>
      </>
    )
  }
  return <></>
}

export function PopupEdit(props: PopupEditProps) {
  const {
    popupClasses,
    icon,
    baseURLPopup = '',
    id = '',
    entity,
    inputPopupEdit,
    children,
    ...rest
  } = props
  const onQuery = useListViewStore((store) => store.onQuery)
  const { dispatchNotification } = useNotificationStore()
  const formRef = useRef<UseFormProvider>(null)

  const [open, setOpen] = useState(false)
  const [isError, setError] = useState(false)

  const onSubmitClick = () => {
    !isError && formRef.current?.handleSubmit(onSubmit)()
  }

  const onSubmit = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: baseURLPopup,
      method: HttpMethod.PATCH,
      params,
      onSuccess() {
        setOpen(false)
        onQuery(id, { page: 1, size: 10 })
        dispatchNotification(
          'success',
          <>
            Edit successfully <strong>{entity?.label}</strong>
          </>
        )
      },

      onHandleError(e) {
        if (typeof e.message == 'string') {
          setOpen(false)
          dispatchNotification(
            'error',
            <>
              Cann't edit <strong>{entity?.label}</strong>
            </>
          )
        } else
          e.message?.map((m: { field: string; message: string }) => {
            formRef.current?.setError(m.field, {
              type: 'custom',
              message: m.message
            })
          })
      }
    })
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className={popupClasses?.icon}>
        {icon}
      </IconButton>

      <div onClick={() => setOpen(true)}>{children}</div>
      <PopupBase
        {...rest}
        className={clsx(styles.DialogRoot, popupClasses?.popup)}
        title="Notification"
        open={open}
        onClick={onSubmitClick}
        onClose={() => setOpen(false)}
      >
        <FormProvider
          handleErrors={(error) => setError(!!error)}
          ref={formRef}
          inputs={inputPopupEdit}
          mode="onTouched"
        />
      </PopupBase>
    </>
  )
}
