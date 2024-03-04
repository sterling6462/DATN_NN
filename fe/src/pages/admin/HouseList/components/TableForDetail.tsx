import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { ListView, Props } from 'components'
import { TableHeaderProps } from 'components/Table/decorator'
import styles from './style.module.scss'

type TableForDetailProps<T> = Props<T> &
  TableHeaderProps & {
    titleTable?: string
  }

export const TableForDetail = <T extends object>(
  props: TableForDetailProps<T>
) => {
  const { titleTable, model, id, baseURL = '', popupButton, ...rest } = props

  return (
    <Grid className={styles.TableForDetail}>
      <Typography
        component={'span'}
        className={clsx(styles.Headline6, styles.Title)}
      >
        {titleTable}
      </Typography>
      <ListView
        {...rest}
        id={id}
        baseURL={baseURL}
        model={model}
        popupButton={popupButton}
      />
    </Grid>
  )
}
