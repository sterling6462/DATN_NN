import { AccessTimeRounded } from '@mui/icons-material'
import { Avatar, DialogActions, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Control,
  FormProvider,
  HttpMethod,
  PopupEdit,
  PopupEditProps,
  PrimaryButton,
  UseFormProvider,
  dateTimeFormat,
  invokeRequest,
  useListViewStore,
  useNotificationStore
} from 'components'
import { useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export interface UserInfo {
  _id: string
  lastName: string
  firstName: string
  username: string
  password: string
  birthday: string
  role: string
  roles: string[]
  location: string
  phone: number
  houseId: string
  createdAt: string
}

interface CardUserInfoProps<T extends FieldValues = FieldValues> {
  id: string
  data?: UserInfo
  inputs: Array<Control<T>>
  baseURL: string
  baseURLEditProfile?: string
  textEditSuccess?: string
  textEditError?: string
}

export const CardUserInfo = (
  props: CardUserInfoProps & Partial<PopupEditProps>
) => {
  const {
    id,
    data,
    baseURL,
    baseURLReload,
    inputs,
    textEditSuccess,
    textEditError,
    baseURLEditProfile = '',
    inputPopupEdit,
    ...rest
  } = props
  const [isError, setError] = useState(false)
  const formRef = useRef<UseFormProvider>(null)
  const { dispatchNotification } = useNotificationStore()
  const onData = useListViewStore((store) => store.onData)
  const onQuery = useListViewStore((store) => store.onQuery)

  const onSubmit = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: baseURLEditProfile,
      method: HttpMethod.PATCH,
      params,
      onSuccess(data) {
        onData(id, data, baseURLEditProfile)
        onQuery(id, {}, baseURLReload)
        textEditSuccess && dispatchNotification('success', textEditSuccess)
      },
      onHandleError(e) {
        if (typeof e.message === 'string') {
          dispatchNotification('error', e.message || textEditError)
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
      <Grid container className={styles.CardUserInfo}>
        <Grid item container xs={4} className={styles.LeftContainer}>
          <Grid item className={styles.AvatarContainer}>
            <Avatar
              sx={{ backgroundColor: '#fc6719' }}
              className={styles.Avatar}
            >
              {data.username?.charAt(0)}
            </Avatar>
            <Typography className={clsx(styles.Headline6, styles.Name)}>
              {data.username}
            </Typography>
          </Grid>
          <Grid item className={styles.CreateAtContainer}>
            <AccessTimeRounded className={styles.Icon} />
            <Typography
              component={'span'}
              className={clsx(styles.Text, styles.Body2)}
            >
              Last created at
              <p className={clsx(styles.CreatedAt, styles.Body2)}>
                {dateTimeFormat(data.createdAt)}
              </p>
            </Typography>
          </Grid>
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
            <DialogActions className={clsx(styles.DialogActions)}>
              {inputPopupEdit && (
                <Grid className={styles.ButtonLeft} xs={6}>
                  <PopupEdit
                    {...rest}
                    id={id}
                    inputPopupEdit={inputPopupEdit}
                  />
                </Grid>
              )}
              <Grid className={styles.ButtonRight} xs={inputPopupEdit ? 6 : 12}>
                <PrimaryButton
                  className={styles.Button}
                  onClick={onSubmitClick}
                >
                  Edit
                </PrimaryButton>
              </Grid>
            </DialogActions>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  return <></>
}

export * from './CardUserRent'
