import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Autocomplete } from '@mui/material'
import clsx from 'clsx'
import { useAPI } from 'hook'
import { useState } from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import { Control } from '.'
import { ContainerInputField } from '..'
import styles from './style.module.scss'

export type DataDropdown = {
  code: string
  label: string
  sortOrder?: string
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  control: Control<T>
}

export const FormSelect = <T extends FieldValues>(props: Props<T>) => {
  const { form, control } = props
  const error = form.formState.errors[control.name]
  const [data, setData] = useState<Array<DataDropdown>>(
    Array.isArray(control.data) ? control.data : []
  )

  if (control?.dropdownURL)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAPI({
      baseURL: control?.dropdownURL,
      onSuccess(data) {
        setData(data)
      }
    })

  return (
    <Controller
      name={control.name}
      defaultValue={control.defaultValue}
      control={form.control}
      rules={{
        required: control.required
      }}
      render={({ field: { onChange, value } }) => {
        const defaultValue = data.find((d) => d.code === value)
        return (
          <Autocomplete
            defaultValue={data.find((d) => d.code === control.defaultValue)}
            key={control.name}
            placeholder={control.placeholder}
            options={data}
            className={clsx(styles.Autocomplete, control.className)}
            classes={{ input: styles.Input, listbox: styles.ListBoxDropdown }}
            popupIcon={<KeyboardArrowDownRounded />}
            noOptionsText="Not found"
            onChange={(_, newValue) => onChange(newValue?.code)}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <ContainerInputField
                {...params}
                value={defaultValue?.label}
                label={control.label}
                placeholder={control.placeholder}
                error={Boolean(error)}
                helperText={error?.message as React.ReactNode}
              />
            )}
          />
        )
      }}
    />
  )
}
