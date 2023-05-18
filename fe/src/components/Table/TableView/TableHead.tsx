import {
  Grid,
  TableHead as MUITableHead,
  TableCell,
  TableRow
} from '@mui/material'
import clsx from 'clsx'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type Props = {
  id: string
  columns: BaseOptions[]
}

export const TableHead = (props: Props) => {
  const { columns } = props

  return (
    <MUITableHead className={styles.TableHeader}>
      <TableRow className={styles.TableRow}>
        {columns.map((col, idx) => (
          <TableCell
            key={col.key}
            className={clsx(styles.Subhead2, styles.TableCell)}
          >
            <Grid className={styles.Item} justifyContent={columns[idx].align}>
              {col.title}
            </Grid>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  )
}
