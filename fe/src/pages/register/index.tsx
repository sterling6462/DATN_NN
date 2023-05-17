import {
  AccountBox,
  LocalPhone,
  LocationOn,
  LockPerson,
  Person
} from '@mui/icons-material'
import { Box, InputAdornment, Typography } from '@mui/material'
import house from 'assets/json/house.json'
import clsx from 'clsx'
import {
  BaseFormInputs,
  FormInputEnum,
  FormProvider,
  HttpMethod,
  LottieAnimation,
  PrimaryButton,
  UseFormProvider,
  invokeRequest
} from 'components'
import { REGISTER_ENDPOINT } from 'constants/ApiConstant'
import { PATH } from 'constants/Paths'
import { useRef } from 'react'
import styles from './style.module.scss'

interface RegisterInputs extends BaseFormInputs {
  name: string
  username: string
  password: string
  phone: number
  location: string
}

const inputsRegister = [
  {
    name: 'name',
    type: FormInputEnum.INPUT,
    label: 'Full name *',
    required: { value: true, message: 'Fullname is required' },
    placeholder: 'Enter your Full name',
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <AccountBox />
      </InputAdornment>
    ),
    className: styles.Input
  },
  {
    name: 'username',
    type: FormInputEnum.INPUT,
    label: 'Username *',
    required: { value: true, message: 'Username is required' },
    maxLength: {
      value: 30,
      message: "Username can't be longer than 30 characters"
    },
    minLength: { value: 5, message: 'Username must be at least 5 characters' },
    placeholder: 'Enter your username',
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <Person />
      </InputAdornment>
    ),
    className: styles.Input
  },
  {
    name: 'password',
    type: FormInputEnum.PASSWORD,
    label: 'Password *',
    required: { value: true, message: 'Password is required' },
    maxLength: {
      value: 30,
      message: "Username can't be longer than 30 characters"
    },
    minLength: { value: 5, message: 'Username must be at least 5 characters' },
    placeholder: 'Enter your password',
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <LockPerson />
      </InputAdornment>
    ),
    className: styles.Input,
    isShowPassword: true
  },
  {
    name: 'phone',
    type: FormInputEnum.NUMBER,
    label: 'Phone number *',
    required: { value: true, message: 'Phone number is required' },
    placeholder: 'Enter your Phone number',
    minLength: {
      value: 10,
      message: 'Phone number must be at least 10 characters'
    },
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <LocalPhone />
      </InputAdornment>
    ),
    className: styles.Input
  },
  {
    name: 'location',
    type: FormInputEnum.INPUT,
    label: 'Location',
    placeholder: 'Enter your Location',
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <LocationOn />
      </InputAdornment>
    ),
    className: styles.Input
  }
]

export default function Register() {
  const formRef = useRef<UseFormProvider<RegisterInputs>>(null)

  const onRegister = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: `${process.env.REACT_APP_BASE_URL}${REGISTER_ENDPOINT}`,
      method: HttpMethod.POST,
      params,
      onSuccess() {
        const searchLocation = new URLSearchParams(window.location.search).get(
          'redirectUrl'
        )
        window.location.replace(searchLocation || '/login')
      },
      onError() {
        //TODO show Notification Error
      }
    })
  }

  const onRegisterClick = () => {
    formRef.current?.handleSubmit(onRegister)()
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Box className={styles.registerForm}>
          <Typography className={clsx(styles.title, styles.Display1)}>
            Register
          </Typography>

          <div className={styles.formInput}>
            <FormProvider
              ref={formRef}
              mode="onTouched"
              inputs={inputsRegister}
            />
          </div>
          <PrimaryButton className={styles.button} onClick={onRegisterClick}>
            Register
          </PrimaryButton>
        </Box>
      </div>
      <div className={styles.panelContainer}>
        <div className={styles.rightPanel}>
          <div className={styles.content}>
            <Typography className={clsx(styles.Headline2, styles.text)}>
              Member ?
            </Typography>
            <Typography className={clsx(styles.Body1, styles.text)}>
              Log in to your account
            </Typography>

            <PrimaryButton className={styles.button} href={PATH.LOGIN}>
              LOGIN
            </PrimaryButton>
          </div>
          <div className={styles.imageLottie}>
            <LottieAnimation animationData={house} width="90%" margin="0px" />
          </div>
        </div>
      </div>
    </div>
  )
}
