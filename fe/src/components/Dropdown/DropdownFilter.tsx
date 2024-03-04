import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import clsx from 'clsx'
import { useListViewStore } from 'components'
import { useAPI } from 'hook'
import { default as queryString } from 'query-string'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

type DataDropdown = {
  code: string
  label: string
}

type Props = {
  labelDropdown?: string
  keyFilter: string
  baseURL: string
  id: string
}

export const DropdownFilter = (props: Props) => {
  const searchParams = queryString.parse(window.location.search)
  const { id, labelDropdown, baseURL, keyFilter } = props
  const onQuery = useListViewStore((store) => store.onQuery)

  const [options, setOptions] = useState<Array<DataDropdown>>([])
  const [value, setValue] = useState<DataDropdown | null>(null)

  useAPI({
    baseURL: baseURL,
    onSuccess(data) {
      setOptions(data)
    }
  })

  useEffect(() => {
    const defaultIndex = options.findIndex((d: any, index) => {
      if (d.code) return d?.code === searchParams[keyFilter]
    })
    setValue(options[defaultIndex])
  }, [options])

  const handleChange = (newValue: DataDropdown | null) => {
    setValue(newValue)
    onQuery(id, { page: undefined, [keyFilter]: newValue?.code })
  }

  return (
    <Grid display="flex" className={styles.DropdownFilter}>
      {labelDropdown && (
        <Grid item display="flex" alignItems={'center'}>
          <Typography className={clsx(styles.Caption, styles.LabelDropdown)}>
            {labelDropdown}
          </Typography>
        </Grid>
      )}
      <Autocomplete
        options={options}
        className={clsx(styles.Autocomplete, styles.DropdownContained)}
        getOptionLabel={(option) => option.label ?? option.code}
        isOptionEqualToValue={(option, value) => option?.code === value?.code}
        classes={{ input: styles.Text }}
        popupIcon={<KeyboardArrowDownRounded />}
        noOptionsText="Not found"
        onChange={(_, value) => handleChange(value)}
        value={value || null}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <div className={styles.ListBoxDropdown}>
                {option?.label ?? option?.code}
              </div>
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={'Select'} />
        )}
      />
    </Grid>
  )
}
