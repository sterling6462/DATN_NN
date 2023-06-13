import { AddRounded } from '@mui/icons-material'
import { DialogProps, Grid } from '@mui/material'
import clsx from 'clsx'
import {
  Control,
  FormProvider,
  HttpMethod,
  PopupBase,
  PopupBaseProps,
  PrimaryButton,
  UseFormProvider,
  invokeRequest,
  useAuthStore,
  useListViewStore,
  useNotificationStore
} from 'components'
import { ReactNode, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export type PopupAddProps<T extends FieldValues = FieldValues> =
  Partial<DialogProps> &
    Partial<PopupBaseProps> & {
      icon?: ReactNode
      textButton?: string
      textAlertSuccess?: string
      textAlertError?: string
      inputsPopup: Array<Control<T>>
      dataPopup?: Record<string, any>
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
    baseURLReload,
    managerRole,
    ...rest
  } = props
  const [open, setOpen] = useState(false)
  const [isError, setError] = useState(false)
  const formRef = useRef<UseFormProvider>(null)
  const onData = useListViewStore((store) => store.onData)
  const onQuery = useListViewStore((store) => store.onQuery)
  const { dispatchNotification } = useNotificationStore()
  const { auth } = useAuthStore()
  const houseId = { houseId: auth?.houseId }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const onSubmit = (params: Record<string, unknown>) => {
    // let params
    // if (managerRole) {
    //   params = { ...param, ...houseId }
    // } else {
    //   params = param
    // }
    console.log(params)
    invokeRequest({
      baseURL: baseURLPopup,
      method: HttpMethod.POST,
      params,
      onSuccess(data) {
        onData(id, data, baseURLPopup)
        setOpen(false)
        onQuery(id, { page: 1, size: 10 }, baseURLReload)
        textAlertSuccess && dispatchNotification('success', textAlertSuccess)
      },
      onHandleError(e) {
        if (typeof e.message == 'string') {
          setOpen(false)
          dispatchNotification('error', e.message || textAlertError)
          console.log(e.message)
        } else
          e.message?.map((m: { field: string; message: string }) => {
            console.log(e.message)

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
