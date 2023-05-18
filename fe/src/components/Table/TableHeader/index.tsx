import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { PopupAdd, PopupAddProps } from 'components'
import { TableHeaderProps } from '../decorator'
import styles from './style.module.scss'

export const TableHeader = (props: TableHeaderProps & PopupAddProps) => {
  const {
    className,
    titleTable,
    descTitle,
    extraHeader,
    addButtonTitle,
    inputsPopup,
    titlePopup,
    baseURLPopup
  } = props

  return (
    <Grid container className={clsx(styles.TableHeader, className)}>
      <Grid item>
        <Typography className={clsx(styles.Subhead1, styles.TitleTable)}>
          {titleTable}
        </Typography>
        <Typography className={clsx(styles.Caption, styles.DescTitle)}>
          {descTitle}
        </Typography>
      </Grid>
      <Grid item>{extraHeader}</Grid>
      {inputsPopup && (
        <Grid item>
          <PopupAdd
            inputsPopup={inputsPopup}
            textButton={addButtonTitle}
            titlePopup={titlePopup}
            baseURLPopup={baseURLPopup}
          />
        </Grid>
      )}
    </Grid>
  )
}
