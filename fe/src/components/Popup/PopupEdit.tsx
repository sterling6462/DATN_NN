import { DialogProps, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Control,
  Entity,
  FormProvider,
  HttpMethod,
  PopupBase,
  PopupBaseProps,
  UseFormProvider,
  invokeRequest,
  useAuthStore,
  useListViewStore,
  useNotificationStore
} from 'components'
import { ReactNode, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export type PopupEditProps<T extends FieldValues = FieldValues> =
  Partial<DialogProps> &
    Partial<PopupBaseProps> & {
      icon?: ReactNode
      entity?: Entity
      detail?: boolean
      inputPopupEdit: Array<Control<T>>
    }

export function PopupEdit(props: PopupEditProps) {
  const {
    popupClasses,
    icon,
    baseURLPopup = '',
    baseURLReload,
    id = '',
    entity,
    inputPopupEdit,
    children,
    managerRole,
    ...rest
  } = props
  const onQuery = useListViewStore((store) => store.onQuery)
  const { dispatchNotification } = useNotificationStore()
  const formRef = useRef<UseFormProvider>(null)
  const { auth } = useAuthStore()
  const houseId = { houseId: auth?.houseId }

  const [open, setOpen] = useState(false)
  const [isError, setError] = useState(false)

  const onSubmitClick = () => {
    !isError && formRef.current?.handleSubmit(onSubmit)()
  }

  const onSubmit = (param: Record<string, unknown>) => {
    let params
    if (managerRole) {
      params = { ...param, ...houseId }
    } else {
      params = param
    }
    invokeRequest({
      baseURL: baseURLPopup,
      method: HttpMethod.PATCH,
      params,
      onSuccess() {
        setOpen(false)
        onQuery(id, { page: 1, size: 10 })
        dispatchNotification(
          'success',
          <Typography>
            Edit successfully <b>{entity?.labelNoti}</b>
          </Typography>
        )
      },

      onHandleError(e) {
        if (typeof e.message === 'string') {
          setOpen(false)
          dispatchNotification(
            'error',
            <Typography>
              Can't edit <b>{entity?.labelNoti}</b>
            </Typography>
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
