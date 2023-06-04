import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Grid, Select, SelectChangeEvent, SelectProps, Typography } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './style.module.scss'

const InputClasses = {
  root: styles.Button,
  disabled: styles.InputDisabled,
  iconOpen: styles.IconOpen
}

type DropdownProps = {
  flexDirection?: 'row' | 'column'
  dropdownClasses?: { label?: string; select?: string }
}

export const BaseDropdown = (props: SelectProps & DropdownProps) => {
  const { label, defaultOpen, inputProps, flexDirection, children, dropdownClasses, defaultValue, ...rest } = props
  const [selected, setSelected] = useState(defaultValue)
  const handleChangeSelected = (event: SelectChangeEvent<any>) => {
    setSelected(event.target.value)
  }

  return (
    <Grid display='flex' flexDirection={flexDirection}>
      {label && (
        <Grid item display='flex' alignItems={'center'}>
          <Typography className={clsx(styles.Caption, styles.Text, dropdownClasses?.label)}>{label}</Typography>
        </Grid>
      )}
      <Grid item>
        <Select
          className={clsx(styles.BaseDropdown, dropdownClasses?.select)}
          value={selected}
          onChange={handleChangeSelected}
          inputProps={{
            classes: { ...InputClasses },
            ...inputProps
          }}
          IconComponent={KeyboardArrowDownRounded}
          {...rest}>
          {children}
        </Select>
      </Grid>
    </Grid>
  )
}

export const DropdownContained = (props: SelectProps & DropdownProps) => {
  const { className, classes, children, ...rest } = props

  return (
    <BaseDropdown
      {...rest}
      variant='outlined'
      className={clsx(styles.DropdownContained, className)}
      classes={{
        outlined: styles.Outlined,
        ...classes
      }}>
      {children}
    </BaseDropdown>
  )
}

export const DropdownLine = (props: SelectProps & DropdownProps) => {
  const { className, children, ...rest } = props

  return (
    <BaseDropdown {...rest} flexDirection='column' variant='standard' className={clsx(styles.DropdownLine, className)}>
      {children}
    </BaseDropdown>
  )
}

export * from './DropdownFilter'
