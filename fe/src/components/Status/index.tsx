import { Chip } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

export const ChipKey = {
  ACTIVE: 'Active',
  OFF: 'Off',
  PENDING: 'Pending',
  TRUE: true,
  FALSE: false
}

export type StatusLabel = {
  className?: string
  label?: string
  chipKey?: string | boolean
}

export const Status = (props: StatusLabel) => {
  const { label, className, chipKey } = props
  let stylesClass, labelSample

  switch (chipKey) {
    case ChipKey.ACTIVE:
      stylesClass = styles.Active
      labelSample = 'Room in'
      break

    case ChipKey.OFF:
      stylesClass = styles.Off
      labelSample = 'Available'
      break

    case ChipKey.TRUE:
      stylesClass = styles.Active
      labelSample = 'Paid'
      break

    case ChipKey.FALSE:
      stylesClass = styles.Off
      labelSample = 'Unpaid'
      break

    case ChipKey.PENDING:
      stylesClass = styles.Pending
      break

    default:
      break
  }

  return (
    <Chip
      label={label || labelSample}
      className={clsx(className, stylesClass)}
    />
  )
}
