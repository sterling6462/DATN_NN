import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { TableViewDropdown } from '../TableViewDropdown'
import { TableViewSearch } from '../TableViewSearch'
import { TableHeaderProps } from '../decorator'
import styles from './style.module.scss'

export const TableHeader = (props: TableHeaderProps) => {
  const {
    id = '',
    className,
    titleTable,
    descTitle,
    extraHeader,
    popupButton,
    search,
    labelDropdown,
    dropdown
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
      <Grid item className={styles.ExtraHeader}>
        {dropdown && (
          <TableViewDropdown
            dropdownItem={dropdown}
            id={id}
            labelDropdown={labelDropdown}
          />
        )}
        {search && <TableViewSearch id={id} />}
        {extraHeader}
        {popupButton}
      </Grid>
    </Grid>
  )
}
