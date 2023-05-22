import { Chip } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

export const ChipKey = {
  ACTIVE: 'Active',
  OFF: 'Off',
  PENDING: 'Pending'
}

export type StatusLabel = {
  className?: string
  label?: string
  chipKey?: string
}

export const Status = (props: StatusLabel) => {
  const { label, className, chipKey } = props
  let stylesClass

  switch (chipKey) {
    case ChipKey.ACTIVE:
      stylesClass = styles.Active
      break

    case ChipKey.OFF:
      stylesClass = styles.Off
      break

    case ChipKey.PENDING:
      stylesClass = styles.Pending
      break

    default:
      break
  }

  return <Chip label={label} className={clsx(className, stylesClass)} />
}
