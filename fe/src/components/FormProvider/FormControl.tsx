import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControlLabel, IconButton, InputAdornment } from '@mui/material'
import clsx from 'clsx'
import {
  CheckBox,
  ContainerInputField,
  Control,
  FormInputEnum
} from 'components'
import { ReactNode, useState } from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import {} from '.'
import styles from './style.module.scss'

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  control: Control<T>
}
export const FormTextInput = <T extends FieldValues>(props: FormProps<T>) => {
  const { form, control } = props
  const [isShow, setIsShow] = useState(false)

  const error = form.formState.errors[control.name]

  const renderPasswordIcon = (isShowPassword: boolean, type: string) => {
    if (isShowPassword && type === FormInputEnum.PASSWORD) {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }
  }

  return (
    <Controller
      defaultValue={control.defaultValue}
      name={control.name}
      control={form.control}
      rules={{
        required: control.required,
        minLength: control.minLength,
        maxLength: control.maxLength,
        pattern: control.pattern,
        max: control.max,
        min: control.min
      }}
      render={({ field }) => (
        <ContainerInputField
          disabled={control.disabled}
          ref={field.ref}
          value={field.value}
          label={control.label}
          id={control.name}
          onChange={field.onChange as any}
          onBlur={({ target }) => {
            target.value &&
              form.setValue(field.name, target.value.trim() as any)
            field.onBlur()
          }}
          type={isShow ? FormInputEnum.INPUT : control.type}
          helperText={error?.message as ReactNode}
          error={Boolean(error)}
          className={clsx(control.className, styles.TextField)}
          textFieldClasses={control.textFieldClasses}
          placeholder={control.placeholder}
          InputProps={{
            startAdornment: control.startAdornment,
            endAdornment: renderPasswordIcon(
              !!control.isShowPassword,
              control.type
            )
          }}
          inputProps={{ min: control.min?.value, max: control.max?.value }}
        />
      )}
    />
  )
}

export const FormCheckbox = <T extends FieldValues>(props: FormProps<T>) => {
  const { form, control } = props
  return (
    <Controller
      name={control.name}
      control={form.control}
      render={({ field: { onChange, value = false } }) => (
        <FormControlLabel
          control={
            <CheckBox
              // onChange={(e) => onChange(e.target.checked)}
              checked={value}
            />
          }
          key={control.name}
          label={control.label}
          className={clsx(control.className, styles.CheckBox)}
        />
      )}
    />
  )
}
