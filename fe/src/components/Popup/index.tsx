import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid
} from '@mui/material'
import clsx from 'clsx'
import { PrimaryButton, TextButton } from 'components'
import { MouseEventHandler } from 'react'
import styles from './style.module.scss'

export type Entity = Record<string, any>

export type PopupBaseProps = DialogProps & {
  id?: string
  baseURLPopup?: string
  baseURLReload?: string
  titlePopup?: string
  extraTitlePopup?: string
  required?: boolean
  isDelete?: boolean
  open: boolean
  onClose: (open: boolean) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
  baseClasses?: { title?: string; content?: string; actions?: string }
  popupClasses?: { icon?: string; popup?: string }
  managerRole?: boolean
}

export const PopupBase = (props: PopupBaseProps) => {
  const {
    children,
    titlePopup,
    extraTitlePopup,
    PaperProps,
    isDelete,
    open,
    onClose,
    onClick,
    baseClasses,
    ...rest
  } = props

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Dialog
      {...rest}
      onClose={onClose}
      open={open}
      PaperProps={{
        classes: {
          root: styles.PaperRoot
        },
        ...PaperProps
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <DialogTitle
            className={clsx(
              styles.DialogTitleContent,
              styles.Headline5,
              baseClasses?.title
            )}
          >
            {titlePopup}
            {extraTitlePopup}
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          <DialogContent
            className={clsx(
              styles.DialogContentRoot,
              styles.DialogContentTextRoot,
              baseClasses?.content
            )}
          >
            {children}
          </DialogContent>
        </Grid>
        <Grid item xs={12}>
          <DialogActions className={clsx(styles.DialogActionsRoot)}>
            <TextButton
              className={clsx(styles.TextButton, styles.TextCancel)}
              onClick={handleClose}
            >
              Cancel
            </TextButton>
            {(isDelete || titlePopup) && (
              <PrimaryButton className={styles.TextButton} onClick={onClick}>
                {isDelete ? 'Delete' : titlePopup}
              </PrimaryButton>
            )}
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export * from './PopupAdd'
export * from './PopupAlert'
export * from './PopupEdit'
export * from './PopupNotification'
