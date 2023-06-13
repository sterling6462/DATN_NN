import { Box } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import clsx from 'clsx'
import { FormProps } from 'components'
import { ReactNode } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export const FormDate = <T extends FieldValues>(props: FormProps<T>) => {
  const { form, control } = props
  const error = form.formState.errors[control.name]

  return (
    <Controller
      defaultValue={control.defaultValue}
      name={control.name}
      control={form.control}
      rules={{
        required: control.required
      }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className={styles.ContainerBox}>
            <DatePicker
              ref={field.ref}
              value={field.value}
              label={control.label}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  helperText: error?.message as ReactNode,
                  error: Boolean(error),
                  className: clsx(
                    styles.InputField,
                    styles.ContainerInputField
                  ),
                  placeholder: control.placeholder,
                  classes: { root: styles.TextFieldRoot },
                  InputLabelProps: {
                    shrink: true,
                    classes: {
                      root: clsx(styles.LabelRoot, styles.Caption),
                      focused: clsx(styles.LabelFocused),
                      error: styles.LabelError,
                      disabled: styles.LabelDisabled
                    }
                  },
                  InputProps: {
                    classes: {
                      root: clsx(styles.InputBaseRoot),
                      focused: clsx(styles.InputBaseFocused),
                      notchedOutline: clsx(styles.NotchedOutline),
                      error: styles.InputBaseError,
                      disabled: styles.InputBaseDisabled
                    }
                  },
                  FormHelperTextProps: {
                    classes: {
                      root: styles.HelperTextRoot,
                      error: styles.HelperTextError
                    }
                  }
                }
              }}
              className={clsx(control.className, styles.DatePicker)}
            />
          </Box>
        </LocalizationProvider>
      )}
    />
  )
}
