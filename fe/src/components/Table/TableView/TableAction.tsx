import { DeleteRounded, EditRounded, MoreVert } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  PopupAlert,
  PopupAlertProps,
  PopupEdit,
  PopupEditProps
} from 'components'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'

type TableActionProps = {
  id: string
  baseURL?: string
}

export const TableActionDelete = (
  props: TableActionProps & PopupAlertProps
) => {
  const { id, baseURL, baseURLReload, ...rest } = props

  return (
    <PopupAlert
      {...rest}
      id={id}
      managerRole
      baseURLPopup={baseURL}
      baseURLReload={baseURLReload}
      icon={<DeleteRounded />}
      popupClasses={{ icon: styles.Button }}
    />
  )
}

export const TableActionEdit = (props: TableActionProps & PopupEditProps) => {
  const { id, baseURL, baseURLReload, ...rest } = props

  return (
    <PopupEdit
      {...rest}
      id={id}
      managerRole
      baseURLPopup={baseURL}
      baseURLReload={baseURLReload}
      icon={<EditRounded />}
      popupClasses={{ icon: styles.Button }}
    />
  )
}

export const TableActionDetail = (props: TableActionProps) => {
  const { id, baseURL, ...rest } = props
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate(id)} className={styles.Button}>
      <MoreVert />
    </IconButton>
  )
}
