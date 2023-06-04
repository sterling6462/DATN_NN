import { Avatar, DialogActions, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Control,
  FormProvider,
  HttpMethod,
  PrimaryButton,
  TextButton,
  UseFormProvider,
  capitalizeFirstLetter,
  invokeRequest,
  useListViewStore,
  useNotificationStore
} from 'components'
import { useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export interface CardUserInfo {
  name?: string
  username?: string
  role?: string
  location?: string
  phone?: number
  houseId?: string
}

interface CardUserInfoProps<T extends FieldValues = FieldValues> {
  id: string
  data?: CardUserInfo
  inputs: Array<Control<T>>
  baseURL: string
  textAlertSuccess?: string
  textAlertError?: string
}

export const CardUserInfo = (props: CardUserInfoProps) => {
  const { id, data, textAlertError, textAlertSuccess, baseURL, inputs } = props
  const [isError, setError] = useState(false)
  const formRef = useRef<UseFormProvider>(null)
  const { dispatchNotification } = useNotificationStore()
  const onData = useListViewStore((store) => store.onData)
  const onQuery = useListViewStore((store) => store.onQuery)

  const onSubmit = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: baseURL,
      method: HttpMethod.PATCH,
      params,
      onSuccess(data) {
        onData(id, data, baseURL)
        onQuery(id, {}, baseURL)
        textAlertSuccess && dispatchNotification('success', textAlertSuccess)
      },
      onHandleError(e) {
        if (typeof e.message == 'string') {
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

  if (data) {
    return (
      <Grid container columnSpacing={2} className={styles.CardUserInfo}>
        <Grid item xs={4} className={styles.LeftContainer}>
          <Avatar sx={{ backgroundColor: '#fc6719' }} className={styles.Avatar}>
            {data?.name?.charAt(0)}
          </Avatar>
          <Typography className={clsx(styles.Headline4, styles.Name)}>
            {capitalizeFirstLetter(data?.name || '')}
          </Typography>
        </Grid>
        <Grid item xs={8} className={styles.RightContainer}>
          <Grid item xs={12} className={styles.Title}>
            <Typography className={clsx(styles.Headline6, styles.Text)}>
              General Information
            </Typography>
          </Grid>

          <Grid item className={styles.FormProvider}>
            <FormProvider
              handleErrors={(error) => setError(!!error)}
              ref={formRef}
              inputs={inputs}
              mode="onTouched"
            />
          </Grid>

          <Grid item xs={12}>
            <DialogActions className={clsx(styles.DialogActionsRoot)}>
              <TextButton
                className={clsx(styles.Button, styles.TextCancel)}
                onClick={() => undefined}
              >
                Cancel
              </TextButton>
              <PrimaryButton className={styles.Button} onClick={onSubmitClick}>
                Edit
              </PrimaryButton>
            </DialogActions>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  return <></>
}
