import { LockPerson, Person } from '@mui/icons-material'
import { Box, InputAdornment, Typography } from '@mui/material'
import house from 'assets/json/house.json'
import clsx from 'clsx'
import {
  BaseFormInputs,
  FormInputEnum,
  FormProvider,
  LottieAnimation,
  PrimaryButton,
  UseFormProvider,
  setCookie,
  useAuthStore,
  useNotificationStore
} from 'components'
import { LOGIN_ENDPOINT } from 'constants/ApiConstant'
import { useEffect, useRef } from 'react'
import styles from './style.module.scss'

interface LoginInputs extends BaseFormInputs {
  username: string
  password: string
}

const inputsLogin = [
  {
    name: 'username',
    type: FormInputEnum.INPUT,
    label: 'Username',
    required: { value: true, message: 'Username is required' },
    maxLength: {
      value: 30,
      message: "Username can't be longer than 30 characters"
    },
    minLength: { value: 2, message: 'Username must be at least 5 characters' },
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
    label: 'Password',
    required: { value: true, message: 'Password is required' },
    placeholder: 'Enter your password',
    startAdornment: (
      <InputAdornment position="start" className={styles.inputIcon}>
        <LockPerson />
      </InputAdornment>
    ),
    className: styles.Input,
    isShowPassword: true
  }
]

export default function Login() {
  const { auth, isSubmitting, isError, loginApi } = useAuthStore()
  const { dispatchNotification } = useNotificationStore()

  const formRef = useRef<UseFormProvider<LoginInputs>>(null)

  //TODO handle Login Click
  useEffect(() => {
    if (isError) {
      dispatchNotification &&
        dispatchNotification('error', 'Username or Password is incorrectly')
    }
    if (auth) {
      // TODO: Switch home page
      const searchLocation = new URLSearchParams(window.location.search).get(
        'redirectUrl'
      )
      setCookie('access', auth.access_token, '3000')
      window.location.replace(searchLocation || '/')
      dispatchNotification &&
        dispatchNotification('success', 'Logged in successfully')
    }
  }, [isError, auth])

  useEffect(() => {
    const keyDown = (e: any) => {
      if (e.key === 'Enter') {
        // not reload page when pressing enter
        e.preventDefault()
        onLoginClick()
      }
    }
    window.addEventListener('keydown', (e) => keyDown(e))
    return () => window.removeEventListener('keydown', (e) => keyDown(e))
  }, [])

  const onLogin = (data: LoginInputs) => {
    loginApi(`${process.env.REACT_APP_BASE_URL}${LOGIN_ENDPOINT}`, data)
  }

  const onLoginClick = () => {
    formRef.current?.handleSubmit(onLogin)()
  }

  return (
    <div className={styles.container}>
      <div className={styles.panelContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.content}>
            <Typography className={clsx(styles.Headline2, styles.text)}>
              New here ?
            </Typography>
            <Typography className={clsx(styles.Body1, styles.text)}>
              Get started on Accommodation today
            </Typography>

            {/* <PrimaryButton
              className={styles.button}
              id="register-btn"
              href={PATH.REGISTER}
            >
              Register
            </PrimaryButton> */}
          </div>
          <div className={styles.imageLottie}>
            <LottieAnimation animationData={house} width="90%" margin="0px" />
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Box className={styles.loginForm}>
          <Typography className={clsx(styles.title, styles.Display1)}>
            Log in
          </Typography>
          <div className={styles.formInput}>
            <FormProvider ref={formRef} mode="onTouched" inputs={inputsLogin} />
          </div>
          <PrimaryButton
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
            onClick={onLoginClick}
          >
            Login
          </PrimaryButton>
        </Box>
      </div>
    </div>
  )
}
