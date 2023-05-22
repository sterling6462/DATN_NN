import { DeleteRounded, EditRounded } from '@mui/icons-material'
import {
  PopupAlert,
  PopupAlertProps,
  PopupEdit,
  PopupEditProps
} from 'components'
import styles from './style.module.scss'

type TableActionProps = {
  id: string
  baseURL?: string
}

export const TableActionDelete = (
  props: TableActionProps & PopupAlertProps
) => {
  const { id, baseURL, ...rest } = props

  return (
    <PopupAlert
      {...rest}
      id={id}
      baseURLPopup={baseURL}
      icon={<DeleteRounded />}
      popupClasses={{ icon: styles.ButtonDelete }}
    />
  )
}

export const TableActionEdit = (props: TableActionProps & PopupEditProps) => {
  const { id, baseURL, ...rest } = props
  return (
    <PopupEdit
      {...rest}
      id={id}
      baseURLPopup={baseURL}
      icon={<EditRounded />}
      popupClasses={{ icon: styles.ButtonDelete }}
    />
  )
}
