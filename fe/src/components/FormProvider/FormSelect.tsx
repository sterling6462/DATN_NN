import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Autocomplete, createFilterOptions } from '@mui/material'
import clsx from 'clsx'
import { ContainerInputField, FormProps } from 'components'
import { useAPI } from 'hook'
import { useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

export type DataDropdown = {
  _id: string | boolean | number
  name: string
  sortOrder?: string
}

export const FormSelect = <T extends FieldValues>(props: FormProps<T>) => {
  const { form, control } = props
  const error = form.formState.errors[control.name]
  const [data, setData] = useState<Array<DataDropdown>>(
    Array.isArray(control.data) ? control.data : []
  )

  useAPI({
    baseURL: control.dropdownURL || '',
    onSuccess: (data) => setData(data)
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
        const defaultValue = data.find((d: DataDropdown) => d._id === value)
        console.log(
          data.find((d: DataDropdown) => d._id === control.defaultValue)
        )
        return (
          <Autocomplete
            defaultValue={data.find(
              (d: DataDropdown) => d._id === control.defaultValue
            )}
            key={control.name}
            disabled={control.disabled}
            placeholder={control.placeholder}
            options={data}
            className={clsx(styles.Autocomplete, control.className)}
            classes={{ input: styles.Input, listbox: styles.ListBoxDropdown }}
            popupIcon={<KeyboardArrowDownRounded />}
            noOptionsText="Not found"
            onChange={(_, newValue) => onChange(newValue?._id as any)}
            // filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            // isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <ContainerInputField
                {...params}
                value={defaultValue?.name}
                label={control.label}
                placeholder={control.placeholder}
                disabled={control.disabled}
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
