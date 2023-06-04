import { Box, TextField, TextFieldProps } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

const InputBaseClasses = {
  error: styles.InputBaseError,
  disabled: styles.InputBaseDisabled
}

const InputLabelClasses = {
  error: styles.LabelError,
  disabled: styles.LabelDisabled
}

const FormHelperTextClasses = {
  root: styles.HelperTextRoot,
  error: styles.HelperTextError
}

export type ExtraTextFieldProps = {
  textFieldClasses?: {
    inputBaseRoot?: string
    inputBaseFocused?: string
    labelRoot?: string
    labelFocused?: string
    notchedOutline?: string
  }
}

const BaseInputField = (props: TextFieldProps & ExtraTextFieldProps) => {
  const {
    InputLabelProps,
    FormHelperTextProps,
    className,
    variant,
    textFieldClasses,
    ...rest
  } = props

  return (
    <Box
      className={variant === 'outlined' ? styles.ContainerBox : styles.LineBox}
    >
      <TextField
        {...rest}
        className={className}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        InputLabelProps={{
          shrink: true,
          classes: {
            ...InputLabelClasses,
            root: clsx(
              styles.LabelRoot,
              styles.Caption,
              textFieldClasses?.labelRoot
            ),
            focused: clsx(styles.LabelFocused, textFieldClasses?.labelFocused)
          },
          ...InputLabelProps
        }}
        FormHelperTextProps={{
          classes: FormHelperTextClasses,
          ...FormHelperTextProps
        }}
      />
    </Box>
  )
}

export const LineInputField = (props: TextFieldProps & ExtraTextFieldProps) => {
  const { textFieldClasses, ...rest } = props
  return (
    <BaseInputField
      {...props}
      variant="standard"
      className={clsx(
        styles.InputField,
        styles.LineInputField,
        props.className
      )}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          root: clsx(styles.InputBaseRoot, textFieldClasses?.inputBaseRoot),
          focused: clsx(
            styles.InputBaseFocused,
            textFieldClasses?.inputBaseFocused
          )
        },
        ...rest.InputProps
      }}
    />
  )
}

export const ContainerInputField = (
  props: TextFieldProps & ExtraTextFieldProps
) => {
  const { textFieldClasses } = props

  return (
    <BaseInputField
      {...props}
      variant="outlined"
      className={clsx(styles.InputField, styles.ContainerInputField)}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          root: clsx(styles.InputBaseRoot, textFieldClasses?.inputBaseRoot),
          focused: clsx(
            styles.InputBaseFocused,
            textFieldClasses?.inputBaseFocused
          ),
          notchedOutline: clsx(
            styles.NotchedOutline,
            textFieldClasses?.notchedOutline
          )
        },
        ...props.InputProps
      }}
    />
  )
}

export const TextareaField = (props: TextFieldProps & ExtraTextFieldProps) => {
  const {
    InputProps,
    InputLabelProps,
    FormHelperTextProps,
    className,
    textFieldClasses,
    maxRows = 4,
    minRows = 1,
    label,
    ...rest
  } = props

  return (
    <TextField
      {...rest}
      label={label}
      multiline
      maxRows={maxRows}
      minRows={minRows}
      variant="outlined"
      className={clsx(
        styles.InputField,
        styles.ContainerInputField,
        label ? styles.TextareaField : styles.TextareaNoLabel,
        className
      )}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          root: clsx(
            styles.InputBaseRoot,
            props.textFieldClasses?.inputBaseRoot
          ),
          focused: clsx(
            styles.InputBaseFocused,
            textFieldClasses?.inputBaseFocused
          ),
          notchedOutline: styles.NotchedOutline
        },
        ...InputProps
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          ...InputLabelClasses,
          root: clsx(
            styles.LabelRoot,
            styles.Caption,
            textFieldClasses?.labelRoot
          ),
          focused: clsx(styles.LabelFocused, textFieldClasses?.labelFocused)
        },
        ...InputLabelProps
      }}
      FormHelperTextProps={{
        classes: FormHelperTextClasses,
        ...FormHelperTextProps
      }}
    />
  )
}
