import {
  TableCell as MUITableCell,
  TableRow as MUITableRow,
  TableBody
} from '@mui/material'
import clsx from 'clsx'
import { Data } from 'components'
import { ReactNode } from 'react'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type Props = {
  columns: BaseOptions[]
  dataSample?: Data
  data?: Data
}

export const TableRow = (props: Props) => {
  const { columns, dataSample, data } = props

  if (data || dataSample)
    return (
      <TableBody className={styles.TableBody}>
        {(data || dataSample)?.data?.map((record, idx) => (
          <MUITableRow key={idx} className={styles.TableRow}>
            {TableCell(columns, record as Record<string, unknown>)}
          </MUITableRow>
        ))}
      </TableBody>
    )

  return <></>
}

const TableCell = (columns: BaseOptions[], record: Record<string, unknown>) => {
  return columns.map(({ key = '' }, idx) => (
    <MUITableCell
      key={`${key}-${idx}`}
      className={clsx(styles.Body2, styles.WordBreak)}
      classes={{ root: styles.TableCell }}
      align={columns[idx].align}
      width={columns[idx].width}
      padding={columns[idx].padding}
    >
      {columns[idx].render
        ? columns[idx].render?.(record)
        : (record[key] as ReactNode)}
    </MUITableCell>
  ))
}
