import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Autocomplete, createFilterOptions } from '@mui/material'
import clsx from 'clsx'
import { useAPI } from 'hook'
import { useState } from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import { Control } from '.'
import { ContainerInputField } from '..'
import styles from './style.module.scss'

export type DataDropdown = {
  _id: string | boolean | number
  name: string
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
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: DataDropdown) => option.name
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
        const defaultValue = data.find((d) => d._id === value)
        return (
          <Autocomplete
            defaultValue={data.find((d) => d._id === control.defaultValue)}
            key={control.name}
            placeholder={control.placeholder}
            options={data}
            className={clsx(styles.Autocomplete, control.className)}
            classes={{ input: styles.Input, listbox: styles.ListBoxDropdown }}
            popupIcon={<KeyboardArrowDownRounded />}
            noOptionsText="Not found"
            onChange={(_, newValue) => onChange(newValue?._id)}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <ContainerInputField
                {...params}
                value={defaultValue?.name}
                label={control.label}
                placeholder={control.placeholder}
                error={Boolean(error)}
                helperText={error?.message as React.ReactNode}
                textFieldClasses={control.textFieldClasses}
              />
            )}
          />
        )
      }}
    />
  )
}
