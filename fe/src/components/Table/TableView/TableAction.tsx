import { DeleteRounded } from '@mui/icons-material'
import { PopupAlert, PopupAlertProps } from 'components'
import styles from './style.module.scss'

type TableActionProps = {
  id: string
  baseURL?: string
}

export const TableDelete = (props: TableActionProps & PopupAlertProps) => {
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
